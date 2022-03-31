!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.meisha_watch=t():e.meisha_watch=t()}(self,function(){return o={"./node_modules/js-base64/base64.js":
/*!******************************************!*\
  !*** ./node_modules/js-base64/base64.js ***!
  \******************************************/function(e,t,r){"undefined"!=typeof self||"undefined"!=typeof window||void 0!==r.g&&r.g,e.exports=function(){"use strict";var h="3.7.2",d=h,l=typeof atob==="function",f=typeof btoa==="function",e=typeof Buffer==="function",m=typeof TextDecoder==="function"?new TextDecoder:undefined,p=typeof TextEncoder==="function"?new TextEncoder:undefined,g,c=Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),s=function(e){var r={};e.forEach(function(e,t){return r[e]=t});return r}(c),w=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,a=String.fromCharCode.bind(String),y=typeof Uint8Array.from==="function"?Uint8Array.from.bind(Uint8Array):function(e,t){if(t===void 0)t=function(e){return e};return new Uint8Array(Array.prototype.slice.call(e,0).map(t))},v=function(e){return e.replace(/=/g,"").replace(/[+\/]/g,function(e){return e=="+"?"-":"_"})},x=function(e){return e.replace(/[^A-Za-z0-9\+\/]/g,"")},T=function(e){var t,r,o,n,i="";var s=e.length%3;for(var a=0;a<e.length;){if((r=e.charCodeAt(a++))>255||(o=e.charCodeAt(a++))>255||(n=e.charCodeAt(a++))>255)throw new TypeError("invalid character found");t=r<<16|o<<8|n;i+=c[t>>18&63]+c[t>>12&63]+c[t>>6&63]+c[t&63]}return s?i.slice(0,s-3)+"===".substring(s):i},i=f?function(e){return btoa(e)}:e?function(e){return Buffer.from(e,"binary").toString("base64")}:T,r=e?function(e){return Buffer.from(e).toString("base64")}:function(e){var t=4096;var r=[];for(var o=0,n=e.length;o<n;o+=t)r.push(a.apply(null,e.subarray(o,o+t)));return i(r.join(""))},t=function(e,t){if(t===void 0)t=false;return t?v(r(e)):r(e)},E=function(e){if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?a(192|t>>>6)+a(128|t&63):a(224|t>>>12&15)+a(128|t>>>6&63)+a(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return a(240|t>>>18&7)+a(128|t>>>12&63)+a(128|t>>>6&63)+a(128|t&63)}},L=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,S=function(e){return e.replace(L,E)},b=e?function(e){return Buffer.from(e,"utf8").toString("base64")}:p?function(e){return r(p.encode(e))}:function(e){return i(S(e))},o=function(e,t){if(t===void 0)t=false;return t?v(b(e)):b(e)},I=function(e){return o(e,true)},A=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,k=function(e){switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),r=t-65536;return a((r>>>10)+55296)+a((r&1023)+56320);case 3:return a((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return a((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},C=function(e){return e.replace(A,k)},j=function(e){e=e.replace(/\s+/g,"");if(!w.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(e.length&3));var t,r="",o,n;for(var i=0;i<e.length;){t=s[e.charAt(i++)]<<18|s[e.charAt(i++)]<<12|(o=s[e.charAt(i++)])<<6|(n=s[e.charAt(i++)]);r+=o===64?a(t>>16&255):n===64?a(t>>16&255,t>>8&255):a(t>>16&255,t>>8&255,t&255)}return r},n=l?function(e){return atob(x(e))}:e?function(e){return Buffer.from(e,"base64").toString("binary")}:j,M=e?function(e){return y(Buffer.from(e,"base64"))}:function(e){return y(n(e),function(e){return e.charCodeAt(0)})},B=function(e){return M(N(e))},D=e?function(e){return Buffer.from(e,"base64").toString("utf8")}:m?function(e){return m.decode(M(e))}:function(e){return C(n(e))},N=function(e){return x(e.replace(/[-_]/g,function(e){return e=="-"?"+":"/"}))},F=function(e){return D(N(e))},R,P=function(e){return{value:e,enumerable:false,writable:true,configurable:true}},U=function(){var e=function(e,t){return Object.defineProperty(String.prototype,e,P(t))};e("fromBase64",function(){return F(this)});e("toBase64",function(e){return o(this,e)});e("toBase64URI",function(){return o(this,true)});e("toBase64URL",function(){return o(this,true)});e("toUint8Array",function(){return B(this)})},O=function(){var e=function(e,t){return Object.defineProperty(Uint8Array.prototype,e,P(t))};e("toBase64",function(e){return t(this,e)});e("toBase64URI",function(){return t(this,true)});e("toBase64URL",function(){return t(this,true)})},z,u={version:h,VERSION:d,atob:n,atobPolyfill:j,btoa:i,btoaPolyfill:T,fromBase64:F,toBase64:o,encode:o,encodeURI:I,encodeURL:I,utob:S,btou:C,decode:F,isValid:function(e){if(typeof e!=="string")return false;var t=e.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(t)||!/[^\s0-9a-zA-Z\-_]/.test(t)},fromUint8Array:t,toUint8Array:B,extendString:U,extendUint8Array:O,extendBuiltins:function(){U();O()},Base64:{}};return Object.keys(u).forEach(function(e){return u.Base64[e]=u[e]}),u}()},"./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/e=>{const t="test-monitor.meishakeji.com",r={LOCAL:/^(127.0.0.1|localhost|192.168)/.test(window.location.host),DEV:/^(127.0.0.1|localhost|192.168|nathan-|dev-|hank-|kerry-|39.108.58.1)/.test(window.location.host),TEST:/^test-/.test(window.location.host),PRE:/^pre-/.test(window.location.host)};e.exports={getBaseUrl:()=>{let e="";return e=r.DEV?"//"+DEVELOP_LOCAL_HOST:r.TEST?"//test-"+t:r.PRE?(t,"//pre-"+t):"//"+t},TimeLog:[{key:"redirectTime",value:"重定向耗时"},{key:"dnsTime",value:"DNS解析耗时"},{key:"connectTime",value:"TCP连接耗时"},{key:"requestTime",value:"HTTP请求耗时"},{key:"firstByteTime",value:"首字节耗时"},{key:"domReadyTime",value:"解析dom树耗时"},{key:"whiteTime",value:"白屏时间"},{key:"domLoadTime",value:"DOMready时间"},{key:"jsEventTime",value:"脚本加载时间"},{key:"fpTime",value:"FP首屏时间"},{key:"fcpTime",value:"FCP首次绘制时间"},{key:"ttiTime",value:"首次可交互时间"},{key:"loadTime",value:"页面加载完成的时间"}],reportSplitTime:1e4,errorNum:5}},"./src/console.js":
/*!************************!*\
  !*** ./src/console.js ***!
  \************************/e=>{e.exports={MSConsole:class{constructor(){this.console=window.console,this.infoList=[],this.infoFns=[],this.warnList=[],this.warnFns=[],this.errorList=[],this.errorFns=[]}log(e,t="#35495e",r="#41b883"){for(var o in e)console.log(`%c ${o} %c ${e[o]} `,`background: ${t} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`,`background: ${r} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`)}info(e){const r=this.console.info;"function"==typeof e&&this.infoFns.push(e),window.console.info=(...e)=>{this.infoList.push({arg:e,url:encodeURIComponent(window.location.href)});for(var t of this.infoFns)t(...e);r(...e)}}warn(e){const r=this.console.warn;"function"==typeof e&&this.warnFns.push(e),window.console.warn=(...e)=>{this.warnList.push({arg:e,url:encodeURIComponent(window.location.href),createTime:Math.floor(Date.now()/1e3)});for(var t of this.warnFns)t(...e);r(...e)}}error(e){const r=this.console.error;"function"==typeof e&&this.errorFns.push(e),window.console.error=(...e)=>{this.errorList.push({arg:e,url:encodeURIComponent(window.location.href),createTime:Math.floor(Date.now()/1e3)});for(var t of this.errorFns)t(...e);r(...e)}}getInfo(){return{warnList:this.warnList,errorList:this.errorList}}clearInfo(){this.errorList=[],this.warnList=[]}}}},"./src/device.js":
/*!***********************!*\
  !*** ./src/device.js ***!
  \***********************/e=>{e.exports={MSDevice:class{constructor(e){this.width=document.documentElement.clientWidth||document.body.clientWidth,this.height=document.documentElement.clientHeight||document.body.clientHeight,this.userAgent="navigator"in window&&"userAgent"in navigator&&navigator.userAgent.toLowerCase()||"";var t=window.performance||window.msPerformance||window.webkitPerformance;this.performance=e||t,this.osVersion=this.getOS(),this.browserVersion=this.getExplore(),this.network=this.getNetWork(),this.createTime=Date.now(),this.memory=this.getMemory()}getOS(){var e=this.userAgent,t=("navigator"in window&&"vendor"in navigator&&navigator.vendor.toLowerCase(),"navigator"in window&&"appVersion"in navigator&&navigator.appVersion.toLowerCase()||"");return/mac/i.test(t)?"MacOSX":/win/i.test(t)?"windows":/linux/i.test(t)?"linux":/iphone/i.test(e)||/ipod/i.test(e)?"ios":/ipad/i.test(e)?"ipad":/android/i.test(e)?"android":/win/i.test(t)&&/phone/i.test(e)?"windowsPhone":void 0}getExplore(){var e,t={},r=navigator.userAgent.toLowerCase();return(e=r.match(/rv:([\d.]+)\) like gecko/))||(e=r.match(/msie ([\d\.]+)/))?t.ie=e[1]:(e=r.match(/edge\/([\d\.]+)/))?t.edge=e[1]:(e=r.match(/firefox\/([\d\.]+)/))?t.firefox=e[1]:(e=r.match(/(?:opera|opr).([\d\.]+)/))?t.opera=e[1]:(e=r.match(/micromessenger\/([\d\.]+)/i))?t.weixin=e[1]:(e=r.match(/chrome\/([\d\.]+)/))?t.chrome=e[1]:(e=r.match(/version\/([\d\.]+).*safari/))?t.safari=e[1]:(e=r.match(/weibo\/([\d\.]+)/i))&&(t.weibo=e[1]),t.ie?"IE: "+t.ie:t.edge?"EDGE: "+t.edge:t.firefox?"Firefox: "+t.firefox:t.weixin?"weixin: "+t.weixin:t.chrome?"Chrome: "+t.chrome:t.opera?"Opera: "+t.opera:t.safari?"Safari: "+t.safari:t.weibo?"weibo: "+t.weibo:"Unkonwn"}getNetWork(){var e=navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:"unknown"},{effectiveType:t,downlink:r,rtt:o}=e;return"number"==typeof r&&(e.type=10<=r?"wifi":2<r?"3g":0<r?"2g":0==r?"none":"unknown"),{type:t||e.type,downlink:r,rtt:o,isOnline:navigator.onLine}}computedSize(e){return e/1024/1024}getMemory(){var{usedJSHeapSize:e,totalJSHeapSize:t,jsHeapSizeLimit:r}=this.performance.memory;return{usedSize:this.computedSize(e).toFixed(2)+" MB",totalSize:this.computedSize(t).toFixed(2)+" MB",limitSize:this.computedSize(r).toFixed(2)+" MB"}}getInfo(){return{width:this.width,height:this.height,userAgent:this.userAgent,osVersion:this.osVersion,browserVersion:this.browserVersion,network:this.network,memory:this.memory}}}}},"./src/error.js":
/*!**********************!*\
  !*** ./src/error.js ***!
  \**********************/e=>{const i={SyntaxError:"语法错误",TypeError:"类型错误",ReferenceError:"声明错误",RangeError:"栈溢出错误",ResourceError:"资源加载错误",HttpError:"http请求错误"};e.exports={MSError:class{constructor(){this.errorList=[]}recordError(i){this.handleAddListener("error",e=>{this.dealError(e,i)}),this.handleAddListener("unhandledrejection",e=>{this.dealError(e,i)}),this.handlerError((e,t,r,o,n)=>{e={type:"runError",message:e,source:t,lineno:r,colno:o,...n};this.dealError(e,i)})}findItem(e,{message:t,errorType:r,type:o,outerHTML:n}){for(var i of e){var s=t&&i.message===t&&i.errorType===r&&i.type===o,i=n&&i.outerHTML===n&&i.errorType===r&&i.type===o;if(s||i)return!0}return!1}dealError(e,t){var r=this.getError(e);this.findItem(this.errorList,r)||this.errorList.push(r),t&&"function"==typeof t&&t(e)}getSyntaxError(e){const t=e.error;var r=t.stack.split(":")[0],o=i[r];let n="";n=e.target===window?"window":e.target===document?"document":e.target&&e.target.nodeName||"";o={errorText:o,errorType:r,type:e.type,message:t.message,stack:t.stack,nodeName:n};return t.colno&&Object.assign(o,{colno:t.colno}),t.lineno&&Object.assign(o,{lineno:t.lineno}),o}getPromiseError(e){const t=e.reason;var r=t.stack.split(":")[0];return{errorText:i[r]||"未定义错误",errorType:r,type:e.type,message:t.message,stack:t.stack,nodeName:"window"}}getResourceError(e){let t={};const r=e.target;var o=r.nodeName.toLocaleLowerCase();return["img","script","link"].includes(o)&&(t={nodeName:r.nodeName,errorText:"资源加载错误",errorType:"ResourceError",src:r.src||r.href,className:r.className,outerHTML:r.outerHTML,type:e.type},"img"===o&&Object.assign(t,{top:r.x,left:r.y,width:r.width,height:r.height})),t}getRunError(e){var t=e.message&&e.message.split(":")[0]&&e.message.split(":")[0].split(" ")[1];return{nodeName:"window",errorText:i[t],errorType:t,type:"runError",message:e.message,source:e.source,lineno:e.lineno,colno:e.colno,stack:e.stack}}getError(e){var t=e.error,r=e.reason;let o={};return e.target&&e.target.nodeName?o=this.getResourceError(e):t?o=this.getSyntaxError(e):r?o=this.getPromiseError(e):"runError"===e.type&&(o=this.getRunError(e)),Object.assign(o,{createTime:Math.floor(Date.now()/1e3),url:encodeURIComponent(window.location.href)}),o}handleAddListener(e,t){window.addEventListener?window.addEventListener(e,t,!0):window.attachEvent("on"+e,t)}handlerError(e){window.onerror=e}clearInfo(){this.errorList=[]}}}},"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/(e,r,t)=>{const i=t(/*! ./timing.js */"./src/timing.js")["MSTiming"],s=t(/*! ./device.js */"./src/device.js")["MSDevice"],a=t(/*! ./console.js */"./src/console.js")["MSConsole"],{TimeLog:c,reportSplitTime:o,errorNum:n}=t(/*! ./config.js */"./src/config.js"),d=t(/*! ./error.js */"./src/error.js")["MSError"],l=t(/*! ./userInfo.js */"./src/userInfo.js")["MSUserAction"],f=t(/*! ./postData.js */"./src/postData.js")["MSSendData"],m=t(/*! ./storage.js */"./src/storage.js")["MSStorage"],u=t(/*! ./utils.js */"./src/utils.js")["guid"],{encode:h,decode:p}=t(/*! js-base64 */"./node_modules/js-base64/base64.js");e.exports={MSMain:class{constructor(e){var{projectName:e,url:t,router:r}=e||{};if(this.error=new d,this.listenLoad(),this.listenUnload(),this.listenVisible(),this.timing=null,this.device=null,this.mconsole=null,this.action=null,this.storage=null,this.useInfo=null,this.timeId=u(),window.encode=h,window.decode=p,!e)throw new Error("projectName 不能为空");if(!t)throw new Error("URL 不能为空");if(!r)throw new Error("请传入router实例");this.projectName=e,this.url=t,this.router=r,this.firstEnter=!0,this.lastTime=0,this.requestId=u(0,24,!1)}async init(){var e,t,r=window.performance||window.msPerformance||window.webkitPerformance,o=(this.timing=new i(r),this.device=new s,this.mconsole=new a,this.action=new l(this.router),this.userInfo=this.action.userInfo.getUserInfo()||{},this.storage=new m(this.userInfo),await this.timing.getTime());let n={};for({key:e,value:t}of c)n[t]=o[e]+"ms";this.mconsole.log(n),this.action.listenRouter(),this.action.listenAction(),this.mconsole.warn(),this.mconsole.error(),this.error.recordError(this.errorReport.bind(this)),this.msend=new f({url:this.url,method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded"}}),this.report()}getData(){var e=this.timing.getTime(),t=this.device.getInfo(),r=this.mconsole.getInfo();const o=this.action.getInfo();delete o.userInfo;var{userId:n,name:i,realname:s,phoneNo:a}=this.userInfo;return{project:this.projectName,requestId:this.requestId,httpHost:window.location.host,requestUri:encodeURIComponent(window.location.href),user:{userId:n,name:i||s,phoneNo:a},timing:this.firstEnter?e:null,device:this.firstEnter?t:null,logs:[{console:r,action:o,typeError:this.error.errorList}]}}getLogs(){return{console:this.mconsole.getInfo(),action:this.action.getInfo(),typeError:this.error.errorList}}clearData(){this.mconsole.clearInfo(),this.action.clearInfo(),this.firstEnter=!1}listenLoad(){this.error.handleAddListener("load",()=>{setTimeout(async()=>{this.init()},200)})}listenUnload(){let e=this;this.error.handleAddListener("unload",()=>{e.saveLog()})}listenVisible(){let t=this;this.error.handleAddListener("visibilitychange",e=>{"visible"===document.visibilityState&&t.saveLog()})}saveLog(){const e=this.getData();var t=this.storage&&this.storage.get("MsError")||[];return 0<t.length&&e.logs.unshift(...t),this.storage.set("MsError",e.logs),e}clearLog(){this.storage.set("MsError",[])}encodeData(e){e=JSON.stringify(e);return h(e)}async report(){var e=this.saveLog();this.firstEnter&&this.reportData(e)}errorReport(){var e=this.error.errorList,t=this.saveLog(),r=Date.now()-this.lastTime>o,e=e.length>=n;r&&e&&this.reportData(t)}async reportData(e){try{await this.msend.xhrReport(this.encodeData(e)),this.clearData(),this.clearLog(),this.lastTime=Date.now()}catch(e){throw e}}}}},"./src/postData.js":
/*!*************************!*\
  !*** ./src/postData.js ***!
  \*************************/e=>{e.exports={MSSendData:class{constructor({url:e,headers:t,method:r}){this.url=e,this.headers=t,this.method=r}xhrReport(o){return new Promise((e,t)=>{const r=new XMLHttpRequest;r.open(this.method,this.url,!1),Object.keys(this.headers).forEach(e=>{r.setRequestHeader(e,this.headers[e])}),r.onreadystatechange=()=>{4==+r.readyState&&200==+r.status&&e(r.responseText)},r.onerror=e=>{t(e)},r.ontimeout=e=>{t(e)},r.send(this.transformData(o))})}transformData(e){if("application/x-www-form-urlencoded"!==this.headers["Content-Type"])return JSON.stringify(e);{const t=new URLSearchParams;return t.append("data",e),t}}sendBeacon(o){return new Promise((e,t)=>{try{var r=new Blob([JSON.stringify(o)],{type:"application/x-www-form-urlencoded; charset=UTF-8"});navigator.sendBeacon(this.url,r),e(this.data)}catch(e){t(e)}})}}}},"./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/e=>{e.exports={MSStorage:class{constructor(e){this.localStorage=window.localStorage,this.userId=e.userId}get(e){e=this.localStorage.getItem(e);return!!e&&JSON.parse(e)}set(e,t){this.localStorage.setItem(e+"-"+this.userId,JSON.stringify(t))}remove(e){this.localStorage.removeItem(e)}}}},"./src/timing.js":
/*!***********************!*\
  !*** ./src/timing.js ***!
  \***********************/e=>{e.exports={MSTiming:class{constructor(e){var t=window.performance||window.msPerformance||window.webkitPerformance;this.performance=e||t,this.timing=e.timing}getTime(){var e,t=this.timing,r={},t=(r.redirectCount=this.performance.navigation.redirectCount,r.redirectTime=t.redirectEnd-t.redirectStart,r.dnsTime=t.domainLookupEnd-t.domainLookupStart,r.connectTime=t.connectEnd-t.connectStart,r.requestTime=t.responseEnd-t.requestStart,r.firstByteTime=t.responseStart-t.navigationStart,r.domReadyTime=t.domComplete-t.responseEnd,r.whiteTime=t.responseStart-t.navigationStart,r.domLoadTime=t.domContentLoadedEventEnd-t.navigationStart,r.jsEventTime=t.domContentLoadedEventEnd-t.domContentLoadedEventStart,r.loadTime=t.loadEventEnd-t.navigationStart,r.paintTime=t.domComplete-t.navigationStart,r.ttiTime=t.domInteractive-t.navigationStart,this.getFPTime());const o={...r,...t};for(e in o)o[e]=Math.floor(o[e]);return o}getFPTime(){var e,t;let r={fpTime:-1,fcpTime:-1};return"function"==typeof this.performance.getEntriesByType&&(e=this.performance.getEntriesByName("first-paint"),t=this.performance.getEntriesByName("first-contentful-paint"),e=e&&e[0].startTime,t=t&&t[0].startTime,r={fpTime:e,fcpTime:t}),r}async getFirstPaintTime(){var t,r,o,n,i=this.performance;let s={};try{if("function"==typeof i.getEntriesByType){var e=this.performance.getEntriesByName("first-paint"),a=this.performance.getEntriesByName("first-contentful-paint"),c=e&&e[0].duration,u=a&&a[0].duration;s={fpTime:c,fcpTime:u}}else{let e=-1;chrome&&chrome.loadTimes?({firstPaintTime:t,startLoadTime:r}=window.chrome.loadTimes(),e=1e3*(t-r)):i.timing&&"number"==typeof i.timing.msFirstPaint&&({msFirstPaint:o,navigationStart:n}=i.timing,e=o-n),s={fpTime:e,fcpTime:-1}}var h=await ttiPolyfill.getFirstConsistentlyInteractive();return s.tti=h,s}catch(e){return console.warn(e),s}}}}},"./src/userInfo.js":
/*!*************************!*\
  !*** ./src/userInfo.js ***!
  \*************************/(e,t,r)=>{var{}=r(/*! ./storage.js */"./src/storage.js"),{}=r(/*! ./utils.js */"./src/utils.js");class o{constructor(){var e=localStorage.getItem("userInfo");this.userInfo=e?JSON.parse(e):{},this.userId=this.userInfo&&this.userInfo.userId}getUserInfo(){return this.userInfo||{}}}e.exports={MSUserAction:class{constructor(e){if(!e)throw new Error("请传入router实例");this.userInfo=new o,this.router=e,this.routeList=[],this.clickList=[],this.content=""}listenRouter(n){this.router.beforeEach&&this.router.beforeEach((e,t,r)=>{var o={to:{fullPath:e.fullPath,name:e.name,params:e.params,path:e.path,query:e.query},from:{fullPath:t.fullPath,name:t.name,params:t.params,path:t.path,query:t.query},createTime:Math.floor(Date.now()/1e3)};this.routeList.push(o),n&&"function"==typeof n&&n(e,t),r()})}listenAction(){this.listenClick()}handleAddListener(e,t){window.addEventListener?window.addEventListener(e,t,!0):window.attachEvent("on"+e,t)}getClassName(e){let t=e.id,r=e.className;for(;e&&!e.id&&!e.className;)t+=" "+e.id,r+=" "+e.className,e=e.parentElement;return`id选择器:${t} class选择器:`+r}findItem(e,{left:t,top:r}){for(var o of e){var n=Math.abs(o.left-t)<6,o=Math.abs(o.top-r)<6;if(n&&o)return!0}return!1}listenClick(){this.handleAddListener("click",e=>{var t=e.target,t={innerText:t.innerText,className:this.getClassName(t),left:e.clientX||e.x||e.offsetX||e.pageX,top:e.clientY||e.y||e.offsetY||e.pageY,createTime:Math.floor(Date.now()/1e3),url:encodeURIComponent(window.location.href)};this.findItem(this.clickList,t)||this.clickList.push(t)})}getInfo(){return{userInfo:this.userInfo.userInfo,clickList:this.clickList,routeList:this.routeList}}clearInfo(){this.clickList=[],this.routeList=[]}},MSUserInfo:o}},"./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/e=>{window.log=console.log.bind(console),e.exports={guid:(e,t,r=!0)=>{const o="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)});return r?o.slice(e,t):o},tryError:e=>{if(e&&"function"==typeof e)try{e()}catch(e){console.error(e)}}}}},n={},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r("./src/index.js");function r(e){var t=n[e];if(void 0!==t)return t.exports;t=n[e]={exports:{}};return o[e].call(t.exports,t,t.exports,r),t.exports}var o,n});