const request = require('request');
const fs = require('fs');
const Q = require('q');
const _ = require('lodash');

var numbers = [];

Q.nfcall(fs.readFile, 'stocknumber.csv', 'utf-8').
	then(function(data) {
	    return _.slice(data.split('\r\n'), 0, data.split('\r\n').length-1 )
	}).
	fail(function(err) {
	    console.error('Error occurred: ' + err);
	}).
	done(function(data){
		console.log(data);
	});



// request('http://www.modulus.io', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body); // Show the HTML for the Modulus homepage.
//     }
// });