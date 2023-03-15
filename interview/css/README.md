#### 盒模型

当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）

一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`
content-box：标准盒子模型，width/height 不包含 padding，border
border-box： 怪异盒子模型， width/height 包含 padding，border



#### 设备像素、css像素、设备独立像素、dpr、ppi 之间的区别

* CSS像素（css pixel, px）: 适用于web编程，在 CSS 中以 px 为后缀，是一个长度单位

px是一个相对单位，相对的是设备像素（device pixel），px会受到下面的因素的影响而变化（每英寸像素（PPI），设备像素比（DPR））

* 设备独立像素：与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念

* dpr设备像素比，代表设备独立像素到设备像素的转换关系，在`JavaScript`中可以通过 `window.devicePixelRatio` 获取

`DPR = 设备像素 / 设备独立像素.    `             当设备像素比为1:1时，使用1（1×1）个设备像素显示1个CSS像素，当设备像素比为2:1时，使用4（2×2）个设备像素显示1个CSS像素

* ppi每英寸像素，表示每英寸所包含的像素点数目，更确切的说法应该是像素密度。数值越高，说明屏幕能以更高密度显示图像

