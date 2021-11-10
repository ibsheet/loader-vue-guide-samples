<template>
  <Layout />
</template>

<script>
import Layout from './components/layout/Layout';
import loader from '@ibsheet/loader'

export default {
  name: 'App',
  components: {
    Layout
  },
  mounted() {
    loader.config({
      registry: [
        {
          name: 'ibsheet',
          baseUrl: '/ibsheet'
        }
      ]
    });
  },
}
</script>
<style>
</style>
