$(window).on('load', codigo);

function codigo() {
    $('#keyss').on('input', keyssValidation);
    $('#atras').on('click', eventoAtras);
    $('#home').on('click', eventoHome);
    $('#password').on('input', passwordValidation);
    $('#ojo').on('click', muestraCont);
    $('#ojo2').on('click', muestraCont2);


    function eventoAtras() {
        window.location.href = '../indice.html';
    }


    function eventoHome() {
        window.location.href = '../../index.html';
    }

    function keyssValidation() {
        if (!document.getElementById('keyss').validity.valid) {
            document.getElementById('keyss').setAttribute('class', 'form-control bg-transparent borderInc');
        }else{
            document.getElementById('keyss').setAttribute('class', 'form-control bg-transparent');
        }

    }

    function passwordValidation() {
        if (!document.getElementById('password').validity.valid) {
            document.getElementById('password').setAttribute('class', 'form-control bg-transparent borderInc');
        }else{
            document.getElementById('password').setAttribute('class', 'form-control bg-transparent');
        }

    }


    function muestraCont() {
        let type = document.getElementById('password').type;
        
        if (type === 'password') {
            document.getElementById('password').setAttribute('type', 'text');
        }else{
            document.getElementById('password').setAttribute('type', 'password');
        }

        
    }


    function muestraCont2() {
        let type = document.getElementById('keyss').type;
        
        if (type === 'password') {
            document.getElementById('keyss').setAttribute('type', 'text');
        }else{
            document.getElementById('keyss').setAttribute('type', 'password');
        }

        
    }


}