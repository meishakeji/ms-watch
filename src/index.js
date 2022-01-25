// 用户信息|内存信息| 导航信息|网络质量|用户操作路径｜javascript 异常信息 ｜ js执行时间 ｜ user-agent｜报文生成时间 

const { MSTiming } = require("./timing.js");
const { MSDevice } = require("./device.js");
const { MSConsole } = require("./console.js");
const { TimeLog, reportSplitTime, errorNum } = require("./config.js");
const { MSError } = require("./error.js");
const { MSUserAction } = require("./userInfo.js");
const { MSSendData } = require("./postData.js");
const { MSStorage } = require("./storage.js");  
const { guid } = require('./utils.js');
const { encode, decode } = require('js-base64');

class MSMain {
  constructor(data) {
    const { projectName, url, router } = data || {};
    this.error = new MSError();
    this.listenLoad();
    this.listenUnload();
    this.listenVisible();
    this.timing = null;
    this.device = null;
    this.mconsole = null;
    this.action = null;
    this.storage = null;
    this.useInfo = null;
    this.timeId = guid();
    window.encode = encode;
    window.decode = decode;
    if(!projectName) {
      throw new Error('projectName 不能为空');
    }
    if(!url) {
      throw new Error('URL 不能为空');
    }
    if(!router) {
      throw new Error('请传入router实例')
    }
    this.projectName = projectName;
    this.url = url;
    this.router = router;
    this.firstEnter = true;
  }

  async init() {
    // 初始化
    const performance =
      window.performance || window.msPerformance || window.webkitPerformance;

    this.timing = new MSTiming(performance);
    this.device = new MSDevice();
    this.mconsole = new MSConsole();
    this.action = new MSUserAction(this.router);
    this.storage = new MSStorage(this.action.userInfo);
    this.useInfo = this.action.userInfo.getUserInfo();

    const timing = await this.timing.getTime();
    let obj = {};
    for (let { key, value } of TimeLog) {
      obj[value] = `${timing[key]}ms`;
    }
    this.mconsole.log(obj);
    this.action.listenRouter();
    this.action.listenAction();
    this.mconsole.warn();
    this.mconsole.error();
    this.error.recordError(this.errorReport.bind(this));

    this.msend = new MSSendData({
      url: this.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    this.report()
  }

  getData() {
    const timing = this.timing.getTime();
    const device = this.device.getInfo();
    const consoleInfo = this.mconsole.getInfo();
    const action = this.action.getInfo();
    delete action.userInfo;
    const { userId, name, realname, phoneNo } = this.useInfo;
    return {
      project: this.projectName,
      requestId: guid(0, 24, false),
      httpHost: window.location.host,
      requestUri: encodeURIComponent(window.location.href),
      user: {
        userId,
        name: name || realname,
        phoneNo,
      },
      timing: this.firstEnter ? timing : null,
      device: this.firstEnter ? device : null,
      logs: [
        {
          "console": consoleInfo,
          "action": action,
          "typeError": this.error.errorList,
        }
      ]
    };
  }

  getLogs() {
    const consoleInfo = this.mconsole.getInfo();
    const action = this.action.getInfo();
    return {
      "console": consoleInfo,
      "action": action,
      "typeError": this.error.errorList,
    };
  }

  clearData() {
    this.timing.clearInfo();
    this.device.clearInfo();
    this.mconsole.clearInfo();
    this.action.clearInfo();
    this.firstEnter = false;
  }
  listenLoad() {
    this.error.handleAddListener("load", () => {
      setTimeout(async () => {
        this.init();
      }, 200)
    });
  }
  listenUnload() {
    let that = this;
    this.error.handleAddListener("unload", () => {
      that.saveLog();
    });
  }

  listenVisible() {
    let that = this;
    this.error.handleAddListener("visibilitychange", (e) => {
      const state = document.visibilityState === 'visible';
      if(state) {
        that.saveLog();
      }
    });
  }

  saveLog() {
    const data = this.getData();
    const errList = this.storage && this.storage.get('MsError') || [];
    if(errList.length > 0) {
      data.logs.unshift(...errList);
    }
    this.storage.set('MsError', data.logs);
    return data;
  }

  clearLog() {
    this.storage.set('MsError', []);
  }

  encodeData(value) {
    const result = JSON.stringify(value);
    return encode(result);
  }

  report() {
    const errList = this.saveLog();

    const logs = errList.logs.length;
    console.log('logs', logs);
    if(logs > 0) {
      const len = logs - 1;
      this.msend.xhrReport(this.encodeData(errList))
      if (Date.now() - errList.logs[len].createTime > reportSplitTime) {
        console.log('report len > 0', errList);
        this.msend.xhrReport(this.encodeData(errList))
        this.clearData();
        this.clearLog();
      }
    } else {
      console.log('report len < 0', errList);
      this.msend.xhrReport(this.encodeData(errList))
      this.clearData();
      this.clearLog();
    }
  }

  errorReport() {
    const errorList = this.error.errorList
    const errList = this.saveLog();
    const logs = errList.logs.length;
    if(logs > 0) {
      const len = logs - 1;
      const bool1 = Date.now() - errList.logs[len].createTime > reportSplitTime;
      const bool2 = errorList.length > errorNum;
      if (bool1 && bool2) {
        console.log('errorReport len > 0', errList);
        this.msend.xhrReport(this.encodeData(errList))
        this.clearData();
        this.clearLog();
      }
    } else {
      console.log('errorReport len < 0', errList);
      this.msend.xhrReport(this.encodeData(errList))
      this.clearData();
      this.clearLog();
    }
  }
}

localStorage.setItem('userInfo', JSON.stringify({
  userId: '123',
  name: '123',
  phoneNo: '18659975072',
}))
const m = new MSMain({
  projectName: 'msManagerAdmin',
  url: 'http://10.38.243.19:9090/v1/fex/track',
  router: {}
})
window.ms = m;
module.exports = {
  MSMain
};