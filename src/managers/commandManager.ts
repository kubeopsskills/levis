import * as log4js from "log4js";
import * as Minimist from "minimist";
import ILevisCommand from "../interfaces";

const log = log4js.getLogger();

export class CommandManager {
    
    private command?: ILevisCommand;
 
    handle(args: Minimist.ParsedArgs): void{
        log.debug("handle");
        this.command?.init(args);
        this.command?.process();
    }

    setCommand(command: ILevisCommand): void {
        log.debug("setCommand");
        this.command=command;
    }
    
}