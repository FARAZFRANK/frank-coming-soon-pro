import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';

// Set production environment by default
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.resolve(__dirname, 'build', 'server', 'index.js');

async function startServer() {
  try {
    console.log("Starting Remix server init sequence...");
    console.log("Build path resolved to:", buildPath);

    // Import the server build
    const build = await import(pathToFileURL(buildPath).href);

    installGlobals({
      nativeFetch: build.future?.v3_singleFetch
    });

    const app = express();
    app.set('trust proxy', true);
    app.disable('x-powered-by');
    app.use(compression());

    // Serve build assets from public/build
    app.use(
      build.publicPath || '/build/',
      express.static(build.assetsBuildDirectory || 'public/build', {
        immutable: true,
        maxAge: '1y'
      })
    );

    // Serve static assets from public/
    app.use(express.static('public', { maxAge: '1h' }));

    app.use(morgan('tiny'));

    app.all(
      '*',
      createRequestHandler({
        build,
        mode: process.env.NODE_ENV
      })
    );

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ CRITICAL ERROR DURING SERVER STARTUP:");
    console.error(error.stack || error);
    process.exit(1);
  }
}

startServer();
