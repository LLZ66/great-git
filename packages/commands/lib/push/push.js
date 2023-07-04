import { execa } from 'execa';
import ora from 'ora'
import { log } from '@llzcli/utils'

const PUSH_COMMAND = (force) => `git push ${force? '-f':''}`

function handlePushError(err) {
    console.log(err);
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
    }
};

export default Init