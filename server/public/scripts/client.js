console.log( 'Client JS' );

$(readyNow);


// let passAdd = false;
// let addOperator = false;
// let subtractOperator = false;
// let multipleOperator = false;
// let divideOperator = false;

class Calculator{
    constructor( mathLeft, mathRight){
        this.mathLeft = mathLeft;
        this.mathRight = mathRight;
        this.clear();
    }
    clear(){
        this.mathLeft = '';
        this.mathRight = '';
        this.operation = undefined;
    }
    
    appendNumber(number){
        this.mathLeft = number
    }

    operation(operation){

    }

    createObject(){

    }

    updateDisplay(){
        this.mathLeft.innerText = this.mathLeft;
    }
}

let op = '';
const numberButtons = $('[data-number]');
const operationButtons = $('[data-operation]');
const equalsButton = $('[data-equals]');
const clearButton = $('[data-clear]');
const mathLeft = $('[data-math-left]');
const mathRight = $('[data-math-right]');

const calculator = new Calculator( mathLeft, mathRight );

function readyNow(){
    console.log( 'jQuery loaded' );
    // $('#addBtn').on( 'click', addOperator );
    // $('#subtractBtn').on( 'click', subtractOperator );
    // $('#multiplyBtn').on( 'click', multipleOperator );
    // $('#divideBtn').on( 'click', divideOperator );
    $('.numberBtn').on('click', displayButtons);
    $('#equalBtn').on('click', handleSubmit );
    $('#equalBtn').on('click', getResults );
    $('.opBtn').on('click', handleOperator );
    $('#clearBtn').on('click', handleClear );
};

// numberButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         calculator.appendNumber(button.innerText);
//         calculator.updateDisplay();
//     })
// })
function displayButtons(buttons){
    console.log( $(this).('data-number') );
}
// function addOperator(){
//     console.log( `inside of addOperator`, passAdd );
//     return passAdd = true;
// }
// function updateDisplay(){
//     $(this).innerText
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

    // COME BACK TO THIS IF NEW CALCULATOR DOES NOT WORK
    // let mathLeft = $('#mathLeft').val();
    // let mathRight = $('#mathRight').val();

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
