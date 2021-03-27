
module.exports = {

    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    outputDir: 'dist',  // 输出路径 
    devServer: {
        port: 8080,
        proxy: null, // 设置代理
        open:false
    }
    
}