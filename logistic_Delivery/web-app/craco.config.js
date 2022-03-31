const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-header-height': '32px',
              '@menu-dark-item-active-bg': '@layout-body-background',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};