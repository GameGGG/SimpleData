function stringFilterHandle(val) {
  if (Array.isArray(val)) {
    return val.map(item => String(item));
  }
  return String(val);
}

stringFilterHandle.filterName = 'string';

export default stringFilterHandle;
