

const guid = (start, end, isSlice = true) => {
  const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return isSlice ? result.slice(start, end) : result;
}

const tryError = (callback) => {
  if(callback && typeof callback === 'function') {
    try {
      callback();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  guid,
  tryError,
};