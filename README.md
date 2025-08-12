# Angular Analyzer

This Node.js utility uses [ts-morph](https://github.com/dsherret/ts-morph) to statically analyze Angular TypeScript components and identify service usage patterns from the "tn-api" library. It detects constructor dependency injection and tracks which service methods are actually called within component code.

## 🚀 Features

- **Service Injection Detection**: Identifies services from "tn-api" injected via Angular constructor dependency injection
- **Method Usage Tracking**: Analyzes component methods to track which service methods are actually called
- **Scalable Architecture**: Class-based design ready for analyzing 1000+ files
- **JSON Output**: Clean, structured output perfect for integration with other tools
- **Configurable**: Easy to change target modules or source file patterns

## 📦 Setup Instructions

1. Clone or download the project.
2. Run the following commands from the project root:

```bash
npm install
```

> This installs all required dependencies, including:
> - `ts-morph` – for TypeScript AST analysis
> - `typescript`, `ts-node`, and `@types/node` – for clean TypeScript execution

## ▶️ Usage

To run the analysis script:

```bash
npm start
```

This executes `ts-node src/index.ts` and analyzes all `.ts` files in the `sample/` directory by default.

### Configuration

You can customize the analyzer by modifying `src/index.ts`:

```typescript
const analyzer = new AngularAnalyzer({
  targetModule: "your-api-module",  // Default: "tn-api"
  sourcePattern: "src/**/*.ts"      // Default: "sample/**/*.ts"
});
```

## 📝 Example Output

```json
{
  "AddressEditComponent": {
    "file": "C:/Repo/angular-analyzer/sample/address-edit.component.ts",
    "services": {
      "CountriesService": [
        "GetDefault",
        "Get", 
        "GetSummaries"
      ],
      "AddressesService": [
        "Get",
        "Delete",
        "Create", 
        "Update"
      ],
      "ContactPointPurposeMapsService": [
        "GetAll",
        "Create",
        "Delete"
      ],
      "SalutationsService": [
        "GetAll"
      ]
    }
  }
}
```

## 🏗️ Architecture

The analyzer uses a clean, class-based architecture following Single Responsibility Principle:

- **`AngularAnalyzer`**: Main orchestrator coordinating all analysis
- **`ImportAnalyzer`**: Detects imports from target modules and constructor injection
- **`ServiceUsageAnalyzer`**: Analyzes method calls on injected services  
- **`ReportGenerator`**: Formats and outputs analysis results

## 📚 Documentation

See [CHANGELOG.md](./CHANGELOG.md) for detailed development history, technical decisions, and architecture explanations.

## 🎯 Use Cases

- **API Usage Analysis**: Track which parts of your API are actually being used
- **Refactoring Planning**: Identify unused service methods before API changes
- **Dependency Mapping**: Understand component-to-service relationships
- **Code Review**: Generate usage reports for large codebases

## 📁 Project Structure

```
src/
├── AngularAnalyzer.ts           # Main orchestrator
├── index.ts                     # Entry point
└── analyzers/
    ├── ImportAnalyzer.ts        # Import & injection detection
    ├── ServiceUsageAnalyzer.ts  # Method call analysis
    └── ReportGenerator.ts       # Output formatting
sample/                          # Test files
├── address-edit.component.ts    # Sample component with tn-api usage
└── crm.component.ts            # Sample component without tn-api usage
```

## 🔧 Development

This tool is designed to be easily extensible and testable. Each analyzer class can be unit tested independently, and new analyzers can be added for different analysis patterns.

For development history and technical details, see [CHANGELOG.md](./CHANGELOG.md).
