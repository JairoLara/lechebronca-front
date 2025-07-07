import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import AdminPanel from '@/views/AdminPanel.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import BlogView from '@/views/BlogView.vue';
import ProjectView from '@/views/ProjectView.vue';
import AdminUpload from '@/views/AdminUpload.vue';



const routes = [
  { path: '/',
    name: 'Home',
    component: HomeView
  },
  { path: '/welcome',
    name: 'welcome',
    component: WelcomeView
  },
  { path: '/admin',
    name: 'admin',
    component: AdminLogin
  },
  { path: '/admin/panel',
    name: 'proyectos',
    component: AdminPanel
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/project/:id',
    name: 'project',
    component: ProjectView
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  {
    path: '/admin/upload',
    name: 'adupload',
    component: AdminUpload
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
