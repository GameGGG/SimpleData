import DataAdapter from './../src/index';

const testData = {
  name: 'zw',
  state: '1',
  list: [
    {
      value: 'list item 1',
    },
    {
      value: 'list item 2',
    },
    {
      value: 'list item 3',
    },
  ],
  opt: {
    title: '哈哈'
  }
};

test('No.001 实力化是否导致数据改变', () => {
  const da = DataAdapter(testData);
  expect(da.data).toEqual(testData);
});

test('No.002 获取已有属性是否成功', () => {
  const da = DataAdapter(testData);
  expect(da.get('name')).toBe(testData.name);
  expect(da.get('list')).toBe(testData.list);
});

test('No.003 获取为空属性返回 undefined', () => {
  const da = DataAdapter(testData);
  expect(da.get('test')).toBeUndefined();
  expect(da.get('name.test')).toBeUndefined();
  expect(da.get('test.subTest')).toBeUndefined();
});

test('No.004 获取属性失败默认值生效', () => {
  const da = DataAdapter(testData);
  expect(da.get('test', true)).toBeTruthy();
  expect(da.get('name.test', true)).toBeTruthy();
  expect(da.get('test.subTest.test', true)).toBeTruthy();
});

test('No.005 获取数组值', () => {
  const da = DataAdapter(testData);
  expect(da.get('list')).toBe(testData.list);
  expect(da.get('list.0')).toBe(testData.list[0]);
  expect(da.get('list.1')).toBe(testData.list[1]);
  expect(da.get('list.$')).toEqual(testData.list);
  expect(da.get('list.$.value')).toEqual(testData.list.map(item => item.value));
});

test('No.006 获取数组值异常', () => {
  const da = DataAdapter(testData);
  expect(da.get('list.10000')).toBeUndefined();
  expect(da.get('list.$.test')).toEqual(Array(testData.list.length).fill(undefined));
});

test('No.007 获取数组值异常设置默认值', () => {
  const da = DataAdapter(testData);
  expect(da.get('list.10000', true)).toBeTruthy();
  expect(da.get('list.10000', 111)).toBe(111);
  expect(da.get('list.$.test', true)).toEqual(Array(testData.list.length).fill(true));
  expect(da.get('list.$.test', 111)).toEqual(Array(testData.list.length).fill(111));
  expect(da.get('list.$.test.test', true)).toEqual(Array(testData.list.length).fill(true));
  expect(da.get('list.$.test.test', 111)).toEqual(Array(testData.list.length).fill(111));
});

test('No.008 新增过滤器重名校验', () => {
  expect(() => {
    DataAdapter.addFilter('string', () => {});
  }).toThrow();
});

test('No.009 新增未命名过滤器名称', () => {
  expect(() => {
    DataAdapter.addFilter(() => {});
  }).toThrow();
});
