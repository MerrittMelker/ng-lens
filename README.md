# NgLens

This Node.js utility uses [ts-morph](https://github.com/dsherret/ts-morph) to statically analyze Angular TypeScript components and identify service usage patterns from any specified API library. It detects constructor dependency injection and tracks which service methods are actually called within component code.

## 🚀 Features

- **Service Injection Detection**: Identifies services from your API library injected via Angular constructor dependency injection
- **Method Usage Tracking**: Analyzes component methods to track which service methods are actually called
- **Routing Analysis**: Scans Angular routing modules to extract `component`, `fullPath`, `data.menuId`, and `importPath`
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

To run the component/service analysis script:

```bash
npm start
```

This executes `ts-node src/index.ts` and analyzes all `.ts` files in the `sample/` directory by default.

### Route scan

To scan routing modules (e.g., sample/crm-routing.module.ts) and list components that include a `data.menuId` with their full paths and import locations:

```bash
npm run scan:routes
```

Example output (truncated):

```json
[
  {
    "file": "D:/ng-lens/sample/crm-routing.module.ts",
    "component": "ConstituentSearchComponent",
    "importPath": "./constituent-search/constituent-search.component",
    "fullPath": "search",
    "menuId": "MenuEntries.ConstituentSearch"
  },
  {
    "file": "D:/ng-lens/sample/crm-routing.module.ts",
    "component": "AddressesComponent",
    "importPath": "./constituent-detail/addresses/addresses.component",
    "fullPath": "constituents/:constituentId/addresses",
    "menuId": "MenuEntries.Addresses"
  }
]
```

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
- **`RoutingAnalyzer`**: Parses Angular route definitions to collect `component`, `fullPath`, `data.menuId`, and `importPath`
- **`ReportGenerator`**: Formats and outputs analysis results

## 📚 Documentation

See [CHANGELOG.md](./CHANGELOG.md) for detailed development history, technical decisions, and architecture explanations.

## 🎯 Use Cases

- **API Usage Analysis**: Track which parts of your API are actually being used
- **Refactoring Planning**: Identify unused service methods before API changes
- **Dependency Mapping**: Understand component-to-service relationships
- **Code Review**: Generate usage reports for large codebases
- **Navigation Mapping**: Inventory routed components with their menuIds and paths

## 📁 Project Structure

```
src/
├── AngularAnalyzer.ts           # Main orchestrator
├── index.ts                     # Entry point
├── route-scan.ts                # CLI to scan routes in sample/*
├── test-runner.ts               # Basic test harness
└── analyzers/
    ├── ImportAnalyzer.ts        # Import & injection detection
    ├── ServiceUsageAnalyzer.ts  # Method call analysis
    ├── RoutingAnalyzer.ts       # Route analysis (menuId, full path, import)
    └── ReportGenerator.ts       # Output formatting
sample/                          # Test files
├── user-profile.component.ts    # Component with multiple services
├── address-edit.component.ts    # Component with CRUD-like operations
├── crm.component.ts             # Component with API interactions
└── crm-routing.module.ts        # Rich routing module for route scanning
```

## 🔧 Development

- Run all tests:

```bash
npm test
```

- Run validation tests only:

```bash
npm run test:validation
```

- Scan routes:

```bash
npm run scan:routes
```

All current tests validate both the component/service analysis and routing analysis.

## 🛠️ Troubleshooting

- On Windows, you may see executable shim files appear in the project root after install (e.g., `acorn`, `ts-node.ps1`, `tsc.cmd`). They are duplicates of the ones in `node_modules/.bin` and are safe to remove. Ensure your `.gitignore` excludes them (they’re not needed for the repo). If they show up, delete the root-level shims and keep the copies under `node_modules/.bin`.

For development history and technical details, see [CHANGELOG.md](./CHANGELOG.md).
