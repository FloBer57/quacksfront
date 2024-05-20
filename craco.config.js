const { whenProd } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Disable source map loader warnings
      webpackConfig.ignoreWarnings = [
        {
          module: /@react-aria\/ssr/,
          message: /Failed to parse source map/,
        },
      ];

      return webpackConfig;
    },
  },
};
