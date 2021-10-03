import * as Minimist from "minimist";


export class LogConfig {

  public static logLevel(args: string[]): string {
    const logLevelArgs = Minimist(args.slice(7));
    const defaultLogLevel = "info";

    if (logLevelArgs) {
      switch (logLevelArgs["v"]) {
        case 1:
          return defaultLogLevel;
        case 2:
          return "debug";
      }
    }
    
    return defaultLogLevel;
  }
  
}
