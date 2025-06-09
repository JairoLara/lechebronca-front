import { createRouter, createWebHistory } from 'vue-router';
import Upload from '../components/Upload.vue';

const routes = [
  { path: '/', component: Upload },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
