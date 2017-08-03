/**
 * Created by 张洋 on 17-8-3.
 */
var fs = require('fs');
var path = require('path');
var file1 = resolve('index.html');
function resolve(filename) {
    return __dirname+'\\'+filename;
}
//监视文件
//1.当第一次创建监视器的时候，如果文件不存在，监视器毁掉函数会触发一次
fs.watchFile(file1, {
    interval: 20
}, function(curr, prev) {
    console.log(file1)
    console.log('time**************');
    console.log('curr',curr)
    if (Date.parse(prev.ctime) == 0) {
        console.log('文件被创建');
    } else if (Date.parse(curr.ctime) == 0) {
        console.log('文件被删除');
    } else if (Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
        console.log('文件有修改');
    }
});