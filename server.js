import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const binPath = path.resolve(__dirname, 'node_modules', '@remix-run/serve', 'dist', 'cli.js');

const port = process.env.PORT || 3000;

console.log(`Starting Remix server on port ${port}...`);

const child = spawn('node', [binPath, './build/server/index.js'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: port
  }
});

child.on('close', (code) => {
  process.exit(code);
});
