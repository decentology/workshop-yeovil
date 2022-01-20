const withTM = require("next-transpile-modules")([
  "ui",
  "@hyperverse/hyperverse",
  "@decentology/hyperverse",
  "@decentology/hyperverse-flow",
  "@decentology/hyperverse-flow-tribes",
  "@hyperverse/hyperverse-algorand",
  "@hyperverse/hyperverse-algorand-counter",
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
