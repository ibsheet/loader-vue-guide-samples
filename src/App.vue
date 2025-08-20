<template>
  <Layout />
</template>

<script>
import Layout from '@/components/layout/Layout.vue';
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
          baseUrl: 'https://demo.ibsheet.com/ibsheet/v8/samples/customer-sample/assets/ibsheet/',
          locales: ['en', 'ko'],
          theme: 'mint',
          // plugins: ['excel', 'common', 'dialog'],
          license: ''
        }
      ]
    });

    loader.load()
  },
}
</script>
<style>
</style>
