import * as log4js from "log4js";
import * as Minimist from "minimist";
import { CommandManager } from './src/managers/commandManager';
import { LogConfig } from "./src/utils";

// Setup log config
log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[%d [%p] %f{1} line: %l - %m%n%]",
      },
    },
  },
  categories: {
    default: {
      appenders: ["out"],
      level: "info",
      enableCallStack: true,
    },
  },
});

const log = log4js.getLogger();

/// levis command line interface
///      levis <position-2>  <position-3>       <position-4>
/// e.g. levis   create           -f        <levis-config>.yaml
const SLICE_POSITION = 2;
const args = Minimist(process.argv.slice(SLICE_POSITION)); 
const commandOption = args._[0];

// Adjust LogLevel from argument variable
const logLevel = LogConfig.logLevel(args.v);
log.level = logLevel;

log.debug("App Creating...");
const commandManager = new CommandManager(commandOption);
commandManager.handle(args);