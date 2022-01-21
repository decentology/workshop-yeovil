const withTM = require("next-transpile-modules")([
  "ui",
  "@decentology/hyperverse",
  "@decentology/hyperverse-flow",
  "@decentology/hyperverse-flow-tribes",
  "@decentology/hyperverse-algorand",
  "@decentology/hyperverse-algorand-counter",
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.module = {
      ...config.module,
      noParse: /(gun|sea)\.js$/,
    };
    return config;
  },
});
