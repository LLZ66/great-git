'use strict';

import log from './log.js';
import isDebug from './isDebug.js';
import { getNpmInfo, getLastestVersion } from './npm.js';
import request from './request.js';
import { runCommand } from './execa.js';

function printErrorLog(e, type) {
  if(isDebug) {
    log.error(type, e)
  }else {
    log.error(type, e.message)
  }
}

export {
  makeList, 
  makeInput, 
  makeConfirm, 
  makeEditor,
} from './inquirer.js'

export {
  log,
  isDebug,
  getNpmInfo,
  getLastestVersion,
  printErrorLog,
  runCommand,
  request,
}