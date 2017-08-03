/**
 * Created by 张洋 on 17-4-23.
 */
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.Server(app);
var root = path.join(__dirname,'public');
console.log(root);
var fs = require('fs');
var url = require('url');
var io = require('socket.io')(server);
app.use(function (req,res,next) {
    var file = url.parse(req.url).pathname;
    var mode  = 'reload';
    createWatcher(file,mode);
    next();

});
var watcher = {};
function createWatcher(file,event) {
    console.log(file);
    var absolutePath = path.join(root,file);
    if(watcher[absolutePath]){
        return
    }else {
        fs.watchFile(absolutePath,function (curr,prev) {
            console.log(curr,prev);
            if(curr.mtime !== prev.mtime){
                io.sockets.emit(event,file);
            }
        });
        watcher[absolutePath] = true;
    }

}
app.use(express.static(root));
app.listen(8080,function () {
    console.log('listening');
});