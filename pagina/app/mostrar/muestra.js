$(window).on('load', codigo);

function codigo() {
    var texto = 0;
    var foto = 0;
    var video = 0;
    var pdf = 0;
    var carousel = new Array;
    var contCarousel = 0;

    let nameUser = window.location.href.split('?')[1].split(',')[2].split('=')[1];
    let fotoUser = window.location.href.split('?')[1].split(',')[1].split('=')[1];
    var idUser = window.location.href.split('?')[1].split(',')[0].split('=')[1];

    let dataRecoge = new FormData();

    dataRecoge.append('idUser', idUser);

    $('#nextMovil').on('click', eventoCarouselNext);
    $('#lastMovil').on('click', eventoCarouselAtras);
    $('#next').on('click', eventoCarouselNext);
    $('#last').on('click', eventoCarouselAtras);
    $('#comentar').on('click', eventoComentario);
    $('#retarian').on('click', eventoRetarian)
    $('#home').on('click', eventoHome);
    $('#atras').on('click', eventoAtras);
    $('#text').val('');
    $('#idUser').val(idUser);
    $('#nameUser').val(nameUser);
    $('#fotoUser').val(fotoUser);
    $('#explorar').attr('href', '../explorar/explorar.html?idUser='+idUser);
    $('#favoritos').attr('href', '../explorar/favoritos/favoritos.html?idUser='+idUser+',fotoUser='+fotoUser+',nameUser='+nameUser);

    $('#idUserComment').val(idUser);
   
    $('#url').val(window.location.href);

    $('#fotoPerfil').attr('src', '../'+fotoUser);
    $('#nombrePerfil').html(nameUser);
    $('#nombrePerfil2').html(nameUser);
    $('#inicio').attr('href', '../accesPrinc.php?id='+idUser);


    function eventoHome() {
        window.location.href = '../../index.html';
    }

    function eventoAtras() {
        window.location.href = '../indice.html';
    }

    function eventoComentario() {
        if (document.getElementById('comentar').style.fill==='blue') {
            $('#comentar').css('fill', '#ffc107');
            $('#inputComentar').val('0');
        }else{
            $('#comentar').css('fill', 'blue');
            $('#inputComentar').val('1');
        }
        
    }

    function eventoRetarian() {
        if (document.getElementById('retarian').style.fill==='green') {
            $('#retarian').css('fill', '#ffc107');
            $('#inputRetarian').val('0');
        }else{
            $('#retarian').css('fill', 'green');
            $('#inputRetarian').val('1');
        }
        
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
        $('#svgRetarians').css('display', 'none');
        
        

        fetch('./muestraTarians.php', {
             url: './muestraTarians.php',
             method: 'POST',
             body: dataRecoge
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){
    
            console.log(data[contCarousel]);
        
           


            for (const value of data) {
                value[0]!==null? texto = 1 : texto = 0;
                value[1]!==null? foto = 1 : foto = 0; 
                value[2]!==null? video = 1 : video = 0; 
                value[3]!==null? pdf = 1 : pdf = 0;           
    
                carousel.push([value, texto, foto, video, pdf]);
            }
            
            let idTarian = carousel[contCarousel][0][5];

            $('#fechaTarian').html(data[0][4]);
            $('#idTarianComment').val(idTarian);

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
                            $('#svgRetarians').css('display', 'block');
                        $('#imagen').css('display', 'block');
                        $('#contenido').css('display', 'block');
                        $('#contenido').html(carousel[contCarousel][0][0]);
                        $('#contenido').css('color', 'red');
                        $('#nameUserCont').html('Retarians de: '+nameUser);
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
                        $('#contenedorPrinc').css('background-size', 'cover');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                        }
                        break;
                    case carousel[contCarousel][3]===1:
                        if (data[contCarousel][8]==='1') {
                            $('#svgRetarians').css('display', 'block');
                        $('#nameUserCont').html('Retarians de: '+nameUser);
                        $('#retarianContenido').html(data[contCarousel][7]);
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#videoContent2').css('display', 'block');
                        console.log('Es un video');
                        $('#videoContent2').attr('src', '../mostrar/'+carousel[contCarousel][0][2]);
                        $('#contenedorPrinc').css('display', 'none');
                        $('#videoContent2').attr('loop', true);
                        $('#videoContent2').attr('controls', true);
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
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                        }
                    
    
                        break;
    
                    case carousel[contCarousel][4]===1:
                    if (data[contCarousel][8]==='1') {
                        $('#svgRetarians').css('display', 'block');
                        $('#contenido').css('display', 'block');
                        $('#contenido').html(carousel[contCarousel][0][0]);
                        $('#contenido').css('color', 'red');
                        $('#pdf').attr('href', '../mostrar/'+carousel[contCarousel][0][3]);
                        $('#pdf').css('display', 'inline');
                        $('#pdf').html(carousel[contCarousel][0][3]);
                        $('#nameUserCont').html('Retarians de: '+nameUser);
                        $('#retarianContenido').html(data[contCarousel][7]);
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#descripcion').html(carousel[contCarousel][0][0]);
                        $('#contenedorPrinc').css('background', 'white');
                        $('#contenedorPrinc').css('padding', '0');
                        $('#idTarianComment').val(carousel[contCarousel][0][5]);
                            console.log('Es un pdf');
                    }else{
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#pdf').attr('href', '../mostrar/'+carousel[contCarousel][0][3]);
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
                        $('#svgRetarians').css('display', 'block');
                        $('#nameUserCont').html('Retarians de: '+nameUser)
                        $('#nombrePerfil2').html(data[contCarousel][6]);
                        $('#fechaTarian').html(carousel[contCarousel][0][4]);
                        $('#contenido').html(carousel[contCarousel][0][0]);
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


}