module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        //  ⬇️  add this line
        'babel-plugin-transform-import-meta',
      ],
    };
  };  