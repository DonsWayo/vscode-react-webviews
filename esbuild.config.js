import * as esbuild from 'esbuild';
import fs from 'fs/promises';

// Ensure out directory exists
await fs.mkdir('out', { recursive: true });

// Build extension files directly to .cjs
await esbuild.build({
    entryPoints: ['src/extension.ts', 'src/NextWebview.ts'],
    outdir: 'out',
    format: 'cjs',
    platform: 'node',
    outExtension: { '.js': '.cjs' },
    sourcemap: true,
    external: ['vscode'],
    bundle: true,
    logLevel: 'info'
});

console.log('Extension files built to CJS');
