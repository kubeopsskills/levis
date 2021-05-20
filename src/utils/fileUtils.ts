import * as log4js from "log4js";
import * as FsExtra from "fs-extra"

const log = log4js.getLogger("FileUtils");
log.level = "info";

export class FileUtils {
    public static Move(oldPath: string, newPath: string): void  {
        FsExtra.move(oldPath, newPath)
        log.info("Successfully moved %s to %s.", oldPath, newPath);
    }
}