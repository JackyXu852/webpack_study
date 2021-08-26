import "core-js/stable";
import "regenerator-runtime/runtime";

import './assets/css/main.css'
import './assets/css/app.css'
import './assets/css/base.less'
import './assets/css/snake.less'
import './assets/font/iconfont.css'

import { add111, promise } from './utils/test01'


add111(5,5)



console.log('index.js被加载了')

if (module.hot) {
    module.hot.accept('./utils/test01', function() {
        // 使用更新过的 library 模块执行某些操作...

        console.log('test01.js热模块替换中...')

        console.log(add111(7,5))

        console.log(promise)
    });
}