#### 盒模型

当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）

一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`
content-box：标准盒子模型，width/height 不包含 padding，border
border-box： 怪异盒子模型， width/height 包含 padding，border
