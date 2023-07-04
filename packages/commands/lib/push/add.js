import { execa } from 'execa';
import { log, printErrorLog } from '@llzcli/utils'


async function Init() {
    const result = await execa('git add .');
    if(!result.failed) {
        log.info('add阶段成功')
        return true
    }else {
        printErrorLog(stderr);
        throw new Error(`执行git add .失败: 原因是:${stderr}`)
    }
}

export default Init