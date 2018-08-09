import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from './components/HelloWorld.vue'
import T1 from './components/T1.vue'

export default new Router({
  routes: [
    { // index
      name: 'index',
      path: '/',
      component: HelloWorld
    },
    { // t1
      name: 't1',
      path: '/t1',
      component: T1
    }
  ]
});
