/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const path = require('path');

const shell = require('shelljs');

const env = require('./env'),
      processes = require('../shared/processes');

const pre = async function () {
  // Precompile and create a temporary wolkenkit-react distributable, so
  // that the tests always use the latest version.
  let childProcess = shell.exec(`npx roboter precompile`, {
    cwd: env.path.projectRoot
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to create dist.');
  }

  // We install the depencencies of the webpack example.
  if (!shell.test('-d', path.join(env.path.client, 'node_modules'))) {
    childProcess = shell.exec('npm install', { cwd: env.path.client });

    if (childProcess.code !== 0) {
      throw new Error('Failed to install client dependencies.');
    }
  }

  processes.devserver = shell.exec('npx bot serve', {
    cwd: env.path.client,
    async: true
  });

  // Remove backend folder from previous tests.
  shell.rm('-rf', env.path.backend);
  shell.mkdir(env.path.backend);

  childProcess = shell.exec(`${env.path.wolkenkitBinary} init`, {
    cwd: env.path.backend
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to init wolkenkit application.');
  }

  childProcess = shell.exec(`${env.path.wolkenkitBinary} start --shared-key wolkenkit`, {
    cwd: env.path.backend
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to start wolkenkit app.');
  }
};

module.exports = pre;
