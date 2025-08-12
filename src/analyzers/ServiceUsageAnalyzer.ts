import { ClassDeclaration, SyntaxKind, Node } from "ts-morph";

export interface ServiceUsage {
  [serviceClass: string]: Set<string>; // service class => method names
}

export class ServiceUsageAnalyzer {
  analyzeServiceUsage(classes: ClassDeclaration[], injectedServices: Record<string, string>): ServiceUsage {
    const usage: ServiceUsage = {};

    for (const cls of classes) {
      this.analyzeClassMethods(cls, injectedServices, usage);
    }

    return usage;
  }

  private analyzeClassMethods(
    cls: ClassDeclaration, 
    injectedServices: Record<string, string>, 
    usage: ServiceUsage
  ): void {
    for (const method of cls.getMethods()) {
      method.forEachDescendant((node: Node) => {
        if (node.getKind() === SyntaxKind.CallExpression) {
          this.analyzeMethodCall(node, injectedServices, usage);
        }
      });
    }
  }

  private analyzeMethodCall(
    node: Node, 
    injectedServices: Record<string, string>, 
    usage: ServiceUsage
  ): void {
    const callExpr = node.asKind(SyntaxKind.CallExpression);
    if (!callExpr) return;

    const expr = callExpr.getExpression();
    if (!expr || expr.getKind() !== SyntaxKind.PropertyAccessExpression) return;

    const serviceInstance = expr.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
    const methodName = expr.getLastChildByKind(SyntaxKind.Identifier)?.getText();

    const serviceClass = serviceInstance && injectedServices[serviceInstance];
    if (serviceClass && methodName) {
      if (!usage[serviceClass]) {
        usage[serviceClass] = new Set();
      }
      usage[serviceClass].add(methodName);
    }
  }
}
