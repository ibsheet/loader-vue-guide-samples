// vue3 에서 사용하는 router 방식입니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import Sheet from '@/views/Sheet';

// page 로 사용할 파일을 불러와서 경로 지정, name 은 router 에서 사용하는 고유 명사
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    // vuex를 사용하여 하나의 component로 관리
    {path: '/v8/demo/vue', name: 'Home', component: Home},
    {path: '/v8/demo/vue/type', name: 'Type', component: Sheet},
    {path: '/v8/demo/vue/merge', name: 'Merge', component: Sheet},
    {path: '/v8/demo/vue/tree', name: 'Tree', component: Sheet},
    {path: '/v8/demo/vue/subsum', name: 'SubSum', component: Sheet},
    {path: '/v8/demo/vue/formula', name: 'Formula', component: Sheet},
    {path: '/v8/demo/vue/multiple', name: 'Multiple', component: Sheet},
    {path: '/v8/demo/vue/dataload', name: 'DataLoad', component: Sheet},
    {path: '/v8/demo/vue/dialog', name: 'Dialog', component: Sheet},
    {path: '/v8/demo/vue/form', name: 'Form', component: Sheet},
  ]
});

export default Router;