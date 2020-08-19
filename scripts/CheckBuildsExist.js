// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

const mainPath = path.join(__dirname, '..', 'app', 'main.prod.js');

const visibleRendererPath = getRendererPath('visible');
const hiddenRendererPath = getRendererPath('hidden');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "yarn build-main"'
    )
  );
}

if (!fs.existsSync(visibleRendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The visible renderer process is not built yet. Build it by running "yarn build-renderer"'
    )
  );
}

if (!fs.existsSync(hiddenRendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The hidden renderer process is not built yet. Build it by running "yarn build-renderer"'
    )
  );
}

function getRendererPath(name) {
  return path.join(
    __dirname,
    '..',
    '..',
    'app',
    'dist',
    `${name}.renderer.prod.js`
  );
}
