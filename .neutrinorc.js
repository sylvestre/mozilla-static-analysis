module.exports = {
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/vue',
      {
        html: {
          title: 'Mozilla Static Analysis'
        }
      }
    ],
    '@neutrinojs/mocha'
  ]
};
