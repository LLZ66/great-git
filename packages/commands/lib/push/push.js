import { log, makeConfirm, runCommand } from '@llzcli/utils';
import { getJsonConfig } from '@llzcli/utils/lib/great-git/json.js';
import doAdd from './add.js';
import doCommit from './commit.js';

const { 
    push,
    pull
} = getJsonConfig();

const PUSH_COMMAND = (force) => `${push} ${force? '-f':''}`;
const PULL_COMMAND = pull

function isNeedPull(err) {
    return err.indexOf("hint: (e.g., 'git pull ...') before pushing again.") !== -1
}

function isConflct(err) {
    return err.indexOf("Automatic merge failed; fix conflicts and then commit the result.") !== -1
}

async function handlePushError(err) {
    if(isNeedPull(err.stderr)) {
        const needPull = await makeConfirm({
            message: `当前提交分支有更改,是否需要下拉最新代码(如果需要手动修改,请终止流程后手动修改)`
        });
        if(needPull) {
            await runCommand({
                command: PULL_COMMAND,
                loading: '正在拉取代码...',
                successMsg: '拉取成功,无冲突',
                errorCb: handlePushError
            });
            const needRepush = await makeConfirm({
                message: `是否需要继续提交`
            });
            if(needRepush) {
                await Init();
            }
        }
    }
    if(isConflct(err.stdout)) {
        log.info('当前提交有冲突,请手动合并冲突后再次提交');
        // modification completed
        const isMc = await makeConfirm({
            message: `是否修改冲突完成`
        });
        if(isMc) {
            await doAdd(false);
            await doCommit({
                type: 'merge'
            });
            await Init();
        }
    };
    return true;
}

async function Init(force) {
    runCommand({
        command: PUSH_COMMAND(force),
        loading: '正在提交代码...',
        successMsg: '提交成功',
        errorCb: handlePushError
    })
};

export default Init