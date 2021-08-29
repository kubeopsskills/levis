import * as Minimist from "minimist";
import { Command } from "../models/command";

/**
 * Represents an LevisCommand.
 */
export interface ILevisCommand {
    /**
     * All Levis instruction .
     */

    /**
     * Initial command properties.
     */
    init(args: Minimist.ParsedArgs): Command;
    
    /**
     * Process command.
     */
    process(): void;
    
}