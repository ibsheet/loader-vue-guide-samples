// // vuex 4 선언하는 구간. 예시 적용
import { createStore } from 'vuex';
import { Sheet } from './modules/sheet';
import { Page } from './modules/common';

export default createStore({
  modules: { Sheet, Page }
});
 
