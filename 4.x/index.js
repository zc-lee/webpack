console.log('4.x.x')
// import css
require('./css/index.css');
require('./less/index.less');

// 打包图片后以base64编码形式存在
// 图片加载成功后会返回图片地址或数据
var img1 = require('./assets/fire.png');
var img1 = require('./assets/test.jpeg');
var pdf =require('./assets/forth.pdf');
pdf_box.href=pdf
img_box1.src = img1;
console.log(img1)

// (async () => {
//     let res = await fetch('https://www.baidu.com')
//     console.log(res)
// })()