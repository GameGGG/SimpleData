function numberFilterHandle(val) {
  if (Array.isArray(val)) {
    return val.map(item => Number(item));
  }
  return Number(val);
}

numberFilterHandle.filterName = 'number';

export default numberFilterHandle;
