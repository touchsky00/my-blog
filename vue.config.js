module.exports = {
    publicPath:'/',
    outputDir:'dist',
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://127.0.0.1:9001', 
                target: 'http://localhost:9001',
                changeOrigin: true, // 虚拟的站点需要更改origin
            }
        },
    },
    assetsDir: 'static',
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          title: '林力的博客',
        },
    },
    pwa: {
        iconPaths: {
            favicon32     : 'favicon.ico',
            favicon16     : 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon      : 'favicon.ico',
            msTileImage   : 'favicon.ico'
        }
    }
}