import { AngularAnalyzer } from "./AngularAnalyzer.js";

// Create analyzer with default configuration
const analyzer = new AngularAnalyzer({
  targetModule: "tn-api",
  sourcePattern: "sample/**/*.ts"
});

// Analyze the codebase
const report = analyzer.analyze();

// Output the results
analyzer.outputReport(report);
