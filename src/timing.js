
// const ttiPolyfill = require('tti-polyfill');
// 获取页面加载时间
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
    const result = {
      ...obj,
      ...res,
      // url: window.location.href,
    };
    for(let key in result) {
      result[key] = Math.floor(result[key])
    } 
    return result;
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
      let fp = fpList && fpList[0].startTime
      let fcp = fcpList && fcpList[0].startTime
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
        // console.log('fpList', fpList, fcpList);
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