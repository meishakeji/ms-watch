// 用户信息|内存信息| 导航信息|网络质量|用户操作路径｜javascript 异常信息 ｜ js执行时间 ｜ user-agent｜报文生成时间 

import { MSTiming } from "./timing.js"
import { MSDevice } from "./device.js"
import { MSConsole } from "./console.js"
import { TimeLog, reportSplitTime, errorNum, actionNum, initLog } from "./config.js"
import { MSError } from "./error.js"
import { MSUserAction } from "./userAction.js"
import { MSSendData } from "./postData.js"
import { MSStorage } from "./storage.js"
import { guid } from './utils.js'
import { encode, decode } from 'js-base64'

class MsWatch {
  constructor(data) {
    try {
      initLog();
      const { projectName, url, router, reportTime, errorMaxNum, actionMaxNum } = data || {};
      this.reportTime = reportTime || reportSplitTime;
      this.errorMaxNum = errorMaxNum || errorNum;
      this.actionMaxNum = actionMaxNum || actionNum;
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
      this.lastTime = 0;
      this.requestId = guid(0, 24, false);
      this.pending = false;
    } catch(err) {
      console.error(err);
    }
  }

  async init() {
    // 初始化
    const performance =
      window.performance || window.msPerformance || window.webkitPerformance;
    // 获取用户信息
    // 各系统用户信息需要存储在localStorage中的 userInfo 字段
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.userInfo = userInfo;
    }

    this.timing = new MSTiming(performance);
    this.device = new MSDevice();
    this.mconsole = new MSConsole();
    this.action = new MSUserAction(this.router, userInfo);

    this.storage = new MSStorage(userInfo);
   
    const timing = await this.timing.getTime();
    let obj = {};
    for (let { key, value } of TimeLog) {
      obj[value] = `${timing[key]}ms`;
    }
    this.mconsole.log(obj);
    this.action.listenRouter();
    this.action.listenAction(this.actionReport.bind(this));
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
    const timing = this.timing && this.timing.getTime();
    const device = this.device && this.device.getInfo();
    const consoleInfo = this.mconsole && this.mconsole.getInfo();
    const action = this.action && this.action.getInfo();
    action.userInfo = {};
    const { userId, name, realname, phoneNo } = this.userInfo || {};
    consoleInfo['typeError'] = this.error.errorList;
    let logObj = {
      "console": consoleInfo,
      "action": action
    }
    if (this.firstEnter) {
      const result = this.storage && this.storage.get('MsError');
      logObj = result[0] || {};
    }
    const data = {
      project: this.projectName,
      requestId: this.requestId,
      httpHost: window.location.host,
      requestUri: encodeURIComponent(window.location.href),
      user: {
        userId,
        name: name || realname,
        phoneNo,
      },
      // timing: this.firstEnter ? timing : null,
      // device: this.firstEnter ? device : null,
      timing: timing,
      device: device,
      logs: [logObj]
    };
    const conso = logObj.console
    let dataStatus = 0
    if (conso) {
      if((conso.errorList && conso.errorList.length > 0) || (conso.typeError && conso.typeError.length > 0)) {
        dataStatus = 1
      } else if(conso.warnList && conso.warnList.length > 0) {
        dataStatus = 2
      }
    }
    
    data['dataStatus'] = dataStatus;

    return data;
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
    this.mconsole.clearInfo();
    this.action.clearInfo();
    this.firstEnter = false;
    this.error.errorList = [];
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
    this.error.handleAddListener("beforeunload", () => {
      that.saveLog();
    });
  }

  listenVisible() {
    let that = this;
    this.error.handleAddListener("visibilitychange", (e) => {
      const state = document.visibilityState === 'visible';
      if(state) {
        setTimeout(() => {
          that.saveLog();
        }, 200);
      }
    });
  }

  saveLog() {
    try {
      const data = this.getData();
      const errList = this.storage && this.storage.get('MsError') || [];
      
      if(errList.length > 0 && errList[0].console && errList[0].action) {
        const conso = data.logs.console; 
        const action = data.logs.action;
        const conso1 = errList[0].console;
        const action1 = errList[0].action;
        // 分别添加进对应的数组
        const errorList = (conso && conso.errorList) || [];
        conso1.errorList && errorList.push(...conso1.errorList);
        const typeError = (conso && conso.typeError) || [];
        conso1.typeError && typeError.push(...conso1.typeError);
        const warnList = (conso && conso.warnList) || [];
        conso1.warnList && warnList.push(...conso1.warnList);
        // 分别添加进对应的数组
        const clickList = (action && action.clickList) || [];
        action1.clickList && clickList.push(...action1.clickList);
        const routeList = (action && action.routeList) || [];
        action1.routeList && routeList.push(...action1.routeList);
      }
      this.storage.set('MsError', data.logs);
      return data;
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  clearLog() {
    this.storage.set('MsError', []);
  }

  encodeData(value) {
    const result = JSON.stringify(value);
    return encode(result);
  }
  // 上报页面加载时间、设备信息
  async report() {
    const errList = this.saveLog();
    if(this.firstEnter) {
      this.reportData(errList);
    }
  }
  // 上报错误
  errorReport() {
    const errorList = this.error.errorList
    const errList = this.saveLog();
    const bool1 = Date.now() - this.lastTime > this.reportTime;
    const bool2 = errorList.length >= this.errorMaxNum;

    if (bool1 && bool2) {
      this.reportData(errList);
    }
  }
  // 上报
  actionReport() {
    const clickList = this.action.clickList
    const routeList = this.action.routeList
    const data = this.saveLog();
    const bool1 = Date.now() - this.lastTime > this.reportTime;
    const bool2 = clickList.length >= this.actionMaxNum || routeList.length >= this.actionMaxNum;

    if (bool1 && bool2) {
      this.reportData(data);
    }
  }

  async reportData(errList) {
    if(this.pending) {
      return false;
    }
    try {
      this.pending = true;
      await this.msend.xhrReport(this.encodeData(errList));
      this.clearData();
      this.clearLog();
      this.lastTime = Date.now();
      this.pending = false;
    } catch(err) {
      throw err
    }
  }
}
export {
  MsWatch 
};