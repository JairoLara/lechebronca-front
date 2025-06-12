import { createRouter, createWebHistory } from 'vue-router';
import Upload from '../components/Upload.vue';
import HomeView from '../views/HomeView.vue';
import AdminLogin from '@/views/AdminLogin.vue';
import AdminPanel from '@/views/AdminPanel.vue';

const routes = [
  { path: '/',
    name: 'Home',
    component: HomeView
  },
  { path: '/upload',
    name: 'upload',
    component: Upload
  },
  { path: '/Admin',
    name: 'admin',
    component: AdminLogin
  },
  { path: '/admin/panel',
    name: 'proyectos',
    component: AdminPanel
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
