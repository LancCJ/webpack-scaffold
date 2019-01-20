//包引入
const path = require('path')
const webpack  =  require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
//打包配置
module.exports = {
    //入口:有且可以有多个
    entry:{
        //入口文件只要谁应该进行打包所以在打包处添加babel-polyfill
        //main:["babel-polyfill","./src/main.js"]
        //只转换promise的这些 如下写一般用上面
        //main:["core-js/fn/promise","./src/main.js"]
        //通过环境变量preset-env来进行转换 推荐
        main:["./src/main.js"]
    },
    //打包环境：开发 &  生产
    mode:"development",
    //出口:有且只有一个
    output:{
        filename:"[name]-bundle.js",
        path:path.resolve(__dirname,"../dist"),
        //公开的路径 影响Html中引入资源
        publicPath:"/"
    },
    //本地服务器配置
    devServer:{
        //直接进入dist目录进行浏览
        contentBase:"dist",
        //支持热更新
        hot:true,
        //错误可以显示到HTML上面
        overlay:true
    },
    //本地调试工具
    devtool:"source-map",
    //加载器
    module:{
        rules:[
            //js loader
            {
                test:/\.js$/,
                use:[
                    {
                        //将语法转换
                        loader:"babel-loader"
                    }
                ],
                //哪里的js文件不需要进行转换
                exclude: /(node_modules|bower_components)/
            },
            //css loaders
            {
                test:/\.css$/,
                use:[
                    //写入到html中
                    {
                        loader:"style-loader"
                    },
                    //放入main-bundle
                    {
                        loader:"css-loader"
                    },
                ]
            },
            //html loaders
            {
                test:/\.html$/,
                use:[
                    //使用热更新了HTMLWebpackPlugin 下面的2个就不需要了
                    //给加载的文件起名字 
                    // {
                    //     loader:"file-loader",
                    //     options:{
                    //         //起名规则是原来的
                    //         name:"[name].html"
                    //     }
                    // },
                    // //将index.html与main-bundle.js进行区分。进行分隔，不会打包进main-bundle.js中
                    // {
                    //     loader:"extract-loader"
                    // },
                    //相当于一个流程管理者，当发现一个HTML然后就调用file-loader然后在使用extract-loader进行分隔
                    {
                        loader:"html-loader",
                        options:{
                            attrs:["img:src"]
                        }
                    }
                ]
            },
            //img loader  可以添加hash值 [hash:8] 8位 在 name中
            {
                test:/\.(jpg|gif|png|jpeg)$/,
                use:[
                    {
                        loader:"file-loader",
                        options:{
                            name:"img/[name].[ext]"
                            //name:"img/[name]-[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        //热更新配置
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        })
    ]
}