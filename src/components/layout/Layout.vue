<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: #24292e" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn round dense flat :ripple="false" :icon="fabGithub" size="19px" color="white" class="q-mr-sm" no-caps />
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- router-view 태그가 있는 부분이 등록된 컴포넌트가 화면에 표시되는 곳 -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabGithub } from '@quasar/extras/fontawesome-v5';

export default {
  name: 'App',
  setup (props) {
    // vue3 에서는 여기서 다함. lifecycle hook 또한 setup 내부에서 선언하도록 하였습니다
    console.log(props);
    return {
      fabGithub
    }
  }
}
</script>