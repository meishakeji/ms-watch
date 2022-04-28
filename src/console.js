
// console error warn 错误警告收集类
// console.log 格式化log
class MSConsole {
  constructor() {
    this.console = window.console;
    this.infoList = [];
    this.infoFns = [];
    this.warnList = [];
    this.warnFns = [];
    this.errorList = [];
    this.errorFns = [];
  }

  log(obj, color1 = "#35495e", color2 = "#41b883") {
    for (let key in obj) {
      log(
        `%c ${key} %c ${obj[key]} `,
        `background: ${color1} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`,
        `background: ${color2} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`
      );
    }
  }

  info(callback) {
    const info = this.console.info;
    if (typeof callback === "function") {
      this.infoFns.push(callback);
    }
    window.console.info = (...arg) => {
      this.infoList.push({
        arg,
        url: encodeURIComponent(window.location.href),
      });
      for (let fn of this.infoFns) {
        fn(...arg);
      }
      info(...arg);
    };
  }

  warn(callback) {
    const warn = this.console.warn;
    if (typeof callback === "function") {
      this.warnFns.push(callback);
    }
    window.console.warn = (...arg) => {
      this.warnList.push({
        arg,
        url: encodeURIComponent(window.location.href),
        createTime: Math.floor(Date.now() / 1000),
      });
      for (let fn of this.warnFns) {
        fn(...arg);
      }
      warn(...arg);
    };
  }

  error(callback) {
    const error = this.console.error;
    if (typeof callback === "function") {
      this.errorFns.push(callback);
    }
    window.console.error = (...arg) => {
      this.errorList.push({
        arg,
        url: encodeURIComponent(window.location.href),
        createTime: Math.floor(Date.now() / 1000),
      });
      for (let fn of this.errorFns) {
        fn(...arg);
      }
      error(...arg);
    };
  }

  getInfo() {
    return {
      warnList: this.warnList,
      errorList: this.errorList,
    };
  }

  clearInfo() {
    this.errorList = [];
    this.warnList = [];
  }
}

module.exports = {
  MSConsole,
};