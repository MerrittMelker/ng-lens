import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { ImportAnalyzer } from "./analyzers/ImportAnalyzer.js";
import { ServiceUsageAnalyzer } from "./analyzers/ServiceUsageAnalyzer.js";
import { ReportGenerator, AnalysisReport } from "./analyzers/ReportGenerator.js";

export interface AnalyzerConfig {
  targetModule?: string;
  sourcePattern?: string;
}

export class AngularAnalyzer {
  private readonly project: Project;
  private readonly importAnalyzer: ImportAnalyzer;
  private readonly serviceUsageAnalyzer: ServiceUsageAnalyzer;
  private readonly reportGenerator: ReportGenerator;

  constructor(config: AnalyzerConfig = {}) {
    this.project = new Project();
    this.importAnalyzer = new ImportAnalyzer(config.targetModule);
    this.serviceUsageAnalyzer = new ServiceUsageAnalyzer();
    this.reportGenerator = new ReportGenerator();
  }

  analyze(sourcePattern: string = "sample/**/*.ts"): AnalysisReport {
    this.project.addSourceFilesAtPaths(sourcePattern);
    const report: AnalysisReport = {};

    for (const sourceFile of this.project.getSourceFiles()) {
      this.analyzeSourceFile(sourceFile, report);
    }

    return report;
  }

  outputReport(report: AnalysisReport): void {
    this.reportGenerator.outputReport(report);
  }

  private analyzeSourceFile(sourceFile: SourceFile, report: AnalysisReport): void {
    const importInfo = this.importAnalyzer.analyzeImports(sourceFile);
    const injectedServices = this.importAnalyzer.analyzeConstructorInjection(
      sourceFile, 
      importInfo.namedImports
    );

    if (Object.keys(injectedServices).length === 0) {
      return; // No relevant services injected, skip this file
    }

    const classes = sourceFile.getClasses();
    for (const cls of classes) {
      const className = cls.getName();
      if (!className) continue;

      const serviceUsage = this.serviceUsageAnalyzer.analyzeServiceUsage(
        [cls], 
        injectedServices
      );

      const componentReport = this.reportGenerator.generateReport(
        className,
        sourceFile.getFilePath(),
        serviceUsage
      );

      if (componentReport) {
        report[className] = componentReport;
      }
    }
  }
}
