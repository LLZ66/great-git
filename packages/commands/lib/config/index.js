import Command from "@llzcli/command";
import { getJsonConfig, writeJsonConfig } from '@llzcli/utils/lib/great-git/json.js';

class ConfigCommand extends Command {
    get command() {
        return "config [configType] [configName] [target]"
    }
    get description() {
        return "set config item (configType === 'alias' || 'set')"
    }
    get options() {
        return [
            // [
            //     '-e, --editor', '编辑器编辑config配置'
            // ]
        ]
    }
    async action([type, configName, target, options]) {
        let jsonConfig = getJsonConfig();
        if(type === 'set' && configName && target) {
            jsonConfig = {
                ...jsonConfig,
                [configName]: target
            }
        }else if(type === 'alias' && configName && target) {
            jsonConfig = {
                ...jsonConfig,
                alias: {
                    ...jsonConfig.alias,
                    [configName]: target
                }
            }
        }
        writeJsonConfig(jsonConfig);
        // if(options['editor']) {
        //     const result = await makeEditor({
        //         defaultValue: getJsonConfig()
        //     });
        //     console.log(res);
        // }
    }
}

function Init(instance) {
    return new ConfigCommand(instance)
};

export default Init;