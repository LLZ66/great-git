import { execa } from 'execa';
import { log, printErrorLog, runCommand } from '@llzcli/utils'
import { getJsonConfig } from '@llzcli/utils/lib/great-git/json.js';

const {
    add
} = getJsonConfig();

const ADD_COMMAND = add


async function Init(skip) {
    if(!skip) {
        await runCommand({
            command: ADD_COMMAND,
            loading: '正在ADD代码...',
            successMsg: '代码ADD成功',
            errorCb: (err) => {
                printErrorLog(err.stderr);
                throw new Error(`执行git add .失败: 原因是:${err.stderr}`)
            }
        });
    }
}

export default Init