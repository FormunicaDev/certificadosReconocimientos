module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/certificados/' : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
