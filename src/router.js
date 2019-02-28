import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    
    
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/list/:emisor',
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
