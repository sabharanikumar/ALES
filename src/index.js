const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const axios = require('./static/AxiosUtils');
let  bodyParser = require('body-parser');
const router = express.Router();
const port = 3000;

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.set('view engine', 'ejs');

let stageURL = '';
let prodURL = '';

router.get('/', function (req, res) {
    // The `index` here refers to the file in `views/index.ejs`
    res.sendFile(path.join(__dirname + '/static/index.htm'));
  });

  app.post('/auth', function(request, response) {
	// Capture the input fields
    console.log(request.body);
	let nthBuild = request.body.n;
	let nprevBuild = request.body.nprev;
	// Ensure the input fields exists and are not empty
	if (nthBuild && nprevBuild) {
        axios.generateHTML(nthBuild,nprevBuild);
        response.send('Job Triggered');
        response.end();
	} else {
     console.log("moved into else block");
		response.send('Please enter valid Session ID !');
		response.end();
	}
});

  //add the router
  app.use('/', router);
  app.listen(process.env.port || 3001);
   
  console.log('Running at Port 3001');
