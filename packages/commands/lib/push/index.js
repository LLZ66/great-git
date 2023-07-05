import Command from '@llzcli/command';

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
            ],
            [
                '-t, --type <type>', "提交类型",
            ],
            [
                '-s, --scope <scope>', "提交影响范围",
            ],
            [
                '-sb, --subject <subject>', "提交主题",
            ]
        ]
    }
    async action([{
        commit:onlyCommit = false,
        force,
        ...commitPreset
    }]) {
        await doAdd(onlyCommit);
        await doCommit(commitPreset);
        await doPush(force);
        // const result = await execa('git log --branches --not --remotes');
        
    }
}

function Init(instance) {
    return new PushCommand(instance)
}

export default Init