import { execa } from 'execa';
import { log, printErrorLog } from '@llzcli/utils'

const ADD_COMMAND = 'git add .'

async function Init(skip) {
    if(!skip) {
        const result = await execa(ADD_COMMAND);
        if(!result.failed) {
            log.info('add阶段成功')
            return true
        }else {
            printErrorLog(stderr);
            throw new Error(`执行git add .失败: 原因是:${stderr}`)
        }
    }
}

export default Init