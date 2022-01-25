
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
const reportSplitTime = 1000 * 10;
// 错误超过6条上报
const errorNum = 5;

module.exports = {
  getBaseUrl,
  TimeLog,
  reportSplitTime,
  errorNum,
};