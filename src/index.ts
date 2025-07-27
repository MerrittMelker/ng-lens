import { Project } from "ts-morph";
import * as ts from "typescript";

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

    // Now walk method bodies and look for method calls on those injected vars
    const usage: Record<string, Set<string>> = {};
    for (const method of cls.getMethods()) {
      method.forEachDescendant(node => {
        if (node.getKind() === ts.SyntaxKind.CallExpression) {
          const callExpr = node.asKind(ts.SyntaxKind.CallExpression);
          if (!callExpr) return;

          const expr = callExpr.getExpression();

          if (expr.getKindName() === "PropertyAccessExpression") {
            const propAccess = expr.asKindOrThrow(ts.SyntaxKind.PropertyAccessExpression);
            const serviceInstance = propAccess.getExpression().getText();
            const methodName = propAccess.getName();

            const serviceClass = tnApiInjected[serviceInstance];
            if (serviceClass) {
              if (!usage[serviceClass]) {
                usage[serviceClass] = new Set();
              }
              usage[serviceClass].add(methodName);
            }
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
