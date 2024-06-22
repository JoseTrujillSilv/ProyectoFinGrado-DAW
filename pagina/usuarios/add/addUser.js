$(window).on('load', codigo);

function codigo() {
    $('#name').on('input', nameValidation);
    $('#home').on('click', eventoHome);
    $('#atras').on('click', eventoAtras);
    $('#password').on('input', passwordValidation);
    $('#ojo').on('click', muestraCont);

    $('#idCom').val(window.location.href.split('?')[1]);



    function muestraCont() {
        let type = document.getElementById('password').type;
        
        if (type === 'password') {
            document.getElementById('password').setAttribute('type', 'text');
        }else{
            document.getElementById('password').setAttribute('type', 'password');
        }

        
    }


    function nameValidation() {
        if (!document.getElementById('name').validity.valid) {
            document.getElementById('name').setAttribute('class', 'form-control bg-transparent borderInc');
        }else{
            document.getElementById('name').setAttribute('class', 'form-control bg-transparent');
        }

    }

    function passwordValidation() {
        if (!document.getElementById('password').validity.valid) {
            document.getElementById('password').setAttribute('class', 'form-control bg-transparent borderInc');
        }else{
            document.getElementById('password').setAttribute('class', 'form-control bg-transparent');
        }

    }


    function eventoHome() {
        window.location.href = '../../../index.html';
    }

    function eventoAtras() {
        window.location.href = '../../indice.html';
    }
}