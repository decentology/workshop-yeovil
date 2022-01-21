const withTM = require('next-transpile-modules')([
  '@decentology/hyperverse',
  '@decentology/hyperverse-ethereum',
  '@decentology/hyperverse-ethereum-tribes',
])

module.exports = withTM({
  reactStrictMode: true,
})
