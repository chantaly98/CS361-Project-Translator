/*
    SETUP
*/
var express = require('express');
var app = express();
PORT = 3000;
let {PythonShell} = require('python-shell');
toTxt = "hola";
fromTxt = "hello"


app.use(express.static('frontend'));
/*
    ROUTES
*/


app.get('/', function(req, res)
    {res.render('index')
    });


function microservice(toText, fromText){
    //runs the microservice python files that get the word count
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],                      // print results in real-time
        args: [toText, fromText]}                   // pass translation as arguments to the translate.py microservice

    //start to run translate.py 
    PythonShell.run('frontend/microservice/translate.py', options, function (err, results) {
        if (err) throw err;
    // results is an array consisting of messages collected during execution
        console.log(results)

});
    //start to run CCA.py
    PythonShell.run('frontend/microservice/CCA.py', null, function (err, results) {
        if (err) throw err;
    // results is an array consisting of messages collected during execution
        console.log(results)
    
}); 
}

microservice(toTxt, fromTxt)


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});