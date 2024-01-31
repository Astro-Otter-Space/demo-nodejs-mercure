const { defineConfig } = require('@vue/cli-service')
const {readFileSync} = require("fs");
const {resolve} = require("path");

module.exports = defineConfig({
  devServer: {
    port: 8081,
    server: {
      type: 'spdy', // 'https'
      options: {
        key: readFileSync(resolve(__dirname, 'localhost.key')),
        cert: readFileSync(resolve(__dirname, 'localhost.crt'))
      }
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: false, // optional
        },
      }
    }
  },
});
