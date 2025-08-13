import { AngularAnalyzer } from "./AngularAnalyzer.js";

// Create analyzer with configurable target module
const analyzer = new AngularAnalyzer({
  targetModule: "your-api-module", // Configure this for your specific API library
  sourcePattern: "sample/**/*.ts"
});

// Analyze the codebase
const report = analyzer.analyze();

// Output the results
analyzer.outputReport(report);
