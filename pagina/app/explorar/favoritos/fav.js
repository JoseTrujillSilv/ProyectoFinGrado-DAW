$(window).on('load', codigo);

function codigo() {
    var texto = 0;
    var foto = 0;
    var video = 0;
    var pdf = 0;
    var carousel = new Array;
    var contCarousel = 0;
    var palancaEstrella = false;
    
    
    let nameUser = window.location.href.split('?')[1].split(',')[2].split('=')[1];
    let fotoUser = '../'+window.location.href.split('?')[1].split(',')[1].split('=')[1];
    var idUser = window.location.href.split('?')[1].split(',')[0].split('=')[1];

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
    $('#explorar').attr('href', '../explorar.html?idUser='+idUser);
    $('#inicio').attr('href', '../../accesPrinc.php?id='+idUser);
    $('#misTarians').attr('href', '../../misTarians.php?id='+idUser);
    
    $('#url').val(window.location.href);

    $('#fotoPerfil').attr('src', '../'+fotoUser);
    $('#nombrePerfil').html(nameUser);


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

        let dataRecoge = new FormData();

        dataRecoge.append('idUserRec', idUser);

        fetch('./RecogeFav.php', {
            url: './RecogeFav.php',
            method: 'POST',
            body: dataRecoge
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            
            console.log(data);

            for (const value of data) {
                value[4]!==null? texto = 1 : texto = 0;
                value[5]!==null? foto = 1 : foto = 0; 
                value[6]!==null? video = 1 : video = 0; 
                value[7]!==null? pdf = 1 : pdf = 0;           
    
                carousel.push([value, texto, foto, video, pdf]);
            }
            
            let fecha = data[0][8];
            let nameUser2 = data[contCarousel][9];

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
            $('#nombrePerfil2').html(nameUser2);

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
                        $('#fechaTarian').html(carousel[contCarousel][0][8]);
                        $('#contenido').css('display', 'none');
                        $('#videoContent').css('display', 'none');
                        $('#pdf').css('display', 'none');
                        $('#descripcion').html(carousel[contCarousel][0][4]);
                        $('#contenedorPrinc').css('background-image', 'url('+'../mostrar/'+carousel[contCarousel][0][5]+')');
                        $('#imgFav').val(carousel[contCarousel][0][5]);
                        $('#contenedorPrinc').css('background-size', 'cover');
                        $('#textFav').val(carousel[contCarousel][0][4]);
                       
    
                        break;
                    case carousel[contCarousel][3]===1:
    
                    $('#fechaTarian').html(carousel[contCarousel][0][8]);
                        $('#imagen').css('display', 'none');
                        $('#contenido').css('display', 'none');
                        $('#videoContent').css('display', 'block');
                        $('#contenido').css('display', 'none');
                        $('#pdf').css('display', 'none');
                        console.log('Es un video');
                        $('#videoContent').attr('src', '../mostrar/'+carousel[contCarousel][0][6]);
                        $('#videoContent').attr('loop', true);
                        $('#videoContent').attr('controls', true);
                        $('#descripcion').html(carousel[contCarousel][0][4]);
                        $('#textFav').val(carousel[contCarousel][0][4]);
                       
    
                        break;
    
    
    
    
                    case carousel[contCarousel][4]===1:
    
                    $('#fechaTarian').html(carousel[contCarousel][0][8]);
                    $('#pdf').attr('href', '../mostrar/'+carousel[contCarousel][0][7]);
                    $('#pdf').css('display', 'inline');
                    $('#pdf').html(carousel[contCarousel][0][7]);
                    $('#videoContent').css('display', 'none');
                    $('#imagen').css('display', 'none');
                    $('#contenido').css('display', 'none');
                    $('#descripcion').html(carousel[contCarousel][0][4]);
                    $('#textFav').val(carousel[contCarousel][0][0]);
                    $('#contenedorPrinc').css('background', 'white');
                    $('#contenedorPrinc').css('padding', '0');
                   
                   
    
    
                        console.log('Es un pdf');
                        break;
    
    
    
                    default:
    
                    $('#fechaTarian').html(carousel[contCarousel][0][8]);
                        $('#contenido').html(carousel[contCarousel][0][4]);
                        $('#textFav').val(carousel[contCarousel][0][1]);
                        $('#contenido').css('display', 'block');
                        $('#videoContent').css('display', 'none');
                        $('#imagen').css('display', 'none');
                        $('#pdf').css('display', 'none');
                        $('#descripcion').html('');


                        $('#contenedorPrinc').css('background', 'white');
                        $('#contenedorPrinc').css('padding', '0');
                       
                       
    
                        console.log('Es un texto');
                }
    
        })
    }

}