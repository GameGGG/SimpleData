# DataAdapter
用于前端深层次数据获取和数据处理


## 介绍
作者也介绍不出来什么，看用例吧


## 使用方法

#### 安全数据获取
```js
import DataAdapter from 'zw-data-adapter';

const originData = {
  result: {
    name: 'zw',
    time: '2021/2/10',
    title: '标题',
    list: [
      { content: '这是第一条记录' }
      { content: '这是第二条记录' }
    ]
  }
}

const db = DataAdapter(originData);

// 字符串形式获取参数
db.get('result.name') // zw 
db.get('result.list.0.content') // 这是第一条记录
db.get('result.emptyKey') // undefined
db.get('result.emptyKey.emptySubKey') // undefined

// 数组形式获取参数
db.get(['result', 'name']) // zw
db.get(['result', 'list', '0', 'content'])  // 这是第一条记录
db.get(['result', 'emptyKey'])  // undefinde
db.get(['result', 'emptyKey', 'emptySubkey']) // undefined
```

#### 数据获取和设置别名

```js
import DataAdapter from 'zw-data-adapter';

const originData = {
  result: {
    name: 'zw',
    time: '2021/2/10',
    title: '标题',
    list: [
      { content: '这是第一条记录' }
      { content: '这是第二条记录' }
    ]
  }
}

const db = DataAdapter(originData);

db.get({
  author: 'result.name',
  articalTitle: 'result.title',
}); // { author: 'zw', articalTitle: '标题' }
```


#### 数组数据获取

```js
import DataAdapter from 'zw-data-adapter';

const originData = {
  result: {
    name: 'zw',
    time: '2021/2/10',
    title: '标题',
    list: [
      { content: '这是第一条记录' }
      { content: '这是第二条记录' }
    ]
  }
}

const db = DataAdapter(originData);

db.get('result.list') // [{ content: '这是第一条记录' }, { content: '这是第二条记录' }]

db.get('result.list.0') // { content: '这是第一条记录' }

db.get('result.list.$') // [{ content: '这是第一条记录' }, { content: '这是第二条记录' }]
db.get('result.list.$.content') // ['这是第一条记录', '这是第二条记录']
```


#### 数据处理

```js
import DataAdapter from 'zw-data-adapter';

const originData = {
  result: {
    name: 'zw',
    time: '2021/2/10',
    title: '标题',
    state: '0',
    list: [
      { content: '这是第一条记录' }
      { content: '这是第二条记录' }
    ]
  }
}

const db = DataAdapter(originData);

typeof db.get('result.state') // string
typeof db.get('result.state|number')  // number

db.get('result.list.$.content') // ['这是第一条记录', '这是第二条记录']
db.get('result.list|reverse.$.content') // ['这是第二条记录', '这是第一条记录']
```