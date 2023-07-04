import { execa } from 'execa';
import ora from 'ora';
import log from './log.js'

async function runCommand({
    command,
    successMsg,
    loading,
    errorMsg,
    successCb,
    errorCb,
}) {
    const spinner = ora(loading).start();
    try {
        const result = await execa(command);
        spinner.stop();
        successMsg && log.info(successMsg);
        successCb && successCb(result)
    }catch(err) {
        console.log('失败', err);
        spinner.stop();
        errorMsg && log.error(errorMsg)
        errorCb && errorCb(err.stderr)
    }
}

export {
    runCommand,
}

