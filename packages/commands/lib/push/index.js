import Command from '@llzcli/great-git-command';

import doAdd from './add.js';
import doCommit from './commit.js';
import doPush from './push.js';

class PushCommand extends Command {
    get command() {
        return 'push'
    }
    get description() {
        return "push"
    }
    get cmdOptions() {
        return {
            isDefault : true
        }
    }
    get options() {
        return [
            [
                '-c, --commit', "commit当前的暂存更改,不执行add阶段",
            ],
            [
                '-f, --force', "强制提交",
            ]
        ]
    }
    async action([{
        commit:onlyCommit = false,
        force
    }]) {
        if(!onlyCommit) {
            await doAdd();
        };
        await doCommit();
        await doPush(force);
        // const result = await execa('git log --branches --not --remotes');
        
    }
}

function Init(instance) {
    return new PushCommand(instance)
}

export default Init