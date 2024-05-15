module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.ignoreWarnings = [
          function ignoreSourceMapWarnings(warning) {
            return (
              warning.module &&
              warning.module.resource.includes('node_modules/@react-aria/ssr')
            );
          },
        ];
        return webpackConfig;
      },
    },
  };
  