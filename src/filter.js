const transMap = {
  string: res => {
    if (Array.isArray(res)) {
      return res.map(item => String(item));
    }
    return String(res);
  },
  number: res => {
    if (Array.isArray(res)) {
      return res.map(item => Number(res));
    }
    return Number(res);
  },
  reverse: res => {
    if (Array.isArray(res)) {
      return res.reverse();
    }
    return res;
  }
}
