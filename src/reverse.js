function reverseFilterHandle() {
  if (Array.isArray(res)) {
    return res.reverse();
  }
  return res;
}

reverseFilterHandle.filterName = 'reverse';

export default reverseFilterHandle;