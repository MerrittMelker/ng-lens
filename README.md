# Angular Analyzer

This Node.js utility uses [ts-morph](https://github.com/dsherret/ts-morph) to statically analyze an Angular project and identify component-to-service injection relationships via constructors.

## 📦 Setup Instructions

1. Clone or download the project.
2. Run the following commands from the project root:

```bash
npm install
```

> This installs all required dependencies, including:
> - `ts-morph` – for TypeScript AST analysis
> - `typescript`, `ts-node`, and `@types/node` – for clean TypeScript execution without warnings

If you want to suppress all installation warnings, ensure your `package.json` includes:
- `"description"`
- `"repository"`
- `"license"`
- `@types/node` as a devDependency

These are already included in the current project config.

---

## ▶️ Usage

To run the analysis script:

```bash
npm start
```

This executes the following:

```bash
ts-node src/index.ts
```

The script:
- Recursively scans `.ts` files
- Locates Angular components via the `@Component` decorator
- Extracts constructor-injected services
- Prints a simple map: `Component → Injected Services`

---

## 📝 Example Output

```
Component: UserProfileComponent
  Injected Service: UserService
  Injected Service: LoggerService
```

---

## 📁 Notes

This tool assumes a typical Angular project structure but can be customized to match your repo layout.
