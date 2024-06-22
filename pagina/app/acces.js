$(window).on('load', codigo);

function codigo() {

    $('#hastags').val('');

    let idUser = window.location.href.split('?')[1].split(',')[2].split('=')[1];
    let nameUser = window.location.href.split('?')[1].split(',')[0].split('=')[1];
    let fotoUser = window.location.href.split('?')[1].split(',')[1].split('=')[1];
    let arrayJson =  window.location.href.split('?')[1].split(',');

    $('#textArea').on('input', eventoHastags);
    $('#home').on('click', eventoHome);
    $('#atras').on('click', eventoAtras);
    $('#file1').on('change', eventoImages);
    $('#text').val('');
    $('#idUser').val(idUser);
    $('#nameUser').val(nameUser);
    $('#fotoUser').val(fotoUser);
    $('#explorar').attr('href','./explorar/explorar.html?idUser='+idUser+'?rutaFotoUser='+fotoUser+'?nameUser='+nameUser);
    $('#misTarians').attr('href', './mostrar/muestraTarians.html?idUser='+idUser+', rutaFotoUser='+fotoUser+', nameUser='+nameUser);
    $('#favoritos').attr('href', './explorar/favoritos/favoritos.html?idUser='+idUser+',fotoUser='+fotoUser+',nameUser='+nameUser);

    $('#confi').attr('href', 'confi.php?idUser='+idUser);

    $('#fotoPerfil').attr('src', arrayJson[1].split('=')[1]);
    $('#nombrePerfil').html(arrayJson[0].split('=')[1]);
    $('#inicio').attr('href', './accesPrinc.php?id='+arrayJson[2].split('=')[1]);

    for (const value of $('.cerrar')) {
        value.addEventListener('click', eventoCerrar);
    }

  


    function eventoImages() {
        let archivo = this.files[0];
        let extension = archivo.name.split('.')[1];

        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                let urlArch = URL.createObjectURL(archivo);
                $('.card')[1].style.display = 'none';
                $('#colFiles').css('visibility', 'visible');
                $('.card')[0].style.display = 'flex';
                $('#imgs01').removeAttr('width');
                $('#imgs01').removeAttr('height');
                $('#imgs01').attr('class', 'img-fluid');
                $('#imgs01').attr('src', urlArch);
                $('#video1').attr('src', '');
                $('#pdf1').attr('src', '');
                $('#pdf1').attr('width', '0');
                $('#pdf1').attr('height', '0');
                $('#text').val('Descripción: ');
        }


        if (extension === 'mp4') {
                let urlArch = URL.createObjectURL(archivo);
                $('.card')[0].style.display = 'none';
                $('#colFiles').css('visibility', 'visible');
                $('.card')[1].style.display = 'flex';
                $('#video1').removeAttr('width');
                $('#video1').removeAttr('height');
                $('#footer').css('height', '900px');
                $('#video1').attr('class', 'img-fluid');
                $('#video1').attr('src', urlArch);
                $('#imgs01').attr('src', '');
                $('#pdf1').attr('src', '');
                $('#text').val('Descripción: ');
        }

        if (extension === 'pdf') {
                let urlArch = URL.createObjectURL(archivo);
                $('#colFiles').css('visibility', 'visible');
                $('.card')[0].style.display = 'none';
                $('.card')[1].style.display = 'none';
                $('#pdf1').attr('width', '100%');
                $('#pdf1').attr('height', '700px');
                $('#footer').css('height', '900px');
                $('#pdf1').attr('src', urlArch);
                $('#imgs01').attr('src', '');
                $('#video1').attr('src', '');
                $('#text').val('Descripción: ');
        }

    }


    function eventoHome() {
        window.location.href = '../../index.html';
    }

    function eventoAtras() {
        window.location.href = '../indice.html';
    }

    function eventoCerrar() {
        $('#file1').val('');
        $('#colFiles').css('visibility', 'hidden');
        $('.card')[0].style.display = 'none';
        $('.card')[1].style.display = 'none';
        $('#text').val('');
        $('#footer').css('height', 'auto');
    }

    function eventoHastags() {
        let texto = this.value;
       

        if (texto.indexOf('#')!== -1 && texto.indexOf('\n')!== -1) {
           let hastagst = texto.slice(texto.indexOf('#'));

           $('#hastags').val(hastagst);

           if (hastagst.indexOf(' ')!==-1) {
                hastagst = hastagst.slice(0, hastagst.indexOf(' '))

                $('#hastags').val(hastagst);
           }

           if (hastagst.indexOf('\n')!==-1) {

                 hastagst = hastagst.slice(0, hastagst.indexOf('\n'))
                $('#hastags').val(hastagst);

            }
        }

    }


}