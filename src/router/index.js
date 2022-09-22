import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Detail from '@/views/Detail'
import Confirmation from '@/views/Confirmation'
import Login from '@/views/Login'
import FavouriteBooks from '@/views/FavouriteBooks'
import RegistrationInfo from '@/views/RegistrationInfo'
import config from "../../config"
Vue.use(Router)

const  routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:bookId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/confirmation/:userId',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/favourite',
    name: 'FavouriteBooks',
    component: FavouriteBooks
  },
  {
    path: '/reginfo/:userId',
    name: 'RegistrationInfo',
    component: RegistrationInfo
  }
]
 const router = new Router({
 routes,
 mode:'history'

})

router.beforeEach((to, from, next) => {
console.log("config", config.dev.appTitle)
document.title = `${config.dev.appTitle}-${to.name}`
next()
})

export default router
