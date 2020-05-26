module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://lisbolg.farseer810.com', //API服务器的地址
                changeOrigin: true, // 虚拟的站点需要更改origin
            }
        },
    }
}