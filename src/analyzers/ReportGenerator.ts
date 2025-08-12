import { ServiceUsage } from "./ServiceUsageAnalyzer.js";

export interface ComponentReport {
  file: string;
  services: Record<string, string[]>;
}

export interface AnalysisReport {
  [componentName: string]: ComponentReport;
}

export class ReportGenerator {
  generateReport(
    componentName: string,
    filePath: string,
    serviceUsage: ServiceUsage
  ): ComponentReport | null {
    if (Object.keys(serviceUsage).length === 0) {
      return null;
    }

    return {
      file: filePath,
      services: this.convertSetsToArrays(serviceUsage)
    };
  }

  outputReport(report: AnalysisReport): void {
    console.log(JSON.stringify(report, null, 2));
  }

  private convertSetsToArrays(serviceUsage: ServiceUsage): Record<string, string[]> {
    return Object.fromEntries(
      Object.entries(serviceUsage).map(([serviceClass, methods]) => [
        serviceClass,
        Array.from(methods)
      ])
    );
  }
}
