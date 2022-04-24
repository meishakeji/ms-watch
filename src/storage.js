// 存储类
class MSStorage {
  constructor(userInfo) {
    this.userId = userInfo && userInfo.userId;
  }

  get(key) {
    if (!this.userId) {
      return false;
    }
    const result = window.localStorage.getItem(`${key}-${this.userId}`);
    if (result) {
      return JSON.parse(result);
    }
    return false;
  }

  set(key, value) {
    if (!this.userId) {
      return false;
    }
    window.localStorage.setItem(`${key}-${this.userId}`, JSON.stringify(value));
  }

  remove(key) {
    window.localStorage.removeItem(key);
  }

}

module.exports = {
  MSStorage,
};