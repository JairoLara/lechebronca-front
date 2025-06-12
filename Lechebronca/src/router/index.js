import { createRouter, createWebHistory } from 'vue-router';
import Upload from '../components/Upload.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/',
    name: 'Home',
    component: HomeView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
