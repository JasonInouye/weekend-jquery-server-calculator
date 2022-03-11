console.log( 'Client JS' );

$(readyNow);

function readyNow(){
    console.log( 'jQuery loaded' );
    $('#calcBtn').on( 'click', handleSubmit )
};


function handleSubmit(){
    console.log( 'inside the handleSubmit' );

    let mathQ = $('#mathQ').val();


    $.ajax({
        url: '/mathQuery',
        method: 'POST',
        data: {
            mathQ: mathQ
        }
    }).then( function(response){
        console.log(response);
    })


}