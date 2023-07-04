import { execa } from 'execa';
import ora from 'ora'
import { log, makeConfirm, runCommand } from '@llzcli/utils'

const PUSH_COMMAND = (force) => `git push ${force? '-f':''}`;
const PULL_COMMAND = 'git pull'

function isNeedPull(err) {
    return err.indexOf("hint: (e.g., 'git pull ...') before pushing again.") !== -1
}

function isConflct(err) {
    return err.indexOf("Automatic merge failed; fix conflicts and then commit the result.") !== -1
}

async function handlePushError(err) {
    if(isNeedPull(err)) {
        const needPull = await makeConfirm({
            message: `当前提交分支有更改,是否需要下拉最新代码(如果需要手动修改,请终止流程后手动修改)`
        });
        if(needPull) {
            runCommand({
                command: PULL_COMMAND,
                loading: '正在拉取代码...',
                successMsg: '拉取成功',
                errorCb: handlePushError
            })
            // const spinner = ora('正在拉取代码...').start();
            // try {
            //     await execa(PULL_COMMAND);
            //     spinner.stop();
            //     log.info('拉取成功');
            // }catch(err) {
            //     spinner.stop();
            //     handlePushError(err.stderr)
            //     // spinner.stop();
            //     // throw new Error(`执行git push失败: 原因是:${err}`)
            // }
        }
    }
    if(isConflct(err)) {
        log.info('当前提交有冲突,请手动合并冲突后再次提交');
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
    // const spinner = ora('正在提交代码...').start();
    // try {
    //     await execa(PUSH_COMMAND(force));
    //     spinner.stop();
    //     log.info('push成功');
    // }catch(err) {
    //     spinner.stop();
    //     handlePushError(err.stderr)
    // }
};

export default Init