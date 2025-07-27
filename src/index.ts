import { Project, SyntaxKind } from "ts-morph";
import path from "path";

const project = new Project();
project.addSourceFilesAtPaths("**/*.ts");

const sourceFiles = project.getSourceFiles();

for (const file of sourceFiles) {
  for (const classDecl of file.getClasses()) {
    const componentDecorator = classDecl.getDecorator("Component");
    if (!componentDecorator) continue;

    const className = classDecl.getName();
    const constructor = classDecl.getConstructors()[0];

    console.log(`\nComponent: ${className}`);

    if (constructor) {
      const params = constructor.getParameters();
      for (const param of params) {
        const type = param.getType().getSymbol()?.getName();
        console.log(`  Injected Service: ${type}`);
      }
    }
  }
}
