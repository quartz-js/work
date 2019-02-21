const routes = [{
  path: 'works',
  component: () => import('./../components/work/app'),
  children: [
    {
      path: '',
      name: 'works.index',
      component: () => import('./../components/work/Page/index')
    },
    {
      path: ':id',
      name: 'works.show',
      component: () => import('./../components/work/Page/show')
    }
  ]
}]
module.exports = routes;