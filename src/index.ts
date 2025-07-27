import { Project, SyntaxKind } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths("sample/**/*.ts");

const report: Record<string, any> = {};

for (const sourceFile of project.getSourceFiles()) {
  const importsFromTnApi = sourceFile.getImportDeclarations().filter(decl =>
      decl.getModuleSpecifierValue() === "tn-api"
  );

  const tnApiImports = new Set(
      importsFromTnApi.flatMap(decl =>
          decl.getNamedImports().map(named => named.getName())
      )
  );

  const classes = sourceFile.getClasses();

  for (const cls of classes) {
    const className = cls.getName();
    if (!className) continue;

    const constructor = cls.getConstructors()[0];
    if (!constructor) continue;

    // Map of injected identifier name => class name
    const tnApiInjected: Record<string, string> = {};

    for (const param of constructor.getParameters()) {
      const type = param.getType().getSymbol()?.getName();
      const varName = param.getName();

      if (type && tnApiImports.has(type)) {
        tnApiInjected[varName] = type;
      }
    }

    // Walk method bodies for service method calls
    const usage: Record<string, Set<string>> = {};
    for (const method of cls.getMethods()) {
      method.forEachDescendant(node => {
        if (node.getKind() === SyntaxKind.CallExpression) {
          const callExpr = node.asKind(SyntaxKind.CallExpression);
          if (!callExpr) return;

          const expr = callExpr.getExpression();
          if (!expr || expr.getKind() !== SyntaxKind.PropertyAccessExpression) return;

          const serviceInstance = expr.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
          const methodName = expr.getLastChildByKind(SyntaxKind.Identifier)?.getText();

          const serviceClass = serviceInstance && tnApiInjected[serviceInstance];
          if (serviceClass && methodName) {
            if (!usage[serviceClass]) {
              usage[serviceClass] = new Set();
            }
            usage[serviceClass].add(methodName);
          }
        }
      });
    }

    if (Object.keys(usage).length > 0) {
      report[className] = {
        file: sourceFile.getFilePath(),
        services: Object.fromEntries(
            Object.entries(usage).map(([k, v]) => [k, Array.from(v)])
        )
      };
    }
  }
}

console.log(JSON.stringify(report, null, 2));
