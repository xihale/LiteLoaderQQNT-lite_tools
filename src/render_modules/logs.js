import { options } from "./options.js";

const logList = [];

window.LT_logs = () => {
  if (options.debug.console) {
    logList.forEach((el) => {
      console.log(`[${el.name}]`, ...el.log);
    });
  } else {
    console.log("[日志模块]当前没有启用debug");
  }
};

class Logs {
  constructor(moduleName) {
    this.moduleName = moduleName;
    if (options.debug.console) {
      return this.logToConsole.bind(this);
    } else {
      return this.emptyFunction;
    }
  }

  logToConsole(...args) {
    console.log(`[${this.moduleName}]`, ...args);
    this.saveToLogList(args);
  }

  saveToLogList(logData) {
    logList.push({
      name: this.moduleName,
      log: logData,
    });
  }

  emptyFunction() {}
}

export { Logs };
