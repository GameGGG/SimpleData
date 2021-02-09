// core
import DataAdapter from './core';

// 过滤器
import reverse from './reverse';
import number from './number';
import string from './string';

DataAdapter.addFilter(reverse);
DataAdapter.addFilter(number);
DataAdapter.addFilter(string);

export default DataAdapter;
