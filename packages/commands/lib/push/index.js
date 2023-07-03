import Command from '@llzcli/great-git-command';
import { execa } from 'execa'

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
    get alias() {
        return 'p'
    }
    async action(params) {
        const result = await execa('git log --branches --not --remotes');
        console.log(result.stdout);
    }
}

function Init(instance) {
    return new PushCommand(instance)
}

export default Init