
// 存储类
class MSStorage {
  constructor(userInfo) {
    this.localStorage = window.localStorage;
    this.userId = userInfo.userId;
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