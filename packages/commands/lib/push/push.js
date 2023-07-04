import { execa } from 'execa';
import { log } from '@llzcli/utils'

const PUSH_COMMAND = (force) => `git push ${force? '-f':''}`

async function Init(force) {
    const result = await execa(PUSH_COMMAND(force));
    if(!result.failed) {
        log.info('push成功')
        return true
    }else {
        printErrorLog(stderr);
        throw new Error(`执行git push失败: 原因是:${stderr}`)
    }
};

export default Init