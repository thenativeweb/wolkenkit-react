/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const path = require('path');

const shell = require('shelljs');

const processes = require('../shared/processes');

const projectRoot = path.join(__dirname, '..', '..');
const testApplicationDirectory = path.join(projectRoot, 'examples', 'chat');
const wolkenkitBinary = path.join(projectRoot, 'node_modules', '.bin', 'wolkenkit');

const post = async function () {
  if (processes.devserver) {
    processes.devserver.kill('SIGINT');
  }

  const childProcess = shell.exec(`${wolkenkitBinary} stop --dangerously-destroy-data`, {
    cwd: testApplicationDirectory
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to stop wolkenkit app.');
  }
};

module.exports = post;
