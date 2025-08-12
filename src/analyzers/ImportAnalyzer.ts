import { ImportDeclaration, SourceFile } from "ts-morph";

export interface ImportInfo {
  namedImports: Set<string>;
  injectedServices: Record<string, string>; // varName => className
}

export class ImportAnalyzer {
  private readonly targetModule: string;

  constructor(targetModule: string = "tn-api") {
    this.targetModule = targetModule;
  }

  analyzeImports(sourceFile: SourceFile): ImportInfo {
    const importsFromTargetModule = this.getTargetModuleImports(sourceFile);
    const namedImports = this.extractNamedImports(importsFromTargetModule);
    
    return {
      namedImports,
      injectedServices: {}
    };
  }

  analyzeConstructorInjection(sourceFile: SourceFile, namedImports: Set<string>): Record<string, string> {
    const injectedServices: Record<string, string> = {};
    
    const classes = sourceFile.getClasses();
    
    for (const cls of classes) {
      const constructor = cls.getConstructors()[0];
      if (!constructor) continue;
      
      for (const param of constructor.getParameters()) {
        const typeNode = param.getTypeNode();
        const typeName = typeNode?.getText() || param.getType().getSymbol()?.getName();
        const varName = param.getName();

        if (typeName && namedImports.has(typeName)) {
          injectedServices[varName] = typeName;
        }
      }
    }

    return injectedServices;
  }

  private getTargetModuleImports(sourceFile: SourceFile): ImportDeclaration[] {
    return sourceFile.getImportDeclarations().filter(decl =>
      decl.getModuleSpecifierValue() === this.targetModule
    );
  }

  private extractNamedImports(importDeclarations: ImportDeclaration[]): Set<string> {
    return new Set(
      importDeclarations.flatMap(decl =>
        decl.getNamedImports().map(named => named.getName())
      )
    );
  }
}
