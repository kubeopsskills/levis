import * as log4js from "log4js";
import * as Minimist from "minimist";
import ILevisCommand from "../interfaces";
import { Command , Path } from "../models";
import { Message } from "../levis/message";
import MicroServiceChart from "../charts";
import { App } from "cdk8s";
import { FileUtils } from "../utils";

const log = log4js.getLogger();

export class CreateCommand implements ILevisCommand {
    
    private command!: Command;

    init(args: Minimist.ParsedArgs): Command {
        log.debug("CreateCommand");
        // get a value from -f  
        const inputFilePath=args.f;
        // get a value from -o
        const outputFilePath=args.o ? args.o: Path.OUTPUT_PATH;
        
        // Message handler if with -f flag
        if(!inputFilePath){
          Message.CreateInstruction();
        } 
        
        const command = {
            configFilePath: inputFilePath,
            outputFilePath: outputFilePath
        };

        this.command = command;
        return command;
    }

    process(): void {
        log.debug("process");
        const app = new App();
        new MicroServiceChart(app, this.command);
        // Activate CDK8S for generating yaml file
        app.synth();
        FileUtils.Move(Path.CURRENT_PATH, this.command.outputFilePath);
    }

}
