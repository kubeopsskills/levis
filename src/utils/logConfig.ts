export class LogConfig {

  public static logLevel(logLevel: number): string {
    const defaultLogLevel = "info";
    switch (logLevel) {
      case 1:
        return defaultLogLevel;
      case 2:
        return "debug";
    }
    return defaultLogLevel;
  }
  
}
