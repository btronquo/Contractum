import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

// lazy-loaded when the route is visited
const About = () => import('@/views/About')
const Dashboard = () => import('@/views/User/Dashboard')
const Events = () => import('@/views/User/Events')
const Home = () => import('@/views/Home')
const Profile = () => import('@/views/User/Profile')
const ProfilePublic = () => import('@/views/User/ProfilePublic')
const SignIn = () => import('@/views/User/SignIn')
const SignUp = () => import('@/views/User/SignUp')


// 404
const NotFound = () => import('@/views/Core/404')


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
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/:id',
      name: 'user public profile',
      component: ProfilePublic,
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

