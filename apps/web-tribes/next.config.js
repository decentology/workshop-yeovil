/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui","@hyperverse/hyperverse",  "@hyperverse/hyperverse-ethereum", "@hyperverse/hyperverse-ethereum-tribes"]);

module.exports = withTM({
  reactStrictMode: true,
});
