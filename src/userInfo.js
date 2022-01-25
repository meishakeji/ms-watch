
const { MSStorage } = require("./storage.js");
const { guid } = require("./utils.js");

// 获取用户信息
// 各系统用户信息需要存储在localStorage中的 userInfo 字段
class MSUserInfo {
  constructor() {
    this.mstorage = new MSStorage();
    this.userInfo = this.mstorage.get('userInfo');
    this.userId = this.userInfo && this.userInfo.userId;
  }
  getUserInfo() {
    return this.userInfo || {};
  }

}

// 记录采集用户信息操作
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
  // 监听路由， 需要传入 router 实例
  // TODO 待优化，可以解藕 
  // 利用 window.onhashchange和 window.onpopstate获取路由跳转信息
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

  getClassName(target) {
    let ids = target.id;
    let className = target.className;
    while(target && !target.id && !target.className) {
      ids += ` ${target.id}`;
      className += ` ${target.className}`;
      target = target.parentElement;
    }

    return `id:${ids} className:${className}`;
  }
  // 监听点击事件，获取点击位置，点击元素信息
  listenClick() {
    this.handleAddListener('click', (e) => {
      const target = e.target;
      const innerText = target.innerText;
      const className = this.getClassName(target);
      this.clickList.push({
        innerText,
        className,
        left: e.clientX || e.x || e.offsetX || e.pageX,
        top: e.clientY || e.y || e.offsetY || e.pageY,
        createTime: Math.floor(Date.now() / 1000),
        url: encodeURIComponent(window.location.href),
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