/**
 * @param val { any }
 * @description 类型判断(string, number, boolean, array, function, object)
 * @return type { string }
 */

export default function isType(val) {
  let type = (typeof val).toLocaleLowerCase();
  if (type === 'object' && Array.isArray(val)) {
    type = 'array';
  }
  return type;
}
