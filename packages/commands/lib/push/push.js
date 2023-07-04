import { execa } from 'execa';
import ora from 'ora'
import { log } from '@llzcli/utils'

const PUSH_COMMAND = (force) => `git push ${force? '-f':''}`

async function Init(force) {
    const spinner = ora('正在提交代码...').start();
    const result = await execa(PUSH_COMMAND(force));
    if(!result.failed) {
        spinner.stop();
        log.info('push成功');
        return true
    }else {
        printErrorLog(stderr);
        spinner.stop();
        throw new Error(`执行git push失败: 原因是:${stderr}`)
    }
};

export default Init