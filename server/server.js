const express = require( 'express' );
const bodyParser = require( 'body-parser');

const app = express();
const PORT = 5000;

let mathQuery = [];

let resultOut = [];

app.use( express.static( 'server/public' ));
app.use( bodyParser.urlencoded({extended: true}));

app.post( '/mathQuery', function( req, res ){
    console.log( 'POST /mathQuery', req.body );

    mathQuery.push( req.body );
    res.sendStatus(201);
    console.log( mathQuery );

})

function mathResults( array ){
    console.log( 'inside mathResults' );
    for ( const problem of array ){
        if (problem.mathOperator === "addBtn"){ 
            resultOut.unshift ({
                mathLeft: problem.mathLeft,
                mathOperator: '+',
                mathRight: problem.mathRight,
                result: Number(problem.mathLeft) + Number(problem.mathRight) 
                //result: 'Testing result variable'
            });
        } else if ( problem.mathOperator === "subtractBtn"){
            resultOut.unshift ({
                mathLeft: problem.mathLeft,
                mathOperator: '-',
                mathRight: problem.mathRight,
                result: Number(problem.mathLeft) - Number(problem.mathRight) 
            });
        } else if ( problem.mathOperator === "multiplyBtn"){
            resultOut.unshift ({
                mathLeft: problem.mathLeft,
                mathOperator: '*',
                mathRight: problem.mathRight,
                result: Number(problem.mathLeft) * Number(problem.mathRight) 
            });
        } else if ( problem.mathOperator === "divideBtn"){
            resultOut.unshift ({
                mathLeft: problem.mathLeft,
                mathOperator: '/',
                mathRight: problem.mathRight,
                result: Number(problem.mathLeft) / Number(problem.mathRight) 
            });
        }
    } 
mathQuery = [];
return resultOut;
}

app.get( '/mathQuery', function ( req,res){ 
    console.log( 'GET server /mathQuery' );
    //res.send( mathQuery );
    res.send( mathResults( mathQuery ) );
})

app.post( '/clear', function( req,res ){
    console.log( 'POST server /Clear', req.body );
    if (clear = 'true'){
        mathQuery = [];
        resultOut = [];
    }
    res.sendStatus( 201 );
})

app.listen(PORT, function(){
    console.log( 'server running on port', PORT );
})