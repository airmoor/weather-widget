module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'widget.js',
    }
  },
  css: {
    extract: false,
  },
};