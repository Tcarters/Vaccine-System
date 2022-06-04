/* config-overrides.js */

const addRewireScssLoader = require("react-app-rewire-scss-loaders");

module.exports = function override(config, env) {
    
  config = addRewireScssLoader("sass-resources-loader", {
    resources: path.resolve(__dirname, "variables.scss"),
  })(config, env);

  return config;
};