$(window).on('load', codigo);

function codigo() {
    $('#idCom').val(window.location.href.split('?')[1].split('=')[1])
    $('#password').on('input', passwordValidation);
    $('#ojo').on('click', muestraCont);


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


}