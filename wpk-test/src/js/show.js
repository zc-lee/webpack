require('../css/style.css')
let fnstr=require('./str')

const $=require('jquery')

document.write(fnstr(`<div>hello webpack</div>`))

$("div").html('jQuery 语法222 c').css({'background-color':'#1e83d3'})