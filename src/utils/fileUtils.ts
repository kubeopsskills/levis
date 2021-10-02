import * as log4js from "log4js";
import * as Fs from "fs-extra"

const log = log4js.getLogger("FileUtils");
log.level = "info";

export class FileUtils {
    public static Move(oldPath: string, newPath: string): void  {
        try {
            Fs.moveSync(oldPath, newPath, { overwrite: true });
            log.info("Successfully moved %s to %s.", oldPath, newPath);
        } catch (err) {
            log.error("Cannot move file with error : %s", err);
            throw err;
        }
    }
}