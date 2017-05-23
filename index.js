var server = require('express');
var app = server();
var useragent = require('useragent');

var port = process.env.PORT;

app.listen(port, function() {
    console.log("Listening on port: " + port);
});

app.get('/', function(req,res) {
    var agent = useragent.parse(req.headers['user-agent']);

    var ipAdd = req.headers['x-fordwarded-for'];
    var list = ipAdd.split('');
    ipAdd = list[list.length - 1];

    res.json({
        ip: ipAdd,
        'language': req.headers['accept-language'].split(',')[0],
        OS: agent.os.family,
        device: agent.device.family
    });
});