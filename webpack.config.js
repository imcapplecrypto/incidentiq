// webpack.config.js
const { createExpoWebpackConfigAsync } = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // 1) Emit an ESM bundle so import.meta is legal:
  config.output.module = true;
  config.experiments = config.experiments || {};
  config.experiments.outputModule = true;

  // 2) Inject <script type="module"> in your index.html
  config.plugins = config.plugins.map((plugin) => {
    if (plugin instanceof HtmlWebpackPlugin) {
      plugin.userOptions.scriptLoading = 'module';
    }
    return plugin;
  });

  return config;
};
