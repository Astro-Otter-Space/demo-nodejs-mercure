const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
    ]
  }
});
