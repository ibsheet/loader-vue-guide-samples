<template>

  <q-layout class="bg-grey-1" view="hhh LpR fFf">

    <q-header elevated class="text-white" style="background: #42b983;" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-btn round dense flat :ripple="false" :icon="fasTable" size="sm" color="white" class="q-mr-sm" no-caps @click="changeRouter('/')"/>
          </q-avatar>
          <span> IBSheet8 </span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <!-- <q-route-tab  v-for="(menu, idx) in menuList" :key = "idx" to="/About" > {{menu.label}} </q-route-tab> -->
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/type" label="Type" />
        <q-route-tab to="/merge" label="Merge" />
        <q-route-tab to="/tree" label="Tree" />
        <q-route-tab to="/subsum" label="Subsum" />
        <q-route-tab to="/formula" label="Formula" />
        <q-route-tab to="/form" label="Form" />
        <q-route-tab to="/multiple" label="Multiple" />
        <q-route-tab to="/dialog" label="Dialog" />
        <q-route-tab to="/dataload" label="DataLoad" />
      </q-tabs>
    </q-header>
    
    <q-page-container>
      <div class="makeStyles-content">
        <div class="makeStyles-header">
          <q-btn round dense flat :ripple="false" :icon="fasTable" size="xl" no-caps style="color:#42b983;" />
          <span class="makeStyles-title">IBSheet8</span>
          <p class="makeStyles-subTitle">Loader를 사용하여 IBSheet8의 대용량 조회, 높은 자유도, 다양한 렌더링 방식 등 다양한 기능을 Vue 환경에서 제공합니다.</p>
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
            <q-btn round dense flat :ripple="false" :icon="fasTable" size="sm" color="white" class="q-mr-sm" no-caps />
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

export default {
  name: 'Layout',
  setup (props) {
    // vue3 에서는 여기서 다함. lifecycle hook 또한 setup 내부에서 선언하도록 하였습니다
    console.log(props);
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const test = computed(() => store.getters);
    const sheetId = computed(() => store.state.Sheet.sheet_id);
    const changePage = (title) => store.commit("CHANGE_SAMPLE", pageName.value = title);
    // Layout에서 router watch로 시트 생성하는게 더 그럴싸해보임
    const createSheet = (sampleData) => store.commit('CREATE_SHEET', sampleData);
    const reomoveSheet = (id) => store.commit("REMOVE_SAMPLE", id);


    return {
      fabGithub,
      fasTable,
      pageName, changePage,
      createSheet,
      reomoveSheet,
      test,
      sheetId
    }
  },
  data() {
    return {
      }
  }, 
  // 라우터 사용
  watch: {
    '$route.name': function (val, old) {
      // route 경로 변경시 state에 있는 name을 route name로 세팅.
      let title = val;
      //페이지 이름 변경용.(필요할까 이게..?)
      this.changePage(title);
      // switch 삭제 getter로 필요한 데이터 뽑아올 수 있음
      if (val && old && val !== old) {
        this.reomoveSheet(this.sheetId);
        if (this.pageName != "Home" && old != "Home")this.createSheet(this.test);
      }
    }
  },
  methods: {
    changeRouter(name) {
      this.$router.push(`${name}`);
    },
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