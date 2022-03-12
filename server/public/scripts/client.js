console.log( 'Client JS' );

$(readyNow);

let passAdd = false;
let addOperator = false;
let subtractOperator = false;
let multipleOperator = false;
let divideOperator = false;

function readyNow(){
    console.log( 'jQuery loaded' );
    $('#addBtn').on( 'click', addOperator )
    $('#subtractBtn').on( 'click', subtractOperator )
    $('#multiplyBtn').on( 'click', multipleOperator )
    $('#divideBtn').on( 'click', divideOperator )
    $('.opBtn').on('click', handleOperator )
};

// function addOperator(){
//     console.log( `inside of addOperator`, passAdd );
//     return passAdd = true;
// }

function handleSubmit(){
    console.log( 'inside the handleSubmit' );

    let mathLeft = $('#mathLeft').val();
    let mathRight = $('#mathRight').val();

    $.ajax({
        url: '/mathQuery',
        method: 'POST',
        data: {
            mathLeft: mathLeft,
            mathRight: mathRight
        }
    }).then( function(response){
        console.log(response);
    })
}

function handleOperator(){
//    console.log( 'inside of handleOperator', $(".opBtn").attr("id") );
//    console.log( 'inside of handleOperator', $("#addBtn").attr("id") );
//    console.log( 'inside of handleOperator', $("#subtractBtn").attr("id") );
//    console.log( 'inside of handleOperator', $("#multiplyBtn").attr("id") );
//    console.log( 'inside of handleOperator', $("#divideBtn").attr("id") );

   let op = $(this).attr('id');
   console.log( `The operator is ${op}` );
    
}