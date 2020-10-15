import { Construct } from "constructs";
import * as log4js from "log4js";
import * as Minimist from "minimist";
import ILevisCommand from "../interfaces";
import { Message } from "../levis/message";
import { LevisCommand } from "../models";
import CreateCommand from "../services";

const log = log4js.getLogger();

export class CommandManager {
    
    private command?: ILevisCommand;
 
    constructor(app: Construct, commandOption: string) {
        switch(commandOption) {
            case LevisCommand.CREATE: {
                log.debug("create command");
                this.command = new CreateCommand(app);
                break;
            }
            default: {
                Message.Instruction();
                break;
            }
        }
    }

    handle(args: Minimist.ParsedArgs): void{
        log.debug("handle");
        this.command?.init(args);
        this.command?.process();
    }
    
}