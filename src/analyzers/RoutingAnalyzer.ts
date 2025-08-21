import {ArrayLiteralExpression, Node, ObjectLiteralExpression, PropertyAssignment, SourceFile, SyntaxKind} from "ts-morph";

export interface RouteMenuEntry {
    file: string;
    component: string;
    importPath: string | null;
    fullPath: string;
    menuId: string; // textual form e.g. MenuEntries.ConstituentSearch or literal
}

export class RoutingAnalyzer {
    analyzeFile(sourceFile: SourceFile): RouteMenuEntry[] {
        const results: RouteMenuEntry[] = [];

        // Analyze array literals assigned to a variable typed as Routes
        for (const v of sourceFile.getVariableDeclarations()) {
            const typeText = v.getTypeNode()?.getText();
            const init = v.getInitializer();
            if (typeText?.includes("Routes") && init?.getKind() === SyntaxKind.ArrayLiteralExpression) {
                const array = init.asKind(SyntaxKind.ArrayLiteralExpression)!;
                results.push(
                    ...this.extractFromRoutesArray(sourceFile, array, [])
                );
            }
        }

        // Analyze RouterModule.forChild/forRoot([...]) calls
        sourceFile.forEachDescendant((node) => {
            if (node.getKind() !== SyntaxKind.CallExpression) return;
            const call = node.asKind(SyntaxKind.CallExpression)!;
            const expr = call.getExpression();
            if (expr.getKind() !== SyntaxKind.PropertyAccessExpression) return;
            const pa = expr.asKind(SyntaxKind.PropertyAccessExpression)!;
            const name = pa.getName();
            const left = pa.getExpression().getText();
            if ((name === "forChild" || name === "forRoot") && left.includes("RouterModule")) {
                const arg = call.getArguments()[0];
                if (!arg) return;
                if (arg.getKind() === SyntaxKind.ArrayLiteralExpression) {
                    const array = arg.asKind(SyntaxKind.ArrayLiteralExpression)!;
                    results.push(
                        ...this.extractFromRoutesArray(sourceFile, array, [])
                    );
                } else if (arg.getKind() === SyntaxKind.Identifier) {
                    const id = arg.asKind(SyntaxKind.Identifier)!;
                    const decl = id.getDefinitions()[0]?.getNode();
                    const varDecl = decl?.getParentIfKind(SyntaxKind.VariableDeclaration);
                    const init = varDecl?.getInitializer();
                    if (init?.getKind() === SyntaxKind.ArrayLiteralExpression) {
                        const array = init.asKind(SyntaxKind.ArrayLiteralExpression)!;
                        results.push(
                            ...this.extractFromRoutesArray(sourceFile, array, [])
                        );
                    }
                }
            }
        });

        return this.dedupe(results);
    }

    private extractFromRoutesArray(sourceFile: SourceFile, array: ArrayLiteralExpression, parentSegments: string[]): RouteMenuEntry[] {
        const entries: RouteMenuEntry[] = [];
        for (const el of array.getElements()) {
            if (el.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
            const obj = el.asKind(SyntaxKind.ObjectLiteralExpression)!;
            entries.push(...this.extractFromRouteObject(sourceFile, obj, parentSegments));
        }
        return entries;
    }

    private extractFromRouteObject(sourceFile: SourceFile, obj: ObjectLiteralExpression, parentSegments: string[]): RouteMenuEntry[] {
        const entries: RouteMenuEntry[] = [];

        const pathProp = this.getProp(obj, "path");
        const pathSegment = pathProp && this.literalOrText(pathProp.getInitializer());
        const newSegments = [...parentSegments];
        if (typeof pathSegment === "string" && pathSegment.length > 0) {
            newSegments.push(pathSegment);
        }

        const dataProp = this.getProp(obj, "data");
        const dataMenuId = dataProp ? this.findMenuIdValue(dataProp) : null;

        const componentProp = this.getProp(obj, "component");
        const componentName = componentProp ? this.identifierText(componentProp.getInitializer()) : null;

        if (dataMenuId && componentName) {
            entries.push({
                file: sourceFile.getFilePath(),
                component: componentName,
                importPath: this.findImportPathForComponent(sourceFile, componentName),
                fullPath: this.joinSegments(newSegments),
                menuId: dataMenuId,
            });
        }

        const childrenProp = this.getProp(obj, "children");
        if (childrenProp && childrenProp.getInitializer()?.getKind() === SyntaxKind.ArrayLiteralExpression) {
            const childArray = childrenProp.getInitializer()!.asKind(SyntaxKind.ArrayLiteralExpression)!;
            entries.push(...this.extractFromRoutesArray(sourceFile, childArray, newSegments));
        }

        return entries;
    }

    private getProp(obj: ObjectLiteralExpression, name: string): PropertyAssignment | undefined {
        const prop = obj.getProperty(name);
        return prop?.asKind(SyntaxKind.PropertyAssignment);
    }

    private findMenuIdValue(dataProp: PropertyAssignment): string | null {
        const init = dataProp.getInitializer();
        if (!init || init.getKind() !== SyntaxKind.ObjectLiteralExpression) return null;
        const dataObj = init.asKind(SyntaxKind.ObjectLiteralExpression)!;
        const menuProp = this.getProp(dataObj, "menuId");
        if (!menuProp) return null;
        const menuInit = menuProp.getInitializer();
        if (!menuInit) return null;

        // Return textual form; handle Identifier, PropertyAccess, StringLiteral, NumericLiteral
        const k = menuInit.getKind();
        if (k === SyntaxKind.PropertyAccessExpression || k === SyntaxKind.Identifier) {
            return menuInit.getText();
        }
        if (k === SyntaxKind.StringLiteral || k === SyntaxKind.NoSubstitutionTemplateLiteral || k === SyntaxKind.NumericLiteral) {
            return menuInit.getText().replace(/^([`'"])(.*)\1$/, "$2");
        }
        return menuInit.getText();
    }

    private literalOrText(node: Node | undefined): string | null {
        if (!node) return null;
        const k = node.getKind();
        if (k === SyntaxKind.StringLiteral || k === SyntaxKind.NoSubstitutionTemplateLiteral || k === SyntaxKind.NumericLiteral) {
            return node.getText().replace(/^([`'"])(.*)\1$/, "$2");
        }
        if (k === SyntaxKind.Identifier) return node.getText();
        return null;
    }

    private identifierText(node: Node | undefined): string | null {
        if (!node) return null;
        if (node.getKind() === SyntaxKind.Identifier) return node.getText();
        return null;
    }

    private joinSegments(segments: string[]): string {
        return segments.join("/");
        // We intentionally keep route params like :id
    }

    private findImportPathForComponent(sourceFile: SourceFile, componentName: string): string | null {
        for (const imp of sourceFile.getImportDeclarations()) {
            const named = imp.getNamedImports().map(n => n.getName());
            if (named.includes(componentName)) {
                return imp.getModuleSpecifierValue();
            }
        }
        return null;
    }

    private dedupe(entries: RouteMenuEntry[]): RouteMenuEntry[] {
        const seen = new Set<string>();
        const out: RouteMenuEntry[] = [];
        for (const e of entries) {
            const key = `${e.file}|${e.component}|${e.fullPath}|${e.menuId}`;
            if (!seen.has(key)) {
                seen.add(key);
                out.push(e);
            }
        }
        return out;
    }
}
