module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? 'vue-element-more-specifications': '/',
    // 构建输出目录 npm run build
    outputDir: 'docs',
    indexPath: 'index.html',
    //关键点在这
    runtimeCompiler: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: process.env.NODE_ENV !== 'production',
    // webpack 配置~
    chainWebpack: () => { },
    configureWebpack: () => {},
    pwa: {
        name: 'vue-element-more-specifications'
      },
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => { }

    }
}
