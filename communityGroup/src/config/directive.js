import Vue from 'vue';
Vue.directive('numberInt', {
  bind: function (el, binding, vnode) {
    const element = el.getElementsByTagName('input')[0]
    const len = binding.arg  // 初始化设置 
    element.value = Number(element.value).toFixed(len)  // 失焦时候格式化
    element.addEventListener('keyup', function () {
      vnode.data.model.callback(element.value.replace(/[^\d]/g,''))
    });
    element.addEventListener('blur', function () {
      vnode.data.model.callback(element.value.replace(/[^\d]/g,''))
    })
  }
})


