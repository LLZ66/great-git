import createPushCommand from './push/index.js';
import createConfigCommand from './config/index.js'

function initCommands(instance) {
  createPushCommand(instance);
  createConfigCommand(instance)
}


export default initCommands