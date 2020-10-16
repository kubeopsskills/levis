import * as Fs from "fs";
import * as log4js from "log4js";

const log = log4js.getLogger("FileUtils");
log.level = "info";

export class FileUtils {
    public static Move(oldPath: string, newPath: string): void  {
        if(Fs.existsSync(newPath)) {
            Fs.rmdirSync(newPath, { recursive: true });
        }
        Fs.mkdirSync(newPath, { recursive: true });
        Fs.rename(oldPath, newPath, (error) => {
                if(error) { 
                    log.error(error);
                    process.exit(1);
                }
                Fs.rmdirSync(oldPath, { recursive: true });               
                log.info("Successfully moved %s to %s.", oldPath, newPath);
            }    
        );
    }
}
