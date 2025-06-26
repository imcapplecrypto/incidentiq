// webpack.config.cjs
const { createExpoWebpackConfigAsync } = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // 1️⃣ Tell Webpack to emit ESM modules
  config.output.module = true;
  config.experiments = config.experiments || {};
  config.experiments.outputModule = true;

  // 2️⃣ Force <script type="module">
  config.plugins = config.plugins.map((plugin) => {
    if (plugin instanceof HtmlWebpackPlugin) {
      plugin.userOptions.scriptLoading = 'module';  
    }
    return plugin;
  });

  return config;
};
