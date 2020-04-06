interface LoggerOptions {
  groups: string[]
}

export class Logger {
  static readonly IOC = 'IoC';
  static readonly ENGINE = 'Engine';
  static readonly GAME = 'Game';
  static readonly MANIFEST = 'Manifest';

  private static options: LoggerOptions = {
    groups: [
      Logger.IOC,
      Logger.ENGINE,
      Logger.MANIFEST,
    ]
  };

  static log(group: string, message?: any, ...optionalParams): void {
    if (Logger.options.groups.indexOf(group) < 0) return;
    optionalParams.unshift(`[${group}] ${message}`);
    console.log(...optionalParams);
  }

  static warn(group: string, message?: any, ...optionalParams: any[]): void {
    if (Logger.options.groups.indexOf(group) < 0) return;
    optionalParams.unshift(`[${group}] ${message}`);
    console.warn(...optionalParams);
  }

  static error(group: string, message?: any, ...optionalParams: any[]): void {
    optionalParams.unshift(`[${group}] ${message}`);
    console.error(...optionalParams);
  }

  static configure(options: LoggerOptions) {
    Logger.options = options;
  }
}
