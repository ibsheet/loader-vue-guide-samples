// vuex 4 선언하는 구간. 예시 적용
import { createStore } from 'vuex';

export const CREATE_SHEET = 'CREATE_SHEET';
export const CREATE_SAMPLE = 'CREATE_SAMPLE';
export const REMOVE_SAMPLE = 'REMOVE_SAMPLE';

const initalState = {
  title: ''
};

export default createStore({
  modules: initalState
});