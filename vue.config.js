module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', //API服务器的地址
                changeOrigin: true, // 虚拟的站点需要更改origin
            }
        },
    }
}