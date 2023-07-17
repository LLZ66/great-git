import Command from "@llzcli/command";
import { runCommand, log } from "@llzcli/utils";
import { getJsonConfig } from '@llzcli/utils/lib/great-git/json.js';

const {
    alias
} = getJsonConfig();

let currentAlias;

class AliasCommand extends Command {
    constructor(instance) {
        super(instance);
        try {
            if(!currentAlias[0] || !currentAlias[1]) {
                throw new Error(`alias name${currentAlias[0]} or alias command${currentAlias[1]} is not a valid value`)
            }else {
                this.realCommand = currentAlias[1];
            }
        }catch(err) {
            log.error(err)
        }
    }
    get command() {
        return currentAlias[0]
    }
    get description() {
        return `alias ${currentAlias[1]}`
    }
    get options() {
        
    }
    async action() {
        runCommand({
            command: this.realCommand,
            successCb: (res) => {
                console.log(res.stdout);
            },
            errorCb: (error) => {
                log.error(error.stderr)
            }
        })
    }
}


function initAlias(instance) {
    Object.entries(alias).forEach(([key, value, index]) => {
        currentAlias = [key, value, index]
        new AliasCommand(instance, key, value)
    })
}

export default initAlias