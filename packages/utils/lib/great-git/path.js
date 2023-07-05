import { dirname } from 'dirname-filename-esm';
import path from 'node:path';

function getJsonConfigPath() {
    return path.resolve(dirname(import.meta), './gg.json')
};

export {
    getJsonConfigPath
}