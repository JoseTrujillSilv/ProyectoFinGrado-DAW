$(window).on('load', codigo);


function codigo() {
    var texto = 0;
    var foto = 0;
    var video = 0;
    var pdf = 0;
    var carousel = new Array;
    var contCarousel = 0;
    var palancaEstrella = false;
    var palancaComentarios = false;
    var palancaRetarians = false;
    
    let nameUser = window.location.href.split('?')[1].split(',')[2].split('=')[1];
    let fotoUser = '../'+window.location.href.split('?')[1].split(',')[1].split('=')[1];
    var idUser = window.location.href.split('?')[1].split(',')[0].split('=')[1];
    var idUser2 = window.location.href.split('?')[1].split(',')[3].split('=')[1];
    var dataRecogeComment = new FormData();

    

    $('#nextMovil').on('click', eventoCarouselNext);
    $('#lastMovil').on('click', eventoCarouselAtras);
    $('#next').on('click', eventoCarouselNext);
    $('#last').on('click', eventoCarouselAtras);
    $('#home').on('click', eventoHome);
    $('#atras').on('click', eventoAtras);
    $('#text').val('');
    $('#idUser').val(idUser);
    $('#nameUser').val(nameUser);
    $('#fotoUser').val(fotoUser);
    $('#explorar').attr('href', '../explorar/explorar.html?idUser='+idUser);
    $('#misTarians').attr('href', '../misTarians.php?id='+idUser2);
    $('#estrella').on('click', eventoEstrella);
    $('#formFav').on('submit', e=> formularioFavoritos(e));
    $('#favoritos').attr('href', './favoritos/favoritos.html?idUser='+idUser+',fotoUser='+fotoUser+',nameUser='+nameUser);
    $('#comentarios').on('click', eventoComentarios);
    $('#closeComment').on('click', eventoComentarios);
    $('#retarians').on('click', eventoRetarians);
    $('#closeRetarians').on('click', eventoRetarians);

    $('#formComment').on('submit',e=> eventoComentarios(e));
   
    $('#idUserComment').val(idUser2);
    $('#url').val(window.location.href);

    $('#fotoPerfil').attr('src', '../'+fotoUser);
    $('#nombrePerfil').html(nameUser);
    $('#nombrePerfil2').html(nameUser);
    $('#autor').val(nameUser);
    $('#inicio').attr('href', '../accesPrinc.php?id='+idUser2);
    $('#idUserFav').val(idUser2);
    $('#idUserRetarians').val(idUser2);
    $('#idUser').val(idUser);

    let dataRecoge = new FormData();

    dataRecoge.append('idUser', idUser);



    function eventoEstrella() {
        
        if (!palancaEstrella) {
            $('#estrella').css('fill', 'blue');
            palancaEstrella = true;
        }else{
            $('#estrella').css('fill', 'white');
            palancaEstrella = false;
        }
        
    }

    function eventoComentarios() {
        
        if (!palancaComentarios) {
            $('#svgComment').css('fill', 'red');
            palancaComentarios = true;
        }else{
            $('#svgComment').css('fill', 'white');
            palancaComentarios = false;
        }
        
    }

    function eventoRetarians() {
        
        if (!palancaRetarians) {
            $('#svgRetarians').css('fill', 'green');
            palancaRetarians = true;
        }else{
            $('#svgRetarians').css('fill', 'white');
            palancaRetarians = false;
        }
        
    }


    function eventoHome() {
        window.location.href = '../../index.html';
    }

    function eventoAtras() {
        window.location.href = '../indice.html';
    }



    llamaCarousel();




    function eventoCarouselNext() {
        
        contCarousel++;

        llamaCarousel();
    }


    function eventoCarouselAtras() {
        
        contCarousel--;

        llamaCarousel();
        
    }


    function llamaCarousel() {

        $('#contenedorPrinc').css('height', '');
        $('#nameUserCont').html('');
        $('#retarianContenido').html('');
        $('#contenedorPrinc').css('background-color', 'white');
        $('#contenedorPrinc').css('height', '45vh');
        $('#imagen').css('display', 'none');
        $('#contenido').css('display', 'none');
        $('#videoContent').css('display', 'none');
        $('#videoContent2').css('display', 'none');
        $('#pdf').css('display', 'none');
        $('#descripcion').css('color', 'white');
        $('#svgRetarians2').css('display', 'none');

        fetch('../mostrar/muestraTarians.php', {
            url: '../mostrar//muestraTarians.php',
            method: 'POST',
            body: dataRecoge
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){

            for (const value of data) {
                value[0]!==null? texto = 1 : texto = 0;
                value[1]!==null? foto = 1 : foto = 0; 
                value[2]!==null? video = 1 : video = 0; 
                value[3]!==null? pdf = 1 : pdf = 0;           
    
                carousel.push([value, texto, foto, video, pdf]);
            }
            
            let idTarian = carousel[contCarousel][0][5];
            let fecha = carousel[contCarousel][0][4];
            

            $('#fechaTarian').html(data[0][4]);
            $('#idTarianComment').val(idTarian);
            $('#idTarianRetarians').val(idTarian);
            recogeFavoritos(idTarian);

            if (contCarousel===data.length-1) {
                $('#next').css('visibility', 'hidden');
                document.getElementById('nextMovil').disabled = true;
            }else{
                $('#next').css('visibility', 'visible');
                document.getElementById('nextMovil').disabled = false;
            }
    
            if (contCarousel===0) {
                $('#last').css('visibility', 'hidden');
                document.getElementById('lastMovil').disabled = true;
            }else{
                $('#last').css('visibility', 'visible');
                document.getElementById('lastMovil').disabled = false;
            }
    
            if (data.length===1) {
                $('#next').css('display', 'none');
                document.getElementById('next').style.opacity='0';
                document.getElementById('nextMovil').disabled = true;
                document.getElementById('nextMovil').style.opacity = '100%';
                $('#last').css('visibility', 'hidden');
                document.getElementById('lastMovil').disabled = true;
                document.getElementById('lastMovil').style.opacity = '100%';
            }


            muestraComments(idTarian);
            favoritos(idTarian, fecha);
    
    
            switch (true) {
                case contCarousel>0&&contCarousel<carousel.length-1:
                    $('#last').css('visibility', 'visible');
                    break;
                
                case contCarousel==carousel.length-1:
                    $('#next').css('visibility', 'hidden');
                break;
            }
    
            if (contCarousel==0) {
                $('#last').css('visibility', 'hidden');
                $('#next').css('visibility', 'visible');
            }
    
                switch (true) {
                    case carousel[contCarousel][2]===1:
                        if (data[contCarousel][8]==='1') {
                            $('#svgRetarians2').css('display', 'block');
                        $('#imagen').css('display', 'block');
                        $('#contenido').css('display', 'block');
                        $('#contenido').html(carousel[contCarousel][0][0]);
                        $('#contenido').css('color', 'red');
                        $('#nameUserCont').html('Retarians de: '+nameUser);
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#imgFav').val(data[contCarousel][1]);
                        $('#retarianContenido').html(data[contCarousel][7]);
                        $('#nombrePerfil2').html(data[contCarousel][6]);
                        console.log('Es una imagen prueba');
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#descripcion').html('');
                        $('#imagen').attr('src', '../mostrar/'+data[contCarousel][1]);
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                        }else{
                        $('#nameUserCont').html('');
                        $('#retarianContenido').html('');
                            console.log('Es una imagen');
                        $('#contenedorPrinc').css('display', 'block');
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#contenedorPrinc').css('background-image', 'url('+'../mostrar/'+carousel[contCarousel][0][1]+')');
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#imgFav').val(carousel[contCarousel][0][1]);
                        $('#contenedorPrinc').css('background-size', 'cover');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                        }
                        break;
                    case carousel[contCarousel][3]===1:
                        if (data[contCarousel][8]==='1') {
                            $('#svgRetarians2').css('display', 'block');
                        $('#nameUserCont').html('Retarians de: '+nameUser);
                        $('#retarianContenido').html(data[contCarousel][7]);
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#videoContent2').css('display', 'block');
                        console.log('Es un video');
                        $('#videoContent2').attr('src', '../mostrar/'+carousel[contCarousel][0][2]);
                        $('#contenedorPrinc').css('display', 'none');
                        $('#videoContent2').attr('loop', true);
                        $('#videoContent2').attr('controls', true);
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#videoFav').val(carousel[contCarousel][0][2]);
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#descripcion').css('color', 'red');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                        }else{
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#contenedorPrinc').css('display', 'none');
                        $('#contenedorPrinc').css('background', 'none');
                        $('#videoContent').css('display', 'block');
                        $('#pdf').css('display', 'none');
                        console.log('Es un video');
                        $('#videoContent').attr('src', '../mostrar/'+carousel[contCarousel][0][2]);
                        $('#videoContent').attr('loop', true);
                        $('#videoContent').attr('controls', true);
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#videoFav').val(carousel[contCarousel][0][2]);
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                        }
                    
    
                        break;
    
                    case carousel[contCarousel][4]===1:
                    if (data[contCarousel][8]==='1') {
                        $('#svgRetarians2').css('display', 'block');
                        $('#contenido').css('display', 'block');
                        $('#contenido').html(carousel[contCarousel][0][0]);
                        $('#contenido').css('color', 'red');
                        $('#nameUserCont').html('Retarians de: '+nameUser);
                        $('#retarianContenido').html(data[contCarousel][7]);
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#pdf').attr('href', '../mostrar/'+carousel[contCarousel][0][3]);
                        $('#pdf').css('display', 'inline');
                        $('#pdf').html(carousel[contCarousel][0][3]);
                        $('#pdfFav').val(carousel[contCarousel][0][3]);
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#contenedorPrinc').css('background', 'white');
                        $('#contenedorPrinc').css('padding', '0');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                            console.log('Es un pdf');
                    }else{
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#pdf').attr('href', '../mostrar/'+carousel[contCarousel][0][3]);
                        $('#pdfFav').val(carousel[contCarousel][0][3]);
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#pdf').css('display', 'inline');
                        $('#pdf').html(carousel[contCarousel][0][3]);
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#contenedorPrinc').css('background', 'white');
                        $('#contenedorPrinc').css('padding', '0');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                            console.log('Es un pdf');
                    }
                  
                        break;
    
    
    
                    default:
                        
                    if (data[contCarousel][8]==='1') {
                        $('#svgRetarians2').css('display', 'block');
                        $('#nameUserCont').html('Retarians de: '+nameUser)
                        $('#nombrePerfil2').html(data[contCarousel][6]);
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#contenido').html(carousel[contCarousel][0][0]);
                        $('#textFav').val(carousel[contCarousel][0][0]);
                        $('#contenido').css('display', 'block');
                        $('#contenido').css('color', 'red');
                        $('#retarianContenido').html(data[contCarousel][7]);
                        $('#descripcion').html('');
                        $('#contenedorPrinc').css('background', 'white');
                        $('#contenedorPrinc').css('padding', '0');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                    }else{
                        $('#nombrePerfil2').html(nameUser);
                        $('#contenido').css('color', 'black');
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#contenido').html(carousel[contCarousel][0][0])
                        $('#contenido').css('display', 'block');
                        $('#descripcion').html('');
                        $('#contenedorPrinc').css('background', 'white');
                        $('#contenedorPrinc').css('padding', '0');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                    }
                    
                       
    
                        console.log('Es un texto');
                }
    
        })
    }

   function muestraComments(idTarian) {

    $('#idTarian').val(idTarian);

    dataRecogeComment.append('idTarian', idTarian);

    fetch('./comentarios/recogeComentario.php', {
        url: './comentarios/recogeComentario.php',
        method: 'POST',
        body: dataRecogeComment
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
      
            for (const value of data) {
               
                $('#muestraComentarios').append('<div class="row"><div class="col border-bottom"><div class="row"><div class="col"><p>'+value[2]+'</p></div></div><div class="row text-secondary"><div class="col-6">Comenta: '+value[0]+'</div><div class="col-6 text-end"><p>Fecha: '+value[3]+'</p></div></div></div></div>')
            }
        
    })
    .catch(function(error){
    
    })

   }
   
   
   function favoritos(idTarian, fecha) {
    $('#idTarianFav').val(idTarian);
    $('#fechaFav').val(fecha);
}

function formularioFavoritos(e) {
e.preventDefault();
var data = new FormData();

data.append('fechaFav', $('#fechaFav').val());
data.append('fav', $('#fav').val());
data.append('idUserFav', $('#idUserFav').val());
data.append('idTarianFav', $('#idTarianFav').val());
data.append('textFav', $('#textFav').val());
data.append('imgFav', $('#imgFav').val());
data.append('videoFav', $('#videoFav').val());
data.append('pdfFav', $('#pdfFav').val());
data.append('autor', $('#autor').val());

fetch('../explorar/favoritos/favoritos.php', {
    url: '../explorar/favoritos/favoritos.php',
    method: 'POST',
    body: data
})
.catch(function(error){
    console.log(error);
})
}

            function recogeFavoritos(idTarian) {

            let dataRecoge = new FormData();
            dataRecoge.append('idTarianRec', idTarian);
            dataRecoge.append('idUserRec', idUser2);
                console.log(idTarian);
                console.log(idUser2);
            fetch('../explorar/favoritos/recogeFavoritos.php', {
            url: '../explorar/favoritos/recogeFavoritos.php',
            method: 'POST',
            body: dataRecoge
            })
            .then(function(response) {
            if(response.ok) {
                return response.json()
            } else {
                throw "Error en la llamada Ajax";
            }

            })
            .then(function(data) {
            console.log(data);
            if (data.length!==0) {
                $('#estrella').css('fill', 'blue');
                palancaEstrella = true;
            }else{
                $('#estrella').css('fill', 'white');
                palancaEstrella = false;
            }
            
            })
            }

}