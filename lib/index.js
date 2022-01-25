(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meisha_watch"] = factory();
	else
		root["meisha_watch"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((module) => {


const HOST = "test-monitor.meishakeji.com";

const ENV = {
  LOCAL: /^(127.0.0.1|localhost|192.168)/.test(window.location.host),
  DEV: /^(127.0.0.1|localhost|192.168|nathan-|dev-|hank-|kerry-|39.108.58.1)/.test(
    window.location.host
  ),
  TEST: /^test-/.test(window.location.host),
  PRE: /^pre-/.test(window.location.host),
};

const getBaseUrl = () => {
  let baseUrl = "";

  if (ENV.DEV) {
    baseUrl = `//${DEVELOP_LOCAL_HOST}`;
  } else if (ENV.TEST) {
    baseUrl = `//test-${HOST}`;
  } else if (ENV.PRE) {
    baseUrl = HOST ? `//pre-${HOST}` : "";
  } else {
    baseUrl = `//${HOST}`;
  }
  return baseUrl;
};

const TimeLog = [
  {
    key: "redirectTime",
    value: "重定向耗时",
  },
  {
    key: "dnsTime",
    value: "DNS解析耗时",
  },
  {
    key: "connectTime",
    value: "TCP连接耗时",
  },
  {
    key: "requestTime",
    value: "HTTP请求耗时",
  },
  {
    key: "firstByteTime",
    value: "首字节耗时",
  },
  {
    key: "domReadyTime",
    value: "解析dom树耗时",
  },
  {
    key: "whiteTime",
    value: "白屏时间",
  },
  {
    key: "domLoadTime",
    value: "DOMready时间",
  },
  {
    key: "jsEventTime",
    value: "脚本加载时间",
  },
  {
    key: "fpTime",
    value: "FP首屏时间",
  },
  {
    key: "fcpTime",
    value: "FCP首次绘制时间",
  },
  {
    key: "ttiTime",
    value: "首次可交互时间",
  },
  {
    key: "loadTime",
    value: "页面加载完成的时间",
  },
];

// 上报间隔时间
const reportSplitTime = 1000 * 60 * 3;
// 错误超过6条上报
const errorNum = 6;

module.exports = {
  getBaseUrl,
  TimeLog,
  reportSplitTime,
  errorNum,
};

/***/ }),

/***/ "./src/console.js":
/*!************************!*\
  !*** ./src/console.js ***!
  \************************/
/***/ ((module) => {


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
      console.log(
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

/***/ }),

/***/ "./src/device.js":
/*!***********************!*\
  !*** ./src/device.js ***!
  \***********************/
/***/ ((module) => {


class MSDevice {
  constructor(performance) {
    this.width =
      document.documentElement.clientWidth || document.body.clientWidth; //浏览器宽度
    this.height =
      document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
    this.userAgent =
      ("navigator" in window &&
        "userAgent" in navigator &&
        navigator.userAgent.toLowerCase()) || "";
    const p =
      window.performance || window.msPerformance || window.webkitPerformance;

    this.performance = performance || p;
    this.osVersion = this.getOS();
    this.browerVersion = this.getExplore();
    this.network = this.getNetWork();
    
    this.createTime = Date.now();
    this.memory = this.getMemory();
  }

  getOS() {
    var userAgent = this.userAgent;
    var vendor =
      ("navigator" in window &&
        "vendor" in navigator &&
        navigator.vendor.toLowerCase()) ||
      "";
    var appVersion =
      ("navigator" in window &&
        "appVersion" in navigator &&
        navigator.appVersion.toLowerCase()) ||
      "";

    if (/mac/i.test(appVersion)) {
      return "MacOSX";
    }
    if (/win/i.test(appVersion)) {
      return "windows";
    }
    if (/linux/i.test(appVersion)) {
      return "linux";
    }
    if (/iphone/i.test(userAgent) || /ipod/i.test(userAgent)) {
      return "ios";
    }
    if (/ipad/i.test(userAgent)) {
      return "ipad";
    }
    if (/android/i.test(userAgent)) {
      return "android";
    }
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) {
      return "windowsPhone";
    }
  }

  getExplore() {
    var sys = {},
      ua = navigator.userAgent.toLowerCase(),
      s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/))
      ? (sys.ie = s[1])
      : (s = ua.match(/msie ([\d\.]+)/))
      ? (sys.ie = s[1])
      : (s = ua.match(/edge\/([\d\.]+)/))
      ? (sys.edge = s[1])
      : (s = ua.match(/firefox\/([\d\.]+)/))
      ? (sys.firefox = s[1])
      : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
      ? (sys.opera = s[1])
      : (s = ua.match(/micromessenger\/([\d\.]+)/i))
      ? (sys.weixin = s[1])
      : (s = ua.match(/chrome\/([\d\.]+)/))
      ? (sys.chrome = s[1])
      : (s = ua.match(/version\/([\d\.]+).*safari/))
      ? (sys.safari = s[1])
      : (s = ua.match(/weibo\/([\d\.]+)/i))
      ? (sys.weibo = s[1])
      : 0;
    // 根据关系进行判断
    if (sys.ie) return "IE: " + sys.ie;
    if (sys.edge) return "EDGE: " + sys.edge;
    if (sys.firefox) return "Firefox: " + sys.firefox;
    if (sys.weixin) return "weixin: " + sys.weixin;
    if (sys.chrome) return "Chrome: " + sys.chrome;
    if (sys.opera) return "Opera: " + sys.opera;
    if (sys.safari) return "Safari: " + sys.safari;
    if (sys.weibo) return "weibo: " + sys.weibo;
    return "Unkonwn";
  }

  getNetWork() {
    var connection = navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection || { tyep: "unknown" };
    const { effectiveType, downlink, rtt } = connection;

    if (typeof downlink == "number") {
      if (downlink >= 10) {
        connection.type = "wifi";
      } else if (downlink > 2) {
        connection.type = "3g";
      } else if (downlink > 0) {
        connection.type = "2g";
      } else if (downlink == 0) {
        connection.type = "none";
      } else {
        connection.type = "unknown";
      }
    }
    return {
      type: effectiveType || connection.type,
      downlink: downlink,
      rtt: rtt,
      isOnline: navigator.onLine,
    };
  }

  computedSize(value) {
    return value / 1024 / 1024;
  }

  getMemory() {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } =
      this.performance.memory;
    
    return {
      usedSize: this.computedSize(usedJSHeapSize).toFixed(2) + ' MB',
      totalSize: this.computedSize(totalJSHeapSize).toFixed(2) + ' MB',
      limitSize: this.computedSize(jsHeapSizeLimit).toFixed(2) + ' MB',
      // usedJSHeapSize,
      // totalJSHeapSize,
      // jsHeapSizeLimit,
    };
  }

  getInfo() {

    return {
      width: this.width,
      height: this.height,
      userAgent: this.userAgent,
      osVersion: this.osVersion,
      browerVersion: this.browerVersion,
      network: this.network,
      // createTime: this.createTime,
      memory: this.memory,
      // url: window.location.href,
    };
  }
}
module.exports = {
  MSDevice,
};

/***/ }),

/***/ "./src/error.js":
/*!**********************!*\
  !*** ./src/error.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { guid } = __webpack_require__(/*! ./utils.js */ "./src/utils.js");

const ErrorType = {
  SyntaxError: "语法错误",
  TypeError: "类型错误",
  ReferenceError: "声明错误",
  RangeError: "栈溢出错误",
  ResourceError: "资源加载错误",
  HttpError: "http请求错误",
};

class MSError {
  constructor() {
    this.errorList = [];
  }
  // type 为 error 捕获语法等js错误
  // type 为 unhandledrejection 捕获 promise 错误
  recordError(callback) {
    this.handleAddListener("error", (e) => {
      const result = this.getError(e);
      this.errorList.push(result);
      if(callback && typeof callback === 'function') {
        callback();
      }
    });
    this.handleAddListener("unhandledrejection", (e) => {
      const result = this.getError(e);
      this.errorList.push(result);
      if(callback && typeof callback === 'function') {
        callback();
      }
    });
    this.handlerError((message, source, lineno, colno, error) => {
      const e = {
        type: 'runError',
        message,
        source,
        lineno,
        colno,
        ...error
      }
      const result = this.getError(e);
      this.errorList.push(result);
      if(callback && typeof callback === 'function') {
        callback();
      }
    });
  }
  // TypeError: 类型错误
  getSyntaxError(e) {
    const error = e.error;
    const errorType = error.stack.split(":")[0];
    const errorText = ErrorType[errorType];
    let target = "";
    if (e.target === window) {
      target = "window";
    } else if (e.target === document) {
      target = "document";
    } else {
      target = e.target && e.target.nodeName || '';
    }
    let obj = {
      errorText,
      errorType,
      type: e.type,
      message: error.message,
      stack: error.stack,
      nodeName: target,
    };
    if(error.colno) {
      Object.assign(obj, {
        colno: error.colno,
      })
    }
    if(error.lineno) {
      Object.assign(obj, {
        lineno: error.lineno,
      })
    }
    return obj;
  }
  // promise 错误
  getPromiseError(e) {
    const reason = e.reason;
    const errorType = reason.stack.split(":")[0];
    const errorText = ErrorType[errorType] || '未定义错误';
    let obj = {
      errorText,
      errorType,
      type: e.type,
      message: reason.message,
      stack: reason.stack,
      nodeName: 'window',
    };
    return obj;
  }
  // ResourceError: 资源加载错误
  getResourceError(e) {
    let obj = {};
    const target = e.target;
    const nodeNames = ["img", "script", "link"];
    const name = target.nodeName.toLocaleLowerCase();
    if (nodeNames.includes(name)) {
      console.log('target', target);
      obj = {
        nodeName: target.nodeName,
        errorText: "资源加载错误",
        errorType: "ResourceError",
        src: target.src || target.href,
        className: target.className,
        outerHTML: target.outerHTML,
        type: e.type,
      };
      if(name === 'img') {
        Object.assign(obj, {
          top: target.x,
          left: target.y,
          width: target.width,
          height: target.height,
        })
      }
    }
    return obj;
  }
  // 运行的错误
  getRunError(e) {
    const errorType = e.message && e.message.split(':')[0] && e.message.split(':')[0].split(' ')[1];
    const errorText = ErrorType[errorType];
    return {
      nodeName: 'window',
      errorText,
      errorType,
      type: 'runError',
      message: e.message,
      source: e.source,
      lineno: e.lineno,
      colno: e.colno,
      stack: e.stack,
    }
  }

  getError(e) {
    const error = e.error;
    const reason = e.reason;
    let obj = {};
    if (e.target && e.target.nodeName) {
      obj = this.getResourceError(e);
    } else if (error) {
      obj = this.getSyntaxError(e);
    } else if (reason) {
      obj = this.getPromiseError(e);
    } else if(e.type === 'runError') {
      obj = this.getRunError(e);
    }
    Object.assign(obj, {
      createTime: Math.floor(Date.now() / 1000),
      id: guid(24),
      url: window.location.href,
    })
    return obj;
  }
  // 图片、script、css加载错误
  handleAddListener(type, fn) {
    if (window.addEventListener) {
      window.addEventListener(type, fn, true);
    } else {
      window.attachEvent("on" + type, fn);
    }
  }
  handlerError(fn) {
    window.onerror = fn;
  }

  clearInfo() {
    this.errorList = [];
  }
  // vue 错误处理
  // Vue.config.errorHandler = function (err) {
  //   setTimeout(() => {
  //     throw err
  //   })
  // }
}

module.exports = {
  MSError,
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 用户信息|内存信息| 导航信息|网络质量|用户操作路径｜javascript 异常信息 ｜ js执行时间 ｜ user-agent｜报文生成时间 

const { MSTiming } = __webpack_require__(/*! ./timing.js */ "./src/timing.js");
const { MSDevice } = __webpack_require__(/*! ./device.js */ "./src/device.js");
const { MSConsole } = __webpack_require__(/*! ./console.js */ "./src/console.js");
const { TimeLog, reportSplitTime, errorNum } = __webpack_require__(/*! ./config.js */ "./src/config.js");
const { MSError } = __webpack_require__(/*! ./error.js */ "./src/error.js");
const { MSUserAction } = __webpack_require__(/*! ./userInfo.js */ "./src/userInfo.js");
const { MSSendData } = __webpack_require__(/*! ./postData.js */ "./src/postData.js");
const { MSStorage } = __webpack_require__(/*! ./storage.js */ "./src/storage.js");  
const { guid } = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


class MSMain {
  constructor(data) {
    const { projectName, url, router } = data || {};
    this.error = new MSError();
    // this.error.recordError(this.errorReport.bind(this));
    this.listenLoad();
    this.listenUnload();
    this.listenVisible();
    this.timing = null;
    this.device = null;
    this.mconsole = null;
    this.action = null;
    this.storage = null;
    this.useInfo = null;
    this.timeId = guid()
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
    const performance =
      window.performance || window.msPerformance || window.webkitPerformance;

    this.timing = new MSTiming(performance);
    this.device = new MSDevice();
    this.mconsole = new MSConsole();
    this.action = new MSUserAction(this.router);
    this.storage = new MSStorage(this.action.userInfo);
    this.useInfo = this.action.userInfo;

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
    this.msend = new MSSendData({
      url: this.url,
      method: 'post',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;'
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
      requestUri: window.location.href,
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
        }
      ]
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
    const errList = this.storage.get('MsError') || [];
    const res = this.getData();
    errList.push(res);
    this.storage.set('MsError', errList);

    return errList;
  }

  clearLog() {
    this.storage.set('MsError', []);
  }

  report() {
    const errList = this.saveLog();
    console.log('errList', errList);
    console.log(JSON.stringify(errList, null, 4));
    if(errList.length > 0) {
      
      const len = errList.length - 1;
      if (Date.now() - errList[len].createTime > reportSplitTime) {
        console.log('report len > 0', errList);
        this.msend.xhrReport({
          data: errList
        })
        this.clearData();
      }
    } else {
      console.log('report len < 0', errList);
      this.msend.xhrReport({
        data: errList
      })
      this.clearData();
    }
  }

  errorReport() {
    const errorList = this.error.errorList
    const errList = this.saveLog();
    
    if(errList.length > 0) {
      const len = errList.length - 1;
      const bool1 = Date.now() - errList[len].createTime > reportSplitTime;
      const bool2 = errorList.length > errorNum;
      if (bool1 && bool2) {
        console.log('errorReport len > 0', errList);
        this.msend.xhrReport({
          data: errList
        })
        this.clearData();
      }
    } else {
      console.log('errorReport len < 0', errList);
      this.msend.xhrReport({
        data: errList
      })
      this.clearData();
    }
  }
}
// const m = new MSMain({
//   projectName: 1,
//   url: 'http://localhost:3000/test',
//   router: {}
// })
// window.ms = m;
module.exports = {
  MSMain
};

/***/ }),

/***/ "./src/postData.js":
/*!*************************!*\
  !*** ./src/postData.js ***!
  \*************************/
/***/ ((module) => {

class MSSendData {
  constructor({ url, headers, method }) {
    this.url = url;
    this.headers = headers;
    this.method = method;
  }

  xhrReport(data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(this.method, this.url, false);
      // xhr.withCredentials = true;
      Object.keys(this.headers).forEach((key) => {
        xhr.setRequestHeader(key, this.headers[key]);
      });
      xhr.onreadystatechange = () => {
        if(+xhr.readyState === 4 && +xhr.status === 200) {
          resolve(xhr.responseText)
        }
      }

      xhr.onerror = (err) => {
        reject(err)
      }
      xhr.ontimeout = (err) => {
        reject(err)
      }

      xhr.send(JSON.stringify(data));
    })
  }

  sendBeacon(data) {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([JSON.stringify(data)], { 
          type: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        navigator.sendBeacon(this.url, blob);
        resolve(this.data);
      } catch (error) {
        reject(error);
      }
    })
  }
}

module.exports = {
  MSSendData,
};

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((module) => {


class MSStorage {
  constructor(userInfo) {
    this.localStorage = window.localStorage;
  }

  get(key) {
    const result = this.localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    return false;
  }

  set(key, value) {
    this.localStorage.setItem(`${key}-${this.userId}`, JSON.stringify(value));
  }

  remove(key) {
    this.localStorage.removeItem(key);
  }

}

module.exports = {
  MSStorage,
};

/***/ }),

/***/ "./src/timing.js":
/*!***********************!*\
  !*** ./src/timing.js ***!
  \***********************/
/***/ ((module) => {


// const ttiPolyfill = require('tti-polyfill');

class MSTiming {
  constructor(performance) {
    const p =
      window.performance ||
      window.msPerformance ||
      window.webkitPerformance;

    this.performance = performance || p;
    this.timing = performance.timing
  }

  getTime() {
    var t = this.timing;
    var obj = {
      // timing: this.timing
    };
    // 重定向次数
    obj.redirectCount = this.performance.navigation.redirectCount;
    // 重定向耗时
    obj.redirectTime = t.redirectEnd - t.redirectStart
    // DNS解析，DNS查询耗时
    obj.dnsTime = t.domainLookupEnd - t.domainLookupStart;
    // TCP链接耗时
    obj.connectTime = t.connectEnd - t.connectStart;
    // HTTP请求耗时
    obj.requestTime = t.responseEnd - t.requestStart;
    // 获得首字节耗费时间，也叫TTFB
    obj.firstByteTime = t.responseStart - t.navigationStart;
    // 解析dom树耗时
    obj.domReadyTime = t.domComplete - t.responseEnd;
    // 白屏时间耗时
    obj.whiteTime = t.responseStart - t.navigationStart;
    // DOMready时间
    obj.domLoadTime = t.domContentLoadedEventEnd - t.navigationStart;
    // 脚本加载时间
    obj.jsEventTime = t.domContentLoadedEventEnd - t.domContentLoadedEventStart
    // 页面加载完成的时间 即：onload时间
    obj.loadTime = t.loadEventEnd - t.navigationStart;
    // 首屏时间
    obj.paintTime = t.domComplete - t.navigationStart;
    // 首次可交互时间
    obj.ttiTime = t.domInteractive - t.navigationStart;
    // FP首屏时间   FCP首次绘制时间  首次可交互时间  用户首次交互时间  
    const res = this.getFPTime();
    // const res = await this.getFirstPaintTime()
    // obj.userKeyTime = {
    //   fmpTime: obj.paintTime,
    //   ...res,
    // }
    return {
      ...obj,
      ...res,
      // url: window.location.href,
    }
  }

  getFPTime() {
    const performance = this.performance;
    let obj = {
      fpTime: -1,
      fcpTime: -1,
    };
    if (typeof performance.getEntriesByType === 'function') {
      const fpList = this.performance.getEntriesByName('first-paint');
      const fcpList = this.performance.getEntriesByName('first-contentful-paint');
      console.log('fpList', fpList, fcpList);
      let fp = fpList && fpList[0].duration
      let fcp = fcpList && fcpList[0].duration
      obj = {
        fpTime: fp,
        fcpTime: fcp,
      }
    }
    return obj;
  }

  async getFirstPaintTime() {
    const performance = this.performance
    let obj = {}
    try {
      if (typeof performance.getEntriesByType === 'function') {
        const fpList = this.performance.getEntriesByName('first-paint');
        const fcpList = this.performance.getEntriesByName('first-contentful-paint');
        console.log('fpList', fpList, fcpList);
        let fp = fpList && fpList[0].duration
        let fcp = fcpList && fcpList[0].duration
        obj = {
          fpTime: fp,
          fcpTime: fcp,
        }
      } else {
        let fp = -1
        if (chrome && chrome.loadTimes) {
          let loadTimes = window.chrome.loadTimes();
          let { firstPaintTime, startLoadTime } = loadTimes;
          fp = (firstPaintTime - startLoadTime) * 1000;
        } else if (performance.timing && typeof performance.timing.msFirstPaint === 'number') {
          let {msFirstPaint, navigationStart} = performance.timing;
          fp = msFirstPaint - navigationStart;
        }
        obj = {
          fpTime: fp,
          fcpTime: -1,
        }
      }
      const tti = await ttiPolyfill.getFirstConsistentlyInteractive()
      obj['tti'] = tti
      return obj
    } catch (error) {
      console.warn(error)
      return obj
    }
  }
}

module.exports = {
  MSTiming,
};

/***/ }),

/***/ "./src/userInfo.js":
/*!*************************!*\
  !*** ./src/userInfo.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const { MSStorage } = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
const { guid } = __webpack_require__(/*! ./utils.js */ "./src/utils.js");

class MSUserInfo {
  constructor() {
    this.mstorage = new MSStorage();
    this.userInfo = this.mstorage.get('userInfo');
    this.userId = this.userInfo && this.userInfo.userId;
  }
  // 各系统用户信息需要存储在localStorage中的 userInfo 字段
  getUserInfo() {
    return this.userInfo || {};
  }

}

class MSUserAction {
  constructor(router) {
    if(!router) {
      throw new Error('请传入router实例')
    }
    this.userInfo = new MSUserInfo();
    this.router = router;
    this.routeList = [];
    this.clickList = [];
    this.content = '';
  }

  listenRouter(callback) {
    this.router.beforeEach && this.router.beforeEach((to, from, next) => {
      const obj = {
        to: {
          fullPath: to.fullPath,
          name: to.name,
          params: to.params,
          path: to.path,
          query: to.query
        },
        from: {
          fullPath: from.fullPath,
          name: from.name,
          params: from.params,
          path: from.path,
          query: from.query
        },
        createTime: Math.floor(Date.now() / 1000),
        id: guid(24),
        url: window.location.href,
      };
      this.routeList.push(obj);
      if(callback && typeof callback === 'function') {
        callback(to, from);
      }
      next();
    });
  }

  listenAction() {
    this.listenClick();
  }

  handleAddListener(type, fn) {
    if (window.addEventListener) {
      window.addEventListener(type, fn, true);
    } else {
      window.attachEvent("on" + type, fn);
    }
  }

  listenClick() {
    this.handleAddListener('click', (e) => {
      const target = e.target;
      const innerText = target.innerText;
      this.clickList.push({
        innerText,
        left: e.clientX || e.x || e.offsetX || e.pageX,
        top: e.clientY || e.y || e.offsetY || e.pageY,
        createTime: Math.floor(Date.now() / 1000),
        id: guid(24),
        url: window.location.href,
      })
    })
  }

  getInfo() {
    return {
      userInfo: this.userInfo.userInfo,
      clickList: this.clickList,
      routeList: this.routeList,
    }
  }

  clearInfo() {
    this.clickList = [];
    this.routeList = [];
  }
}


module.exports = {
  MSUserAction,
  MSUserInfo,
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {



const guid = (start, end, isSlice = true) => {
  const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return isSlice ? result.slice(start, end) : result;
}

const tryError = (callback) => {
  if(callback && typeof callback === 'function') {
    try {
      callback();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  guid,
  tryError,
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map