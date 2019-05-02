import Vue from 'vue'
import Router from 'vue-router'

// lazy-loaded when the route is visited
const Home = () => import('@/views/Home')
//const Profile = () => import('@/components/User/Profile')
const SignUp = () => import('@/views/SignUp')
const SignIn = () => import('@/views/SignIn')
const Dashboard = () => import('@/views/Dashboard')
const About = () => import('@/views/About')
const Profile = () => import('@/views/User/Profile')
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ],
  mode: 'history'
})
