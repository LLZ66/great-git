import path from 'node:path'
import { program } from 'commander';
import senver from 'semver';
import chalk from 'chalk';
import { dirname } from 'dirname-filename-esm';
import fse from 'fs-extra';
import InitCommands from '@llzcli/great-git-commands'

const NODE_LATEST_VERSION = '14.0.0';
const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJSONSync(pkgPath)

function checkNodeVersion() {
  if(!senver.gt(process.version, NODE_LATEST_VERSION)) {
    throw new Error(chalk.red(`greate git需要安装 ${NODE_LATEST_VERSION}版本以上的Node.js`))
  }
}

function preAction() {
  checkNodeVersion()
}

function entry() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试模式", false);
  InitCommands(program)
  program.hook('preAction', preAction);
  program.parse(process.argv)
}

export default entry