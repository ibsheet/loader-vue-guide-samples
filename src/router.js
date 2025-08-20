// vue3 에서 사용하는 router 방식입니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Sheet from '@/views/Sheet.vue';
import store from '@/store';

const url = process.env.NODE_ENV === 'production' ? '/v8/demo/vue/' : '/';

// page 로 사용할 파일을 불러와서 경로 지정, name 은 router 에서 사용하는 고유 명사
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    // vuex를 사용하여 하나의 component로 관리
    {path: url + '', name: 'Home', component: Home},
    {path: url + 'type', name: 'Type', component: Sheet},
    {path: url + 'merge', name: 'Merge', component: Sheet},
    {path: url + 'tree', name: 'Tree', component: Sheet},
    {path: url + 'subsum', name: 'SubSum', component: Sheet},
    {path: url + 'formula', name: 'Formula', component: Sheet},
    {path: url + 'multiple', name: 'Multiple', component: Sheet},
    {path: url + 'dataload', name: 'DataLoad', component: Sheet},
    {path: url + 'dialog', name: 'Dialog', component: Sheet},
    {path: url + 'form', name: 'Form', component: Sheet},
  ]
});

// 라우터 전환 후 항상 Page.name 세팅
Router.afterEach((to) => {
  if (to.name) {
    // Page 모듈에 namespaced 여부 확인
    // namespaced: false 라면
    store.commit('CHANGE_SAMPLE', to.name);
    // namespaced: true 라면
    // store.commit('Page/CHANGE_SAMPLE', to.name);
  }
});

export default Router;