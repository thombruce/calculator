import Vue from 'vue'
import App from './App.vue'
import TNT from '@thombruce/tnt'

import '@thombruce/tnt/dist/tnt.css'
import '@thombruce/tnt/src/assets/index.css'

Vue.use(TNT)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
