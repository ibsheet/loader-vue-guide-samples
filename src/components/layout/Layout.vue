<template>

  <q-layout class="bg-grey-1" view="hhh LpR fFf">

    <q-header elevated class="text-white" style="background: #42b983;" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-btn round dense flat :ripple="false" :icon="fasTable" size="sm" color="white" class="q-mr-sm" no-caps @click="changeRouter('/')"/>
          </q-avatar>
          <span style="vertical-align:middle"> IBSheet8 </span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab v-for='(info, idx) in sampleInfo' :key='idx' :to="info.to" :label="info.title" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div class="makeStyles-content">
        <div class="makeStyles-header">
          <q-btn round dense flat :ripple="false" :icon="fasTable" size="xl" no-caps style="color:#42b983;" />
          <span class="makeStyles-title">IBSheet8</span>
          <p class="makeStyles-subTitle">Loader를 사용하여 IBSheet8의 대용량 조회, 높은 자유도, 다양한 렌더링 방식 등 다양한 기능을 Vue 환경에서 제공합니다.</p>
          <q-btn icon="fab fa-github-square" color="secondary" label="GitHub" type="a" href='https://github.com/ibsheet/loader-vue-guide-samples' target="__blank" style="width:150px; margin:5px;"/>
          <q-btn color="secondary" label="" type="a" href="https://codesandbox.io/s/github/ibsheet/loader-vue-guide-samples/tree/main?file=/src/main.js" target="__blank" style="width:150px; margin:5px;">
            <codesandbox-icon size="1.5x" style="margin-right:5px;" />
            SandBox
          </q-btn>
        </div>
      </div>
      <div class="makeStyles-root-grid">
        <!-- router-view 태그가 있는 부분이 등록된 컴포넌트가 화면에 표시되는 곳 (해당 구간에서 Home, 시트 구간을 바꿔주면 될 듯) -->
        <router-view />
      </div>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-btn round dense flat :ripple="false" :icon="fasTable" size="sm" color="white" class="q-mr-sm" no-caps @click="changeRouter('/')" />
          </q-avatar>
          <span>IBSheet8</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { fabGithub, fasTable } from '@quasar/extras/fontawesome-v5';
import { computed } from "vue";
import { useStore } from "vuex";
import { CodesandboxIcon } from '@zhuowenli/vue-feather-icons';

const url = process.env.NODE_ENV === 'production' ? '/v8/demo/vue/' : '/';

export default {
  name: 'Layout',
  setup (props) {
    // vue3 에서는 여기서 다함. lifecycle hook 또한 setup 내부에서 선언하도록 하였습니다
    console.log(props);
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetObj = computed(() => store.state.Sheet.sheet);
    const changePage = (title) => store.commit("CHANGE_SAMPLE", title);
    // 삭제만 Layout에서 관리
    const removeSheet = (id) => store.commit("REMOVE_SAMPLE", id);

    return {
      fabGithub,
      fasTable,
      pageName,
      changePage,
      removeSheet,
      sheetObj
    }
  },
  // 라우터 사용
  watch: {
    '$route.name': function (val) {
      // route 경로 변경시 state에 있는 name을 route name로 세팅.
      this.changePage(val);
      // 라우터 변경시 시트 삭제.
      if (this.sheetObj.length > 0) {
        this.removeSheet(this.sheetObj);
      }
    }
  },
  methods: {
    changeRouter(name) {
      this.$router.push(`${name}`);
    },
  },
  data() {
    return {
      // 메인 화면에 보여줄 정보들.
      sampleInfo: [
        {to: url + 'type', title:'Type'},
        {to: url + 'merge', title:'Merge'},
        {to: url + 'tree', title:'Tree'},
        {to: url + 'dataload', title:'Dataload'},
        {to: url + 'subsum', title:'SubSum'},
        {to: url + 'formula', title:'Formula'},
        {to: url + 'form', title:'Form'},
        {to: url + 'multiple', title:'Multiple'},
        {to: url + 'dialog', title:'Dialog'}
      ]
    }
  },
  components: {
    CodesandboxIcon
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