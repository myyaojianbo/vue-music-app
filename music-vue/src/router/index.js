import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'src/components/rank/rank'
import Recommend from 'src/components/recommend/recommend'
import Search from 'src/components/search/search'
import Singer from 'src/components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
import UserCenter from 'components/user-center/user-center'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: TopList
      }
    ]
  }, {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  }, {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  }, {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  }, {
    path: '/user',
    component: UserCenter
  }]
})
