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
    $('#equalBtn').on('click', handleSubmit );
    $('#equalBtn').on('click', getResults );
    $('.opBtn').on('click', handleOperator );
    $('#clearBtn').on('click', handleClear );
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
        renderResults( response );
        $('.input').val('');
    }).catch( function( error ){
        console.log( error );
        alert( 'error in mathQuery GET!')
    })
}

function renderResults(results){
    $('#results').empty();
    $('#currentResult').text( results[0].result );

    for ( let i=0; i < results.length; i++ ){
        $('#results').append(`
            <li class="resultRow">${results[i].mathLeft} ${results[i].mathOperator} ${results[i].mathRight} = ${results[i].result}</li>
        `)
    }
}

function handleClear(){
   
    $('.input').val('');
    $('#results').empty();
    $('#currentResult').text('0');

    $.ajax({
        url: '/clear',
        method: 'POST',
        data: {
            clear: true
        }
    }).then( function(response){ 
        console.log(response);
    }).catch( function(error){
        alert('ERROR in CLEAR GET')
    })
}
