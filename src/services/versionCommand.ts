import * as log4js from "log4js";
import ILevisCommand from "../interfaces";
import { Command } from "../models/command";
import { version as packageVersion } from "../../package.json"

const log = log4js.getLogger();

export class VersionCommand implements ILevisCommand {

    private command!: Command;
    private version!: string;

    init(): Command {
         log.debug("VersionCommand");
         this.version = packageVersion;

         const command = {
            configFilePath:'',
            outputFilePath:''
        };

        this.command = command;
        return this.command;
    }

    process(): void {
        log.debug("process");
        console.log("version: " ,this.version);
    }

}