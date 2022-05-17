
// 主要用于收集设备信息
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
    this.browserVersion = this.getExplore();
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
      browserVersion: this.browserVersion,
      network: this.network,
      // createTime: this.createTime,
      memory: this.memory,
      // url: window.location.href,
    };
  }
}
export {
  MSDevice,
};