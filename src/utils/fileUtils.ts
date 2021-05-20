import * as log4js from "log4js";
import * as Fs from "fs"

const log = log4js.getLogger("FileUtils");
log.level = "info";

export class FileUtils {
    public static Move(oldPath: string, newPath: string): void  {
        if (newPath.includes("/")){
            const newPathPrefix: string = newPath.split("/")[0]
            if(Fs.existsSync(newPathPrefix)){
                Fs.rmdirSync(newPathPrefix, { recursive: true });
            }
            Fs.mkdirSync(newPathPrefix)
        }
        Fs.copyFileSync(oldPath, newPath);
        Fs.unlinkSync(oldPath);
        log.info("Successfully moved %s to %s.", oldPath, newPath);
    }
}