import { execa } from 'execa';
import ora from 'ora'
import { log, makeConfirm } from '@llzcli/utils'

const PUSH_COMMAND = (force) => `git push ${force? '-f':''}`;
const PULL_COMMAND = 'git pull'

function isNeedPull(err) {
    return err.indexOf("hint: (e.g., 'git pull ...') before pushing again.") !== -1
}

async function handlePushError(err) {
    if(isNeedPull(err)) {
        const needPull = await makeConfirm({
            message: `当前提交分支有更改,是否需要下拉最新代码(如果需要手动修改,请终止流程后手动修改)`
        });
        console.log(needPull);
    }
}

async function Init(force) {
    const spinner = ora('正在提交代码...').start();
    try {
        await execa(PUSH_COMMAND(force));
        spinner.stop();
        log.info('push成功');
    }catch(err) {
        spinner.stop();
        handlePushError(err.stderr)
        // printErrorLog(err);
        // spinner.stop();
        // throw new Error(`执行git push失败: 原因是:${err}`)
    }
};

export default Init