/**
 * Created by prefrence on 2021/02/09
 * @file core
 * @author white_g <mganxiaolei@gmail.com>
 */

class DataAdapter {
  constructor(data) {
    this.data = data;
  }

  transData(data, computes = []) {
    if (computes.length === 0) {
      return data;
    }
    const compute = computes.shift();
    const computeArr = compute.split(':');
    let result = data;
    const handleFunc = DataAdapter.filterMap[computeArr[0]];
    if (handleFunc) {
      result = handleFunc(data);
    }
    return this.transData(result, computes);
  }

  get(schema, defaultValue) {
    // string类型拆分
    let opt;
    if (Array.isArray(schema)) {
      opt = schema;
    } else if ((typeof schema).toLowerCase() === 'string') {
      opt = schema.split('.');
    } else if ((typeof schema).toLowerCase() === 'object') {
      const result = {};
      Object.keys(schema).forEach(key => {
        result[key] = this.get(schema[key], defaultValue);
      });
      return result;
    }

    return opt.reduce((prevData, item) => {
      const arr = item.split('|');
      key = arr.shift();
      if (prevData && prevData[key]) {
        return this.transData(prevData[key], arr);
      }
      return defaultValue;
    }, this.data);
  }

  // 新增过滤器
  static addFilter(name, func) {
    let filterName = name;
    let filterHandle = func;
    if ((typeof name).toLocaleLowerCase() !== 'string') {
      filterHandle = name;
      filterName = func.filterName;
    }
    if (DataAdapter.filterMap[filterName]) {
      throw new Error('存在重复的过滤器名称');
    }
    DataAdapter.filterMap[filterName] = filterHandle;
  }
}

DataAdapter.filterMap = {};

export default DataAdapter;

