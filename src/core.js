/**
 * Created by prefrence on 2021/02/09
 * @file core
 * @author white_g <mganxiaolei@gmail.com>
 */

 import isType from './../utils/type';

class DataAdapter {
  constructor(data) {
    this.data = data;
  }

  transData(originData, computes = []) {
    if (computes.length === 0) {
      return originData;
    }
    const compute = computes.shift();
    const computeArr = compute.split(':');
    let data = originData;
    let result = originData;
    const handleFunc = DataAdapter.filterMap[computeArr[0]];
    const dataType = isType(data);
    let newData = data;
    // 引用类型数据处理使用copy数据，防止串改原数据
    if (dataType === 'object') {
      data = { ...originData };
    }
    if (dataType === 'array') {
      data = [...originData];
    }
    if (handleFunc && isType(handleFunc) === 'function') {
      result = handleFunc(data);
    } else if (handleFunc && isType(handleFunc) === 'object') {
      const typeHandleFunc = handleFunc[dataType];
      result = typeHandleFunc ? typeHandleFunc(data) : data;
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

    let count = 0;
    let prevData = this.data;
    while (opt.length > count) {
      const item = opt[count];
      count += 1;

      const arr = item.split('|');
      const key = arr.shift();

      if (key === '$') {
        if (isType(prevData) === 'array') {
          return prevData.map(item => {
            return new DataAdapter(item).get(opt.slice(count));
          });
        }
        return defaultValue;
      }

      if (prevData && prevData[key]) {
        prevData = this.transData(prevData[key], arr);
      } else {
        prevData = defaultValue;
      }
    }

    return prevData;
  }

  // 新增过滤器
  static addFilter(name, func) {
    let filterName = name;
    let filterHandle = func;

    if (isType(name) !== 'string') {
      filterHandle = name;
      filterName = name.filterName;
    }

    if (isType(filterHandle) !== 'function' && isType(filterHandle) !== 'object') {
      throw new Error('参数错误')
    }

    if (DataAdapter.filterMap[filterName]) {
      throw new Error('存在重复的过滤器名称');
    }
    DataAdapter.filterMap[filterName] = filterHandle;
  }
}

DataAdapter.filterMap = {};

function creator(data) {
  return new DataAdapter(data);
};

creator.addFilter = DataAdapter.addFilter;

export default creator;

