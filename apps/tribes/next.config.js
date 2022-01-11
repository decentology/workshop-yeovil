const withTM = require('next-transpile-modules')([
  '@hyperverse/hyperverse-ethereum-tribes',
])

module.exports = withTM({
  reactStrictMode: true,
})
