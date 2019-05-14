import Vue from 'vue'
import Router from 'vue-router'

// lazy-loaded when the route is visited
const Home = () => import('@/views/Home')
const SignUp = () => import('@/views/User/SignUp')
const SignIn = () => import('@/views/User/SignIn')
const Dashboard = () => import('@/views/Dashboard')
const About = () => import('@/views/About')
const Profile = () => import('@/views/User/Profile')
const NotFound = () => import('@/views/Core/404')
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', redirect: '/404' },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/404',
      name: 'notfound',
      component: NotFound
    }
  ],
  mode: 'history'
})

