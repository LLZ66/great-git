import { execa } from 'execa'

const PUSH_COMMAND = 'git push'

async function Init() {
    const result = await execa(PUSH_COMMAND);
    if(!result.failed) {
        log.info('push成功')
        return true
    }else {
        // printErrorLog(stderr);
        // throw new Error(`执行git push失败: 原因是:${stderr}`)
    }
};

export default Init