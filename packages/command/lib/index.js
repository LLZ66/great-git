class Command {
  constructor(instance) {
    if(!instance) {
      throw new Error('command instance must not be null')
    };
    this.program = instance;
    const cmd = this.program.command(this.command, Object.keys(this.cmdOptions).length>0? this.cmdOptions:{})
    cmd.description(this.description);
    if(this.alias) {
      cmd.alias = this.alias;
    }
    cmd.action((...params) => {
      this.action(params)
    })
    if(this.options?.length > 0) {
      this.options.forEach(option => {
        cmd.option(...option)
      });
    };
    cmd.hook('preAction', () => {
      this.preAction();
    })
    cmd.hook('postAction', () => {
      this.postAction();
    })
  }
  get command() {
    throw new Error('command must be implements')
  }

  get description() {
    throw new Error('command description must be implements')
  }

  get options() {
    return []
  }

  get alias() {
    return null;
  }

  get cmdOptions() {
    return {}
  }

  action() {

  }

  preAction() {
    // empty
  }

  postAction() {
    // empty
  }
}


export default Command;