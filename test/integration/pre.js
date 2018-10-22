/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const path = require('path');

const shell = require('shelljs');

const processes = require('../shared/processes');

const projectRoot = path.join(__dirname, '..', '..');
const testApplicationDirectory = path.join(projectRoot, 'examples', 'chat');
const testApplicationClient = path.join(testApplicationDirectory, 'client');
const wolkenkitBinary = path.join(projectRoot, 'node_modules', '.bin', 'wolkenkit');

const pre = async function () {
  // Precompile and create a temporary wolkenkit-client SDK distributable, so
  // that the tests always use the latest version.
  let childProcess = shell.exec(`npx roboter precompile`, {
    cwd: projectRoot
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to create bundle.');
  }

  processes.devserver = shell.exec('npx bot serve', {
    cwd: testApplicationClient,
    async: true
  });

  childProcess = shell.exec(`${wolkenkitBinary} start --shared-key wolkenkit`, {
    cwd: testApplicationDirectory
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to start wolkenkit app.');
  }
};

module.exports = pre;
