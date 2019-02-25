import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/chat/:emisor/:receptor',
      name: 'chat',
      component: () => import('./views/chat.vue')
    }
  ]
})
