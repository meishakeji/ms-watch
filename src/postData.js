
// 上报数据
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
      xhr.send(this.transformData(data));
    })
  }

  transformData(data) {
    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      const params = new URLSearchParams();
      params.append('data', data);
      return params;
    } else {
      // 其他类型
      return JSON.stringify(data);
    }
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