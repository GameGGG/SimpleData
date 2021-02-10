function reverseFilterHandle(res) {
  return res.reverse();
}
export default {
  array: reverseFilterHandle,
  filterName: 'reverse',
};