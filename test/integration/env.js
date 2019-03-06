/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const path = require('path');

const projectRootPath = path.join(__dirname, '..', '..');
const examplesPath = path.join(projectRootPath, 'examples');
const backendPath = path.join(examplesPath, 'backend');
const clientPath = path.join(examplesPath, 'client');
const wolkenkitBinaryPath = path.join(projectRootPath, 'node_modules', '.bin', 'wolkenkit');

const env = {
  path: {
    projectRoot: projectRootPath,
    examples: examplesPath,
    backend: backendPath,
    client: clientPath,
    wolkenkitBinary: wolkenkitBinaryPath
  }
};

module.exports = env;
