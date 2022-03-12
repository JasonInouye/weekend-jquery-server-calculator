const express = require( 'express' );
const bodyParser = require( 'body-parser');

const app = express();
const PORT = 5000;

let mathQuery = [];




app.use( express.static( 'server/public' ));
app.use( bodyParser.urlencoded({extended: true}));

app.post( '/mathQuery', function( req, res ){
    console.log( 'POST /mathQuery', req.body );

    mathQuery.push( req.body );

    res.sendStatus(201);

    console.log( mathQuery );

})

app.get( '/mathQuery', function ( req,res){ 
    console.log( 'GET server /mathQuery');
    res.send( mathQuery );
})

function mathResults( array ){
    console.log( 'inside mathResults' );
}

console.log( mathResults() );




app.listen(PORT, function(){
    console.log( 'server running on port', PORT );
})