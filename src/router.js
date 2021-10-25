// vue3 에서 사용하는 router 방식입니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';

// page 로 사용할 파일을 불러와서 경로 지정, name 은 router 에서 사용하는 고유 명사
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
});

export default Router;