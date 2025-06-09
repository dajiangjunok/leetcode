#### 盒模型

当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）

一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`
content-box：标准盒子模型，width/height 不包含 padding，border
border-box： 怪异盒子模型， width/height 包含 padding，border

#### 设备像素、css 像素、设备独立像素、dpr、ppi 之间的区别

- CSS 像素（css pixel, px）: 适用于 web 编程，在 CSS 中以 px 为后缀，是一个长度单位

px 是一个相对单位，相对的是设备像素（device pixel），px 会受到下面的因素的影响而变化（每英寸像素（PPI），设备像素比（DPR））

- 设备独立像素：与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念

- dpr 设备像素比，代表设备独立像素到设备像素的转换关系，在`JavaScript`中可以通过 `window.devicePixelRatio` 获取

`DPR = 设备像素 / 设备独立像素.    ` 当设备像素比为 1:1 时，使用 1（1×1）个设备像素显示 1 个 CSS 像素，当设备像素比为 2:1 时，使用 4（2×2）个设备像素显示 1 个 CSS 像素

- ppi 每英寸像素，表示每英寸所包含的像素点数目，更确切的说法应该是像素密度。数值越高，说明屏幕能以更高密度显示图像

#### css BEM 命名方式

BEM 是一种 css 命名规范， B 代表 block E 代表 element M 代表 modifier

- `-` 中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
- `__` 双下划线：双下划线用来连接块和块的子元素
- `_` 单下划线：单下划线用来描述一个块或者块的子元素的一种状态

**block 写法 bem 写法和常规写法基本一致**

**element 元素写法则不同**

```html
/* 常规写法 */
<ul class="list">
  <li class="item">Pricing</li>
  <li class="item">Contact</li>
</ul>

/* BEM写法 */
<ul class="list">
  <li class="list__item">Pricing</li>
  <li class="list__item">Contact</li>
</ul>

<style>
  /* 常规写法 */
  .list {
  }
  .list .item {
  }

  /* BEM写法 */
  .list {
  }
  .list__item {
  }
</style>
```

**modifier 修饰符写法**

```html
/* 常规写法 */
<ul class="list">
  <li class="item">Pricing</li>
  <li class="item">Contact</li>
</ul>

/* BEM写法 */
<ul class="list">
  <li class="list__item_active">Pricing</li>
  <li class="list__item">Contact</li>
</ul>

<style>
  /* 常规写法 */
  .list {
  }
  .list .item {
  }
  .list .item.active {
  }

  /* BEM写法 */
  .list {
  }
  .list__item {
  }
  .list__item_active {
  }
</style>
```

##### BEM写法优势

- 摆脱特异性的困扰
- 修复继承问题
- 停止担心命名
