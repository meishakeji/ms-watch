
// 主要用来收集错误信息
const ErrorType = {
  SyntaxError: "语法错误",
  TypeError: "类型错误",
  ReferenceError: "声明错误",
  RangeError: "栈溢出错误",
  ResourceError: "资源加载错误",
  HttpError: "http请求错误",
};

// vue错误、react错误需要 throw 错误
// Vue.config.errorHandler = function (err) {
//   setTimeout(() => {
//     throw err
//   })
// }
// 
class MSError {
  constructor() {
    this.errorList = [];
  }
  // type 为 error 捕获语法等js错误
  // type 为 unhandledrejection 捕获 promise 错误
  recordError(callback) {
    this.handleAddListener("error", (e) => {
      this.dealError(e, callback);
    });
    this.handleAddListener("unhandledrejection", (e) => {
      this.dealError(e, callback);
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
      this.dealError(e, callback);
    });
  }
  findItem(array, { message, errorType, type, outerHTML }) {
    for(let item of array) {
      const bool1 = message && item.message === message && item.errorType === errorType && item.type === type;
      const bool2 = outerHTML && item.outerHTML === outerHTML && item.errorType === errorType && item.type === type;
      if(bool1 || bool2) {
        return true;
      }
    }
    return false;
  }

  // 处理错误
  dealError(e, callback) {
    const result = this.getError(e);
    
    const bool = this.findItem(this.errorList, result);
    if(!bool) {
      this.errorList.push(result);
    }
    if(callback && typeof callback === 'function') {
      callback(e);
    }
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
      // id: guid(24),
      url: encodeURIComponent(window.location.href),
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
}

module.exports = {
  MSError,
};
