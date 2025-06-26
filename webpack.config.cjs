// webpack.config.cjs
const { createExpoWebpackConfigAsync } = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function (env, argv) {
  // 1. grab the default Expo config
  const config = await createExpoWebpackConfigAsync(env, argv);

  // 2. turn on ESM output
  config.output.module = true;
  config.experiments = config.experiments || {};
  config.experiments.outputModule = true;

  // 3. force HtmlWebpackPlugin to use type="module"
  config.plugins = config.plugins.map((plugin) => {
    if (plugin instanceof HtmlWebpackPlugin) {
      plugin.userOptions.scriptLoading = 'module';
    }
    return plugin;
  });

  return config;
};