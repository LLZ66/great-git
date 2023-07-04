import { execa } from 'execa';
import { makeInput, makeList, log, printErrorLog} from '@llzcli/utils';

const COMMIT_TYPE = [
    {
        name: "feat(新功能)",
        value: "feat"
    },
    {
        name: "fix(修复bug)",
        value: "fix"
    },
    {
        name: "docs(文档)",
        value: "docs"
    },
    {
        name: "style(格式)",
        value: "style"
    },
    {
        name: "refactor(重构)",
        value: "refactor"
    },
    {
        name: "perf(优化相关)",
        value: "perf"
    },
    {
        name: "test(增加测试)",
        value: "test"
    },
    {
        name: "chore(构建过程或辅助工具的变动)",
        value: "chore"
    },
    {
        name: "revert(回滚到上一个版本)",
        value: "revert"
    },
    {
        name: "merge(代码合并)",
        value: "merge"
    },
    {
        name: "first commit",
        value: "firstCommit"
    },
]

async function getCommitInfo() {
    const commitType = await makeList({
        choices: COMMIT_TYPE,
        message: "请选择提交类型",
        pageSize: COMMIT_TYPE.length
    });
    if(commitType === 'firstCommit') {
        return {
            commitType,
            commitScope:null,
            commitSubject:null,
        }
    }
    const commitScope = await makeInput({
        defaultValue: "*",
        message: "请输入影响范围,默认*"
    });
    const commitSubject = await makeInput({
        message: "简短描述,不超过50个字符",
        required: true,
        validate: (value) => {
            if(!value.length) {
                return '请输入简短描述'
            }else if(value.length > 50) {
                return  `描述过长,为${value.length}个字符,请缩减`
            }
            else {
                return true
            }
        }
    });
    return {
        commitType,
        commitScope,
        commitSubject,
    }
}

function createCommitMessage({
    commitType,
    commitScope,
    commitSubject
}) {
    return `${commitType}(${commitScope}):${commitSubject}`
}

async function Init() {
    const commitInfo = await getCommitInfo();
    const commitMessage = createCommitMessage(commitInfo);
    try {
        execa(`git commit -m ${commitMessage}`)
    }catch(err) {
        printErrorLog(err)
    }
}

export default Init