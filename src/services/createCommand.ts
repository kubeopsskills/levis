import * as log4js from "log4js";
import * as Minimist from "minimist";
import ILevisCommand from "../interfaces";
import { Command } from "../models";
import { Message } from "../levis/message";
import MicroServiceChart from "../charts";
import { App } from "cdk8s";
import { FileUtils } from "../utils";

const log = log4js.getLogger();

export class CreateCommand implements ILevisCommand {
    
    private command!: Command;
    private app: App;

    constructor(app: App){
        this.app = app;
    }

    init(args: Minimist.ParsedArgs): Command {
        log.debug("CreateCommand");
        const inputFilePath=args.f;
        const outputFilePath=args.o ? args.o: "./manifests";
        
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
        new MicroServiceChart(this.app, this.command);
        this.app.synth();
        FileUtils.Move("./dist", this.command.outputFilePath);
    }

}