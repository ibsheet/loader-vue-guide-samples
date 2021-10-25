<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: #42b983;" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md" style="min-height: 64px;">
        <q-btn round dense flat :ripple="false" :icon="fasTable" size="sm" color="white" class="q-mr-sm" no-caps />
        <div class="text-h6">IBSheet8</div>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="makeStyles-content">
        <div class="makeStyles-header">
          <q-btn round dense flat :ripple="false" :icon="fasTable" size="xl" color=" #42b983" no-caps />
          <span class="makeStyles-title">IBSheet8</span>
          <p class="makeStyles-subTitle">Loader를 사용하여 IBSheet8의 대용량 조회, 높은 자유도, 다양한 렌더링 방식 등 다양한 기능을 Vue 환경에서 제공합니다.</p>
        </div>
      </div>
      <div class="makeStyles-root-grid">
        <!-- router-view 태그가 있는 부분이 등록된 컴포넌트가 화면에 표시되는 곳 (해당 구간에서 Home, 시트 구간을 바꿔주면 될 듯) -->
        <router-view />
      </div>
    </q-page-container>
    <footer class="makeStyles-footer">
      <div class="makeStyles-infooter">
        여기는 풋영역이에용
      </div>
    </footer>
  </q-layout>
</template>

<script>
import { fabGithub, fasTable } from '@quasar/extras/fontawesome-v5';

export default {
  name: 'Layout',
  setup (props) {
    // vue3 에서는 여기서 다함. lifecycle hook 또한 setup 내부에서 선언하도록 하였습니다
    console.log(props);
    return {
      fabGithub,
      fasTable
    }
  }
}
</script>

<style>
.makeStyles-content {
  padding: 48px 0px 24px;
  font-family: Noto Sans CJK KR,sans-serif;
  border-bottom: 1px solid rgb(229, 229, 229);
  background-color: rgb(247, 247, 247);
}
.makeStyles-header {
  margin: 0px auto;
  max-width: 1140px;
  padding-left: 24px;
  padding-right: 24px;
}
.makeStyles-title {
  color: #000;
  font-size: 40px;
  font-weight: bold;
  vertical-align: middle;
}
.makeStyles-subTitle {
  font-size: 18px;
  margin-top: 14px;
  margin-bottom: 14px;
}
.makeStyles-root-grid {
  max-width: 1200px;
  padding: 64px 24px 64px 24px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.makeStyles-footer {
  padding: 48px;
  background-color: #fff;
}
.makeStyles-infooter {
  margin: 0px auto;
  max-width: 1140px;
}
</style>