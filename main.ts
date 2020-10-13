import * as log4js from "log4js";
import * as Minimist from "minimist";
import CreateCommand from './src/services';
import { App } from 'cdk8s';
import { CommandManager } from './src/managers/commandManager';
import { Message } from './src/levis/message';
import { LevisCommand } from './src/models';
// import { CommandManager } from './src/managers/commandManager';
// import { CreateCommand } from './src/services/createCommand';

const log = log4js.getLogger();
log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: {
      type: 'pattern',
      pattern: '%[%d [%p] %f{1} line: %l - %m%n%]',
    }}
  },
  categories: { 
    default: { appenders: ['out'], level: 'debug', enableCallStack: true }
  }
})

const SLICE_POSITION = 2;
const args = Minimist(process.argv.slice(SLICE_POSITION)); 
const command = args._[0];
const app = new App();

switch(command) {
  case LevisCommand.CREATE: {
    log.debug("create command");
    const command = new CommandManager();
    command.setCommand(new CreateCommand(app));
    command.handle(args);
    break;
  }
  default: {
    Message.Instruction();
    break;
  }
}
app.synth();