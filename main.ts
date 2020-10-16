import { App } from "cdk8s";
import * as log4js from "log4js";
import * as Minimist from "minimist";
import { CommandManager } from './src/managers/commandManager';

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
const commandOption = args._[0];

log.debug("App Creating...");
const app = new App();
const commandManager = new CommandManager(app, commandOption);
commandManager.handle(args);
app.synth();