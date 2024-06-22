$(window).on('load', codigo);

function codigo() {
    $('#inicio').on('click', eventoInicio);


    $('#keyss').html('Su keyss es: '+window.location.href.split('=')[1]);




    function eventoInicio() {
        window.location.href = '../../indice.html';
    }
}