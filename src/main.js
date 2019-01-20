//打包的时候运行编译下面所有的代码
require('babel-runtime/regenerator')
//引入客户端变化的支持热更新
require('webpack-hot-middleware/client?reload=true')
require('./main.css')
require('./index.html')
//debugger
//ES6语法
var a = () =>{
    console.log('Hello World a!');
}

//ES6  ES8 Promise
var b = async() =>{
    await console.log('Hello World b!');
    console.log('done!');
}

// ES8 解构
var c = async args =>{
    const{a,b} = args
    await console.log('Hello World b!',a,b);
    console.log('done!');
}

c({a:1,b:2})

console.log('hello world')
