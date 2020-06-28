import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../components/Index/'
// import Odds from '../components/Odds/'
// import Classify from '../components/Classify/'
// import Like from '../components/Like/'
// import My from '../components/My/'
// import SetMy from '../components/My/SetMy/'
// import OrderList from '../components/My/OrderList/'
// import FootPrint from '../components/FootPrint/'
// import CouponHelp from '../components/Help/CouponHelp/'
// import Customer from '../components/Help/Customer/'
// import FeedBack from '../components/Help/FeedBack/'
// import OrderInfo from '../components/Help/OrderInfo/'
// import OrderInfoS from '../components/Help/OrderInfo/Info/'
// import Login from '../components/Login/'
// import Reg from '../components/Login/Reg/'
// import Search from '../components/Search/'
// import Shopping from '../components/Shopping/'
// import PayShopping from '../components/PayShopping/'
// 路由懒加载
const Index = () => import('../components/Index/')
const Odds = () => import('../components/Odds/')
const Classify = () => import('../components/Classify/')
const Like = () => import('../components/Like/')
const My = () => import('../components/My/')
const SetMy = () => import('../components/My/SetMy/')
const OrderList = () => import('../components/My/OrderList/')
const FootPrint = () => import('../components/FootPrint/')
const CouponHelp = () => import('../components/Help/CouponHelp/')
const Customer = () => import('../components/Help/Customer/')
const FeedBack = () => import('../components/Help/FeedBack/')
const OrderInfo = () => import('../components/Help/OrderInfo/')
const OrderInfoS = () => import('../components/Help/OrderInfo/Info/')
const Login = () => import('../components/Login/')
const Reg = () => import('../components/Login/Reg/')
const Search = () => import('../components/Search/')
const Shopping = () => import('../components/Shopping/')
const PayShopping = () => import('../components/PayShopping/')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      keepAlive: true,
      title: '汇折扣-网购省钱神器,每天千款优惠秒杀,低至一折,限时疯抢!',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/odds',
    name: 'Odds',
    component: Odds,
    meta: {
      keepAlive: true,
      title: '9块9包邮_汇折扣优惠券',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/classify',
    name: 'Classify',
    component: Classify,
    meta: {
      keepAlive: true,
      title: '全部分类_汇折扣优惠券',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/like',
    name: 'Like',
    component: Like,
    meta: {
      keepAlive: true,
      title: '收藏列表_汇折扣优惠券',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my',
    name: 'My',
    component: My,
    meta: {
      keepAlive: true,
      title: '我的_汇折扣优惠券',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/setMy',
    name: 'SetMy',
    component: SetMy,
    meta: {
      keepAlive: true,
      title: '设置',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/orderlist',
    name: 'OrderList',
    component: OrderList,
    meta: {
      keepAlive: true,
      title: '我的订单',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/footPrint',
    name: 'FootPrint',
    component: FootPrint,
    meta: {
      keepAlive: true,
      title: '我的足迹',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/couponHelp',
    name: 'CouponHelp',
    component: CouponHelp,
    meta: {
      keepAlive: true,
      title: '新手帮助',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/customer',
    name: 'Customer',
    component: Customer,
    meta: {
      keepAlive: true,
      title: '专属客服',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/feedBack',
    name: 'FeedBack',
    component: FeedBack,
    meta: {
      keepAlive: true,
      title: '意见反馈',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/orderInfo',
    name: 'OrderInfo',
    component: OrderInfo,
    meta: {
      keepAlive: true,
      title: '订单查询',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/my/orderInfo/info/:id',
    name: 'OrderInfoS',
    component: OrderInfoS,
    meta: {
      keepAlive: true,
      title: '订单查询',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true,
      title: '登入',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg,
    meta: {
      keepAlive: true,
      title: '注册',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      keepAlive: true,
      title: '商品搜索',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/shopping/:id',
    name: 'Shopping',
    component: Shopping,
    meta: {
      keepAlive: true,
      title: '立即购买',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  },
  {
    path: '/payShopping/:id',
    name: 'PayShopping',
    component: PayShopping,
    meta: {
      keepAlive: '订单提交',
      title: '立即购买',
      keywords: '汇折扣,优惠券,折扣直播,优惠券折扣,9块9包邮,限时特卖,优品折扣,汇折扣优惠券',
      description: '汇折扣 - 优惠券折扣直播第一站！每天更新千款，纯人工筛选验货，限时限量特卖，全场1折包邮！'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  document.title = to.meta.title ? to.meta.title : ''
  document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.keywords ? to.meta.keywords : '')
  document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description ? to.meta.description : '')
  // 如果未匹配到路由
  if (to.matched.length === 0) {
    // 如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    from.name ? next({ name: from.name }) : next('/')
  } else {
    // 如果匹配到正确跳转
    next()
  }
})

export default router
