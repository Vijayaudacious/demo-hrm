const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
            '@primary-color': '#1183e1',
            '@heading-color': '#3e5569',
            '@text-color': '#3e5569',
            '@btn-border-radius-base':'4px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};