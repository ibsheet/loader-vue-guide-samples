module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/v8/demo/vue' : '/'
}
