### 乾坤

1.乾坤的 3 种 JS 隔离机制

- 支持单个微应用的方案一：SnapshotSandBox
  - 遍历了 window，性能不好，同一时间只能激活一个微应用
- 支持单个微应用的方案二：LegacySandBox
  - 优势：不需要遍历 window 上的所有属性
  - 劣势：同一时间只能激活一个微应用
- 支持同时激活多个微应用的方案：ProxySandBox
  - 不需要遍历 window 上所有属性，性能良好，同一时间可以激活多个 微应用

LegacySandBox 其实也是代理方式，由于之后有了更好的方案 ProxySandBox ,支持多个微应用，因此会被逐步淘汰, 而 ProxySandBox 虽然遍历 window，性能不是很好，但是由于兼容性很好，因此还会存在很长的时间
