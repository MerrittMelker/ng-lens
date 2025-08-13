# NgLens

This Node.js utility uses [ts-morph](https://github.com/dsherret/ts-morph) to statically analyze Angular TypeScript components and identify service usage patterns from any specified API library. It detects constructor dependency injection and tracks which service methods are actually called within component code.

## 🚀 Features

- **Service Injection Detection**: Identifies services from your API library injected via Angular constructor dependency injection
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
  targetModule: "your-api-module",  // Specify your API library name
  sourcePattern: "src/**/*.ts"      // Default: "sample/**/*.ts"
});
```

## 📝 Example Output

```json
{
  "UserProfileComponent": {
    "file": "C:/Repo/ng-lens/sample/user-profile.component.ts",
    "services": {
      "UserService": [
        "GetProfile",
        "UpdateProfile", 
        "Delete",
        "RefreshCache",
        "ExportData"
      ],
      "ProductService": [
        "GetByUser",
        "RefreshCache"
      ],
      "OrderService": [
        "GetRecent"
      ],
      "NotificationService": [
        "ShowError",
        "ShowSuccess",
        "ShowInfo"
      ]
    }
  },
  "ProductEditComponent": {
    "file": "C:/Repo/ng-lens/sample/product-edit.component.ts",
    "services": {
      "ProductService": [
        "GetById",
        "Create", 
        "Update",
        "Delete",
        "Validate"
      ],
      "CategoryService": [
        "GetAll",
        "RefreshCache"
      ],
      "InventoryService": [
        "GetByProduct",
        "Update",
        "Remove"
      ],
      "ReviewService": [
        "GetByProduct",
        "DeleteByProduct"
      ],
      "PricingService": [
        "GetDefaults",
        "GetByProduct",
        "Update"
      ],
      "ShippingService": [
        "Calculate"
      ]
    }
  }
}
```

## 🏗️ Architecture

NgLens uses a clean, class-based architecture following Single Responsibility Principle:

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
├── test-runner.ts               # Basic test harness
└── analyzers/
    ├── ImportAnalyzer.ts        # Import & injection detection
    ├── ServiceUsageAnalyzer.ts  # Method call analysis
    └── ReportGenerator.ts       # Output formatting
sample/                          # Test files
├── user-profile.component.ts    # Component with multiple services
├── address-edit.component.ts    # Component with CRUD-like operations
└── crm.component.ts             # Component with API interactions
```

## 🔧 Development

This tool is designed to be easily extensible and testable. Each analyzer class can be unit tested independently, and new analyzers can be added for different analysis patterns.

For development history and technical details, see [CHANGELOG.md](./CHANGELOG.md).
