"use strict";
window.onload = () => {
    class WuJie extends HTMLElement {
        constructor() {
            super();
            // shadowdom 样式隔离  不会去影响外层的样式
            let dom = this.attachShadow({ mode: 'open' });
            let template = document.querySelector('#wuJie');
            dom.appendChild(template.content.cloneNode(true));
            console.log(this.getAttr('name'));
        }
        getAttr(attr) {
            return this.getAttribute(attr);
        }
        connectedCallback() {
            console.log('组件挂载');
        }
        disconnectedCallback() {
            console.log('组件卸载');
        }
        attributeChangedCallback() {
            console.log('组件属性发生变化');
        }
    }
    window.customElements.define('wu-jie', WuJie);
};
