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
          baseUrl: '/ibsheet',
          locales: ['en', 'ko'],
          theme: 'mint',
          // plugins: ['excel', 'common', 'dialog'],
          license: 'W2FtSztPKCZzaTYwYjJxbn9QKhMsHnQlOD0+PX9tLH4oaVt8A28BS34oZmE5UBZYDyQhBT9DNl4kPmdj'
        }
      ]
    });
  },
}
</script>
<style>
</style>
