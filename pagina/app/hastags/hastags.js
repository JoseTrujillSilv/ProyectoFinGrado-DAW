$(window).on('load', codigo);

function codigo() {
    var texto = 0;
    var foto = 0;
    var video = 0;
    var pdf = 0;
    var carousel = new Array;
    var contCarousel = 0;
    var idUser = window.location.href.split('?')[1].split(',')[2].split('=')[1];
    var idCom = window.location.href.split('?')[1].split(',')[0].split('=')[1];
    var hastags = window.location.href.split('?')[1].split(',')[1].split('=')[1];
    var palancaEstrella = false;
    var palancaComentarios = false;
    var palancaRetarians = false;
    var arrayHastags = new Array();

    let dataRecoge = new FormData();
    dataRecoge.append('idCom', idCom);
    dataRecoge.append('hastags', hastags);
    dataRecoge.append('idUser', idUser);

    $('#nextMovil').on('click', eventoCarouselNext);
    $('#lastMovil').on('click', eventoCarouselAtras);
    $('#next').on('click', eventoCarouselNext);
    $('#last').on('click', eventoCarouselAtras);
    $('#home').on('click', eventoHome);
    $('#atras').on('click', eventoAtras);
    $('#text').val('');
    $('#estrella').on('click', eventoEstrella);
    $('#idUser').val(idUser);
    $('#idUserFav').val(idUser);
    $('#comentarios').on('click', eventoComentarios);
    $('#closeComment').on('click', eventoComentarios);
    $('#retarians').on('click', eventoRetarians);
    $('#closeRetarians').on('click', eventoRetarians);
    $('#favoritos').attr('href', '../explorar/favoritos/mueveFavoritos.php?idUser='+idUser);
    $('#url').val(window.location.href);
    $('#idUserRetarians').val(idUser);

    $('#idUserComment').val(idUser);

   
    $('#explorar').attr('href', '../explorar/explorar.html?idUser='+idUser);
    $('#misTarians').attr('href', '../misTarians.php?id='+idUser);
    $('#formFav').on('submit', e=> formularioFavoritos(e));
   
    $('#inicio').attr('href', '../accesPrinc.php?id='+idUser);

    $('#url').val(window.location.href);


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

        $('#textFav').val('');
        $('#muestraComentarios').html('');
        $('#imgFav').val('');
        $('#videoFav').val('');
        $('#pdfFav').val('');
        $('#retarianContenido').html('');

            fetch('./hastags.php', {
                url: './hastags.php',
                method: 'POST',
                body: dataRecoge
            })
            .then(function(res){
                     return res.json();
            })
        .then(function(data){

            console.log(contCarousel);

            if (data[contCarousel] === 0) {
                $('#textBloqueado').css('display', 'block');
                $('#textBloqueado').html('No puedes ver el contenido, porque este usuario te ha bloqueado');
                $('#textBloqueado').css('color', 'red');
            }else{
                $('#textBloqueado').css('display', 'none');
            }
        console.log(data);
    
        for (const value of data) {
            console.log(value);
            value[2]!==null? texto = 1 : texto = 0;
            value[3]!==null? foto = 1 : foto = 0; 
            value[4]!==null? video = 1 : video = 0; 
            value[5]!==null? pdf = 1 : pdf = 0;           

            carousel.push([value, texto, foto, video, pdf]);
        }
        
        let idTarian = carousel[contCarousel][0][7];
        let fecha = carousel[contCarousel][0][6];

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


        $('#fechaTarian').html(fecha);
        $('#idTarianComment').val(idTarian);
        $('#idTarianRetarians').val(idTarian);
        recogeFavoritos(idTarian);

        muestraComments(idTarian);
        favoritos(idTarian, fecha);
        $('#nombrePerfil').html(data[contCarousel][0]);
        $('#nombrePerfil2').html(data[contCarousel][0]);
        $('#autor').val(data[contCarousel][0]);
        $('#fotoPerfil').attr('src', '../../'+data[contCarousel][1]);

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
                    console.log('Es una imagen');
                    $('#fechaTarian').html(carousel[contCarousel][0][6]);
                    $('#contenido').css('display', 'none');
                    $('#videoContent').css('display', 'none');
                    $('#pdf').css('display', 'none');
                    $('#descripcion').html(carousel[contCarousel][0][2]);
                    $('#contenedorPrinc').css('background-image', 'url(../mostrar/'+carousel[contCarousel][0][3]+')');
                    $('#contenedorPrinc').css('background-size', 'cover');
                    $('#textFav').val(carousel[contCarousel][0][2]);
                    $('#imgFav').val(carousel[contCarousel][0][3]);
                  

                    break;
                case carousel[contCarousel][3]===1:

                $('#fechaTarian').html(carousel[contCarousel][0][6]);

                    $('#contenido').css('display', 'none');
                    $('#videoContent').css('display', 'block');
                    $('#contenido').css('display', 'none');
                    $('#pdf').css('display', 'none');
                    console.log('Es un video');
                    $('#videoContent').attr('src', '../mostrar/'+carousel[contCarousel][0][4]);
                    $('#videoContent').attr('loop', true);
                    $('#videoContent').attr('controls', true);
                    $('#descripcion').html(carousel[contCarousel][0][2]);
                    $('#textFav').val(carousel[contCarousel][0][2]);
                    $('#videoFav').val(carousel[contCarousel][0][4]);
                

                    break;




                case carousel[contCarousel][4]===1:

                $('#fechaTarian').html(carousel[contCarousel][0][6]);
                $('#pdf').attr('href', '../mostrar/'+carousel[contCarousel][0][5]);
                $('#pdf').css('display', 'inline');
                $('#pdfFav').val(carousel[contCarousel][0][5]);
                $('#pdf').html(carousel[contCarousel][0][5]);
                $('#videoContent').css('display', 'none');
                $('#imagen').css('display', 'none');
                $('#contenido').css('display', 'none');
                $('#descripcion').html(carousel[contCarousel][0][2]);
                $('#contenedorPrinc').css('background', 'white');
                $('#contenedorPrinc').css('padding', '0');
                $('#textFav').val(carousel[contCarousel][0][2]);
              
               


                    console.log('Es un pdf');
                    break;



                default:

                $('#fechaTarian').html(carousel[contCarousel][0][6]);
                    $('#contenido').html(carousel[contCarousel][0][2])
                    $('#contenido').css('display', 'block');
                    $('#videoContent').css('display', 'none');
                    $('#imagen').css('display', 'none');
                    $('#pdf').css('display', 'none');
                    $('#descripcion').html('');
                    $('#contenedorPrinc').css('background', 'white');
                    $('#contenedorPrinc').css('padding', '0');
                    $('#textFav').val(carousel[contCarousel][0][2]);
                   

                    console.log('Es un texto');
            }
    })
        }

        function muestraComments(idTarian) {

            fetch('../explorar/comentarios/'+idTarian+'Comment.json')
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                console.log(data);
                    for (const value of data) {
                        console.log(value);
                        $('#muestraComentarios').append('<div class="row"><div class="col border-bottom"><div class="row"><div class="col"><p>'+value[2]+'</p></div></div><div class="row text-secondary"><div class="col-6">Comenta: '+value[0]+'</div><div class="col-6 text-end"><p>Fecha: '+value[3]+'</p></div></div></div></div>')
                    }
                
            })
            .catch(function(error){
                console.log('');
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
    dataRecoge.append('idUserRec', idUser);

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