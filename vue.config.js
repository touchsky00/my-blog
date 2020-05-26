module.exports = {
    publicPath:'/',
    outputDir:'dist',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9001', //API服务器的地址
                changeOrigin: true, // 虚拟的站点需要更改origin
            }
        },
    },
    assetsDir: 'static',
}