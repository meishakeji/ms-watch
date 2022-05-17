// 存储类
class MSStorage {
  constructor(userInfo) {
    this.userId = userInfo && userInfo.userId;
  }

  get(key) {
    const result = window.localStorage.getItem(`${key}`);
    if (result) {
      return JSON.parse(result);
    }
    return false;
  }

  set(key, value) {
    window.localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  remove(key) {
    window.localStorage.removeItem(key);
  }

}

export {
  MSStorage,
};