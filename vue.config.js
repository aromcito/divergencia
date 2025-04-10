const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000 // Cambia el puerto aquí
  }
})
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
};
