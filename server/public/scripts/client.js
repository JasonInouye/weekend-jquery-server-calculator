console.log( 'Client JS' );

$(readyNow);

let op = '';
// let passAdd = false;
// let addOperator = false;
// let subtractOperator = false;
// let multipleOperator = false;
// let divideOperator = false;

function readyNow(){
    console.log( 'jQuery loaded' );
    // $('#addBtn').on( 'click', addOperator );
    // $('#subtractBtn').on( 'click', subtractOperator );
    // $('#multiplyBtn').on( 'click', multipleOperator );
    // $('#divideBtn').on( 'click', divideOperator );
    $('#equalBtn').on('click', handleSubmit);
    $('.opBtn').on('click', handleOperator );
};

// function addOperator(){
//     console.log( `inside of addOperator`, passAdd );
//     return passAdd = true;
// }

function handleOperator(){
    
    //    console.log( 'inside of handleOperator', $(".opBtn").attr("id") );
    //    console.log( 'inside of handleOperator', $("#addBtn").attr("id") );
    //    console.log( 'inside of handleOperator', $("#subtractBtn").attr("id") );
    //    console.log( 'inside of handleOperator', $("#multiplyBtn").attr("id") );
    //    console.log( 'inside of handleOperator', $("#divideBtn").attr("id") );
    return op = $(this).attr('id');
    }

function handleSubmit(){
    console.log( 'inside the handleSubmit' );

    let mathLeft = $('#mathLeft').val();
    let mathRight = $('#mathRight').val();

    $.ajax({
        url: '/mathQuery',
        method: 'POST',
        data: {
            mathLeft: mathLeft,
            mathRight: mathRight,
            mathOperator: op
        }
    }).then( function(response){
        console.log(response);
    })
}

function getResults(){
    console.log( 'Getting Results');

    $.ajax({
        url: '/mathQuery',
        method: 'GET'
    }).then( function( response ){
        console.log( response );
    }).catch( function( error ){
        console.log( error );
        alert( 'error in mathQuery GET!')
    })
}
