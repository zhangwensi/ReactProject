//基于customize-cra做定制化配置   将PACKAGE.JSON中的react-scripts替换成react-app-rewired
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra')

const modifyVars = require('./modifvLess')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
    addDecoratorsLegacy()//高阶组件的装饰器模式
)