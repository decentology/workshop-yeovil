const withTM = require('next-transpile-modules')([
  '@hyperverse/hyperverse',
  '@hyperverse/hyperverse-ethereum',
  '@hyperverse/hyperverse-ethereum-tribes',
])

module.exports = withTM({
  reactStrictMode: true,
})
