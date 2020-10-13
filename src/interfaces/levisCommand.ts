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
     * TODO: explain this method.
     */
    init(args: Minimist.ParsedArgs): Command;
    
    /**
     * TODO: explain this method.
     */
    process(): void;
    
}