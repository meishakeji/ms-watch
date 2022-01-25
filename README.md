# 梅沙科技前端监控脚本

![version](https://img.shields.io/badge/ms--watch-1.1.2-brightgreen.svg)  ![license](https://img.shields.io/badge/license-MIT-blue.svg)

收集运行于浏览器端JS的错误信息、记录页面加载时间、记录AJAX出错信息并发送至后端统计与分析。

## 开发配置

1. ``git clone``此项目；

2. ``npm install``；

3. ``npm run dev``，在**Webapck**下继续开发；

4. ``npm run build``构建用于生产环境的``ms-watch.js``。

5. ``npm run upload``构建用于生产环境的``ms-watch.js``，并发布到npm。

   
## 使用方法

### 引入

``npm install --save ms-watch``，支持以下任一方式加入前端项目中：

1、作为JS文件通过``<script>``引入html中，但必须保证在所有JS脚本的最前执行：

```javascript
<script src="/ms-watch/ms-watch/ms-watch.js"></script>
```

2、支持ES6+的import引入：

```javascript
import { MSMain } from 'ms-watch';
```

3、支持CommonJS语法引入：

```javascript
const { MSMain } = require('meisha-fe-watch');
```



### 使用

```javascript
const m = new MSMain({
  projectName: 'msManagerAdmin',  // 项目名称
  url: 'http://10.38.243.19:9090/v1/fex/track',   // 上报地址
  router: router    // VueRouter 实例
})
```



### 错误上报时机

1.进入系统时（进入系统会获取``localStorage``的``${MsError}-${this.userId}``字段（注意⚠️：避免在业务系统中用到``localstorage``中的``${MsError}-${this.userId}``字段）。

2.当前存储的``log``数大于等于5时。

3.每次捕获到一条错误信息，会同步到``localstorage``；每次执行错误上报，也会同步设置``localstorage``的``${MsError}-${this.userId}``字段为空数组




## 更新日志
### v1.1.3

1. 新增收集``window.onerror、unhandledrejection、addEventListener('error')``的错误信息，对于``Vue``，通过``Vue.config.errorHandler``收集；

2. 新增代理``console``，收集打印的记录；

3. 新增代理``XMLHTTPRequest``，收集AJAX出错信息； 

4. 新增通过``performance``接口收集性能信息，如页面加载完成的时间，解析DOM树结构的时间，请求资源的时间。

5. 获取用户点击信息和路由跳转信息。


## 兼容性

支持IE9+，Edge，Firefox 18+，Chrome 33+，Safari 6.1+，iOS Safari 7.1+，Android Browser 4.4+。

不支持微信小程序内使用。
