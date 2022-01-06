const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('../views/404')
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views')
  }
]

export default routes
