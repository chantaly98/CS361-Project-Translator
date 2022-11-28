/*
    SETUP
*/
var express = require('express');
var app = express();
PORT = 3000;
let {PythonShell} = require('python-shell');
bodyParser = require('body-parser');


app.use(express.static('frontend'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json' }));

/*
    ROUTES
*/

//render the main page
app.get('/', function(req, res){
    res.sendFile(__dirname + "/" + "index.html")
    });


//receive toTxt and fromTxt data from text boxes and send to the microservice
app.post('/', function (req, res) {
    let fromText = req.body.fromTxt;
    let toText = req.body.toTxt;
    microservice(toText, fromText)

    function microservice(fromText, toText){
    //runs the microservice python files that get the word count
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],                      // print results in real-time
            args: [fromText, toText]}                   // pass translation as arguments to the translate.py microservice
    
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

});



/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});