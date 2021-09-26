var express = require('express');
var app = express(); 

app.set( 'views' , `${ __dirname }/`); 
app.engine('html', require('ejs').renderFile); 
app.set( 'view engine', 'html'); 

app.use( '/build', express.static( `${ __dirname }/build`)); 
app.get( '/', (req , res ) => { res.render( 'index' , {});}); 
app.get( '/architecture.html', ( req , res ) => { res.render( 'architecture' , {});}); 
app.get( '/search_result.html', ( req , res ) => { res.render( 'search_result' , {});}); 
app.get( '/signin.html', ( req , res ) => { res.render( 'signin' , {});}); 
app.get( '/signup.html', ( req , res ) => { res.render( 'signup' , {});}); 

var server = app.listen(8000, () => { 
    console.log( 'Express listening on port : ' + server.address().port ); 
});