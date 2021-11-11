// vue3 에서 사용하는 router 방식입니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Sheet from '@/views/Sheet';

// page 로 사용할 파일을 불러와서 경로 지정, name 은 router 에서 사용하는 고유 명사
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    // vuex를 사용하여 하나의 component로 관리(Home About 두개는 일단 고민...)
    {path: '/home', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},
    {path: '/text', name: 'TextType', component: Sheet},
    {path: '/subsum', name: 'SubSum', component: Sheet},
    {path: '/sheet', name: 'Sheet', component: Sheet}
  ]
});

export default Router;