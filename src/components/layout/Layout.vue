<template>
  <q-layout class="bg-grey-1" view="hhh LpR fFf">
    <!-- Header -->
    <q-header elevated class="text-white" style="background:#42b983;" height-hint="64">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-btn
              round dense flat :ripple="false"
              :icon="fasTable"
              size="sm"
              color="white"
              class="q-mr-sm"
              no-caps
              @click="go('/')"
            />
          </q-avatar>
          <span style="vertical-align:middle">IBSheet8</span>
        </q-toolbar-title>
        <div class="row items-center">
          <q-btn
            v-if="showGithub"
            icon="fab fa-github"
            flat
            dense
            class="q-ml-sm"
            label="GitHub"
          type="a"
          href="https://github.com/ibsheet/loader-vue-guide-samples"
          target="_blank"
        />
        </div>
      </q-toolbar>

      <!-- 탭 (라우트 연동) -->
      <q-tabs align="center" shrink stretch>
        <q-route-tab
          v-for="(info, idx) in sampleInfo"
          :key="idx"
          :to="info.to"
          :label="info.title"
        />
      </q-tabs>
    </q-header>

    <!-- 메인 페이지 컨테이너 (router-view 내 각 페이지에서 <ibsheet-vue> 사용) -->
    <q-page-container class="main-page-container">
      <div class="makeStyles-content">
        <div class="makeStyles-header">
          <q-btn round dense flat :ripple="false" :icon="fasTable" size="xl" no-caps style="color:#42b983;" />
          <span class="makeStyles-title">IBSheet8</span>
          <p class="makeStyles-subTitle">Loader를 사용하여 IBSheet8의 대용량 조회, 높은 자유도, 다양한 렌더링 방식 등 다양한 기능을 Vue 환경에서 제공합니다.</p>
          <q-btn icon="fab fa-github-square" color="secondary" label="GitHub" type="a" href='https://github.com/ibsheet/loader-vue-guide-samples' target="__blank" style="width:150px; margin:5px;"/>
          <!--
          <q-btn color="secondary" label="" type="a" href="https://codesandbox.io/s/github/ibsheet/loader-vue-guide-samples/tree/main?file=/src/main.js" target="__blank" style="width:150px; margin:5px;">
            <codesandbox-icon size="1.5x" style="margin-right:5px;" />
            SandBox
          </q-btn>
          -->
        </div>
      </div>
      <div class="makeStyles-root-grid">
        <!-- router-view 태그가 있는 부분이 등록된 컴포넌트가 화면에 표시되는 곳 (해당 구간에서 Home, 시트 구간을 바꿔주면 될 듯) -->
        <router-view />
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-btn
              round dense flat :ripple="false"
              :icon="fasTable"
              size="sm"
              color="white"
              class="q-mr-sm"
              no-caps
              @click="go('/')"
            />
          </q-avatar>
          <span>IBSheet8</span>
        </q-toolbar-title>
        <div class="row items-center q-gutter-sm">
          <q-badge color="secondary" align="middle">
            {{ year }} © IBSheet8 Vue Guide Sample
          </q-badge>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { fasTable } from '@quasar/extras/fontawesome-v5'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const base = (import.meta.env.MODE === 'production') ? '/v8/demo/vue/' : '/'

export default {
  name: 'Layout',
  setup () {
    const router = useRouter()
    const year = new Date().getFullYear()
    const showGithub = ref(true)

    const sampleInfo = computed(() => ([
      { to: base + 'type',     title: 'Type' },
      { to: base + 'merge',    title: 'Merge' },
      { to: base + 'tree',     title: 'Tree' },
      { to: base + 'dataload', title: 'Dataload' },
      { to: base + 'subsum',   title: 'SubSum' },
      { to: base + 'formula',  title: 'Formula' },
      { to: base + 'form',     title: 'Form' },
      { to: base + 'multiple', title: 'Multiple' },
      { to: base + 'dialog',   title: 'Dialog' }
    ]))

    function go (path) {
      router.push(path)
    }

    return {
      fasTable,
      sampleInfo,
      go,
      year,
      showGithub
    }
  }
}
</script>

<style>
.makeStyles-content {
  padding: 48px 0px 24px;
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
body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>