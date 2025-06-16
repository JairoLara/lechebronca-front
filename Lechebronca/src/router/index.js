import { createRouter, createWebHistory } from 'vue-router';
import Upload from '../components/Upload.vue';
import HomeView from '../views/HomeView.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import AdminPanel from '@/views/AdminPanel.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import BlogView from '@/views/BlogView.vue';



const routes = [
  { path: '/',
    name: 'Home',
    component: HomeView
  },
  { path: '/welcome',
    name: 'welcome',
    component: WelcomeView
  },
  { path: '/upload',
    name: 'upload',
    component: Upload
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
    path: '/blog',
    name: 'blog',
    component: BlogView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
