module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Removed babel-plugin-transform-import-meta to fix import.meta syntax error
      ],
    };
  };