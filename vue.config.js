// module.exports = {
//   "configureWebpack": {
//     "plugins": [
//       {
//         "options": {
//           "maxChunks": 1
//         }
//       }
//     ]
//   },
//   "filenameHashing": false,
// }

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  css: {
    extract: false,
  },
}