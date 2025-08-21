import {Project} from 'ts-morph';
import {RoutingAnalyzer} from './analyzers/RoutingAnalyzer.js';

// Usage: ts-node src/route-scan.ts [glob]
// Default glob: sample/**/*.ts
const pattern = process.argv[2] ?? 'sample/**/*.ts';

const project = new Project();
project.addSourceFilesAtPaths(pattern);

const analyzer = new RoutingAnalyzer();
const all: ReturnType<typeof analyzer.analyzeFile> = [] as any;

for (const sf of project.getSourceFiles()) {
    const entries = analyzer.analyzeFile(sf);
    all.push(...entries);
}

console.log(JSON.stringify(all, null, 2));

