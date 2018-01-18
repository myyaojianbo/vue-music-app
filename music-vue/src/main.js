// babel-polyfill 一定要写在开始
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

// Vue.config.productionTip = false
// 将fastclick  attach到body上，这样整个body下面所有的DOM都会没有300毫秒延迟
fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  // 默认加载图片
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
