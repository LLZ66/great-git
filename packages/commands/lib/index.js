import createDefaultCommand from './g/index.js';
import createConfigCommand from './config/index.js';
import createAliasCommand from './alias/index.js'

function initCommands(instance) {
  createDefaultCommand(instance);
  createConfigCommand(instance);
  createAliasCommand(instance)
}


export default initCommands