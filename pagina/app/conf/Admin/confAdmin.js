$(window).on('load', codigo);

function codigo() {

    idUser = window.location.href.split('?')[1].split('=')[1];
    
    $('#menuPerfil').on('click', eventoPerfil);
    $('#menuConfig').on('click', eventoConfig);
    $('#menuUser').on('click', eventoUser);
    $('#menuCuenta').on('click', eventoCuenta);
    $('#menuSesion').on('click', eventoSesion);
    $('#toggle').on('change', eventoToogle);
    $('#formCuentaPasword').on('submit', e=>eventoComparaCont(e));
    $('#atras').attr('href', '../../accesPrinc.php?id='+idUser);
    $('#formComPassword').on('submit',  e=>eventoComparaContCom(e));

    for (const value of document.getElementsByClassName('ojoPassword')) {
        value.addEventListener('click', muestraCont);
        value.style.cursor = "pointer";
    }
    
    for (const value of document.getElementsByClassName('ojoPassword2')) {
        value.addEventListener('click', muestraCont2);
        value.style.cursor = "pointer";
    }


    for (const value of document.getElementsByClassName('idUser')) {
        value.value = idUser;
    }


    function eventoToogle() {
        if (this.checked) {
            $('body').css('background-color', 'white'); 

            for (let index = 0; index < document.getElementsByClassName('divMenu').length; index++) {
            
                document.getElementsByClassName('divMenu')[index].style.borderColor = 'black';

                document.getElementsByClassName('divMenu')[index].childNodes[1].style.fill = 'black';

                document.getElementsByClassName('divMenu')[index].childNodes[3].style.color = 'black';
                
            }
            

        }else{
            $('body').css('background-color', '#333333'); 

            for (let index = 0; index < document.getElementsByClassName('divMenu').length; index++) {
            
                document.getElementsByClassName('divMenu')[index].style.borderColor = 'white';
                
                document.getElementsByClassName('divMenu')[index].childNodes[1].style.fill = '#ffc107';

                document.getElementsByClassName('divMenu')[index].childNodes[3].style.color = '#ffc107';
                
            }
        }
           
    }

    function eventoPerfil() {
        defecto();
        $('#menuPerfil').css('background-color', 'white');
        $('#menuPerfil').css('opacity', '100%');
        $('#perfil').css('display','block');
    }

    function eventoConfig() {
        defecto();
        $('#menuConfig').css('background-color', 'white');
        $('#menuConfig').css('opacity', '100%');
        $('#config').css('display','block');
    }

    function eventoUser() {
        defecto();
        $('#menuUser').css('background-color', 'white');
        $('#menuUser').css('opacity', '100%');
        $('#usuarios').css('display','block');
    }

    function eventoCuenta() {
        defecto();
        $('#menuCuenta').css('background-color', 'white');
        $('#menuCuenta').css('opacity', '100%');
        $('#cuenta').css('display','block');
    }

    function eventoSesion() {
        window.location.replace('../../../indice.html');
    }


    function defecto() {
        for (let index = 0; index < document.getElementsByClassName('divMenu').length; index++) {
            
            document.getElementsByClassName('divMenu')[index].style.backgroundColor = 'inherit';
            document.getElementsByClassName('divMenu')[index].style.opacity = '50%';
            
        }

        for (let index = 0; index < document.getElementsByClassName('divSubmenu').length; index++) {
            
            document.getElementsByClassName('divSubmenu')[index].style.display = 'none';
            
        }
    }


    function eventoComparaCont(e) {

        e.preventDefault();

        let contrasena01 = $('#passwordNewCuenta').val();
        let contrasena02 = $('#passwordRepCuenta').val();

        if (contrasena01 !== contrasena02) {
            for (const value of document.getElementsByClassName('errorPasswordCambia')) {
                value.innerHTML = 'Error, las contraseñas no coinciden, asegúrate de que ambas coincidan.';
            }
        }else{
            for (const value of document.getElementsByClassName('errorPasswordCambia')) {
                value.innerHTML = '';
            }
            
            document.getElementById('formCuentaPasword').submit();
        }

    }

    function eventoComparaContCom(e) {

        e.preventDefault();

        let contrasena01 = $('#passwordComCambCom').val();
        let contrasena02 = $('#passwordComRepCambCom').val();

        if (contrasena01 !== contrasena02) {
            for (const value of document.getElementsByClassName('errorPasswordCambia')) {
                value.innerHTML = 'Error, las contraseñas no coinciden, asegúrate de que ambas coincidan.';
            }
        }else{
            for (const value of document.getElementsByClassName('errorPasswordCambia')) {
                value.innerHTML = '';
            }
            
            document.getElementById('formComPassword').submit();
        }

    }

    let dataDesb = new FormData();

    dataDesb.append('idUser', idUser);

    fetch('../UsuariosBack/bloq/desbloq.php', {
        url: '../UsuariosBack/bloq/desbloq.php',
        method: 'POST',
        body: dataDesb
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        let contCHeck = 0;

        for (const value of data) {
            document.getElementById('formDesbUsuarios').innerHTML += '<div class="row p-4 align-items-center"><div class="col-auto"><input type="hidden" name="idUser" id="idUser" value="'+idUser+'"><input type="checkbox" value="'+value[2]+'" name="bloq[]" id="bloq'+contCHeck+++'"></div><div class="col-10 col-sm-auto my-3 my-sm-0"><img class="rounded-circle" width="50" height="50" src="../../../'+value[1]+'" alt=""></div><div class="col-3 col-lg-7"><span>'+value[0]+'</span></div><div class="col text-end mx-5"><span>Bloqueado: </span><span id="span'+value[2]+'"></span></div></div>';
            document.getElementById('span'+value[2]+'').innerHTML = 'No';
        }

        for (const value of document.getElementsByName('bloq')) {
            value.addEventListener('click', eventoChecked);
        }
        
        document.getElementById('formDesbUsuarios').innerHTML += '<button class="btn btn-danger my-3 w-100" type="submit">Bloquear/Desbloquear</button>';

        fetch('../UsuariosBack/bloq/devuelveBloq.php', {
            url: '../UsuariosBack/bloq/devuelveBloq.php',
            method: 'POST',
            body: dataDesb
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data)
            if (data !== null) {
                for (const value of document.getElementsByName('bloq[]')) {
                    for (const value2 of data) {
                        if (value2 == value.value) {
                            document.getElementById('bloq1').checked = true;
                            document.getElementById('span'+value.value+'').innerHTML = 'Si';
                        }else{
                            document.getElementById('span'+value.value+'').innerHTML = 'No';
                        }
                    }
                }
            }
            
        })

    })


    function muestraCont() {
        console.log(this);
        let input = this.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
        }else{
            input.type = 'password';
        }

        
    }


    function muestraCont2() {
        
        let input = this.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
        }else{
            input.type = 'password';
        }

        
    }

    

}