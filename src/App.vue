<template>
  <Header />
  <!-- router-view 태그가 있는 부분이 등록된 컴포넌트가 화면에 표시되는 곳 -->
  <router-view />
  <Footer />
</template>

<script>
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
