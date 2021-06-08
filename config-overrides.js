const { override, addWebpackAlias, addPostcssPlugins, addLessLoader} = require('customize-cra')
const path = require('path')

 module.exports = override(
  addWebpackAlias({
    assets: path.resolve(__dirname, './src/assets'),
    comp: path.resolve(__dirname, './src/components'),
    view: path.resolve(__dirname, './src/view'),
    utils: path.resolve(__dirname, './src/utils'),
    api: path.resolve(__dirname, './src/api')
  }),
  addLessLoader(),
  addPostcssPlugins(
    [require('postcss-pxtorem')({ 
      rootValue: 37.5, 
      propList: ['*']
  })]),
);