/* eslint-disable */
module.exports = (config) => {
  require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [require('postcss-import'), require('postcss-custom-properties')()],
  })

  config.optimization.runtimeChunk = false
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  }

  return config
}
