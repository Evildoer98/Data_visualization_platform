import Vue from 'vue'
import VueRouter from 'vue-router'
// import SellerPage from '@/views/SellerPage'
// import TrendPage from '@/views/TrendPage'
// import MapPage from '@/views/MapPage'
// import StockPage from '@/views/StockPage'
// import RankPage from '@/views/RankPage'
// import HotPage from '@/views/HotPage'
import ScreenPage from '@/views/ScreenPage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  }
  // {
  //   path: '/SellerPage',
  //   component: SellerPage
  // }
  // {
  //   path: '/TrendPage',
  //   component: TrendPage
  // },
  // {
  //   path: '/MapPage',
  //   component: MapPage
  // },
  // {
  //   path: '/StockPage',
  //   component: StockPage
  // },
  // {
  //   path: '/RankPage',
  //   component: RankPage
  // },
  // {
  //   path: '/HotPage',
  //   component: HotPage
  // },

]

const router = new VueRouter({
  routes
})

export default router
