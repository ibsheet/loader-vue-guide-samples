// vue3 에서 사용하는 router 방식입니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import Sheet from '@/views/Sheet';

// page 로 사용할 파일을 불러와서 경로 지정, name 은 router 에서 사용하는 고유 명사
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    // vuex를 사용하여 하나의 component로 관리
    {path: '/', name: 'Home', component: Home},
    {path: '/type', name: 'Type', component: Sheet},
    {path: '/merge', name: 'Merge', component: Sheet},
    {path: '/tree', name: 'Tree', component: Sheet},
    {path: '/subsum', name: 'SubSum', component: Sheet},
    {path: '/formula', name: 'Formula', component: Sheet},
    {path: '/multiple', name: 'Multiple', component: Sheet},
    {path: '/dataload', name: 'DataLoad', component: Sheet},
    {path: '/dialog', name: 'Dialog', component: Sheet},
    {path: '/form', name: 'Form', component: Sheet},
  ]
});

export default Router;