
function hello(req, res, next){

    res.send('Hello World: Current time: ' + new Date().toDateString());
}

exports.hello = hello
