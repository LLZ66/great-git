import fse from 'fs-extra';
import { getJsonConfigPath } from './path.js'
import { printErrorLog } from '../index.js';

function getJsonConfig() {
    try {
        return fse.readJSONSync(getJsonConfigPath())
    }catch(err) {
        printErrorLog(err)
    }

};

function writeJsonConfig(data) {
    try {
        fse.writeJSONSync(getJsonConfigPath(), data);
    }catch(err) {
        printErrorLog(err)
    }
}

export {
    getJsonConfig,
    writeJsonConfig
}