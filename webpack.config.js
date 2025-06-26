const { createExpoWebpackConfigAsync } = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Find and tweak the HtmlWebpackPlugin instance
  config.plugins = config.plugins.map((plugin) => {
    if (plugin instanceof HtmlWebpackPlugin) {
      // Inject scripts with type="module"
      plugin.userOptions.scriptLoading = 'module';
    }
    return plugin;
  });

  return config;
};