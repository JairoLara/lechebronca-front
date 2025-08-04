import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLogin from '@/views/AdminLogin.vue'
import AdminPanel from '@/views/AdminPanel.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import BlogView from '@/views/BlogView.vue'
import ProjectView from '@/views/ProjectView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/welcome', name: 'welcome', component: WelcomeView },
  { path: '/admin', name: 'admin', component: AdminLogin },
  {
    path: '/admin/panel',
    name: 'proyectos',
    component: AdminPanel,
    beforeEnter: (to, from, next) => {
      const codigoValido = localStorage.getItem('adminCodigoValido')
      const expiracion = localStorage.getItem('adminCodigoExpira')

      if (codigoValido && expiracion && Date.now() < Number(expiracion)) {
        next()
      } else {
        // Si expiró o no existe, limpia localStorage y redirige
        localStorage.removeItem('adminCodigoValido')
        localStorage.removeItem('adminCodigoExpira')
        next('/admin')
      }
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: ProjectView,
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
