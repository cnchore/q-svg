import Vue from 'vue'
import Router from 'vue-router'
import svgdraw from '@/components/svg-draw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'svgdraw',
      component: svgdraw
    }
  ]
})
