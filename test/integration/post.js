/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const shell = require('shelljs');

const env = require('./env'),
      processes = require('../shared/processes');

const post = async function () {
  if (processes.devserver) {
    processes.devserver.kill('SIGINT');
  }

  const childProcess = shell.exec(`${env.path.wolkenkitBinary} stop --dangerously-destroy-data`, {
    cwd: env.path.backend
  });

  if (childProcess.code !== 0) {
    throw new Error('Failed to stop wolkenkit app.');
  }
};

module.exports = post;
