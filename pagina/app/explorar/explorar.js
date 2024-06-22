$(window).on('load', codigo);

function codigo() {

    let idUser = window.location.href.split('?')[1].split('=')[1];
    let dataIdUser = new FormData();

    dataIdUser.append('idUser', idUser);


    fetch('../url.php', {
        url: '../url.php',
        method: 'POST',
        body: dataIdUser
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){

        let idCom = data[0][0];
        let nameUser = data[0][1];
        let fotoUser = data[0][2];
        
    $('#search').on('input', eventoLimpio);

    $('#inicio').attr('href', '../accesPrinc.php?id='+idUser);
    $('#misTarians').attr('href', '../misTarians.php?id='+idUser);
    $('#favoritos').attr('href', '../explorar/favoritos/favoritos.html?idUser='+idUser+',fotoUser=.'+fotoUser+',nameUser='+nameUser);
    $('#idCom').val(idCom);



    $('#close').on('click', eventoBorrar);

    let dataHastagsPhp = new FormData();

    dataHastagsPhp.append('idCom', idCom);

    let dataUsersPhp = new FormData();

    dataUsersPhp.append('idCom', idCom);


    function eventoLimpio() {
        if (this.value==='') {
            $('#usuarios').html('');   
        }
    }

    function eventoBorrar() {
        $('#search').val('');
    }

    

    fetch('./explorarUsers.php', {
        url: './explorarUsers.php',
             method: 'POST',
             body: dataUsersPhp
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){

        console.log(data);

        $('#search').on('input', eventoBuscar);


        function eventoBuscar() {

            

            if (this.value.charAt(0).indexOf('@') !== -1) {

                $('#usuarios').html('');

                console.log(data)

                
                for (const valor of data) {
                    if (valor[0].indexOf(this.value) !== -1) { 
                        $('#usuarios').append('<div class="bg-light m-3 text-center" style="border-radius: 8px; width: 200px;"><div class="mt-3"><img id="fotoPerfil" class="rounded-circle" src="../../'+valor[1]+'" alt="" style="width: 170px; height: 150px;"></div><div class="col-12 my-4"><span>Perfil de:'+valor[0]+'</span><br><span id="nombrePerfil"></span><a class="btn btn-warning" href="./bloqueadorUsers.php?idUser='+valor[2]+'?rutaFotoUser='+valor[1]+'?nameUser='+valor[0]+'?idUserBloq='+idUser+'">Seleccionar</a></div></div>');
                    }
                   
                }
            }

            
        }

        
    })

    

    fetch('./explorarHastags.php', {
        url: './explorarHastags.php',
             method: 'POST',
             body: dataHastagsPhp
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){

        $('#search').on('input',eventoHastags);

        function eventoHastags() {

            var arrayHastags = new Array();


             var arrayRows = new Array;

            if (this.value.charAt(0).indexOf('#')!==-1) {

                $('#usuarios').html('');

                $('#usuarios').html('');

                for (const value of data) {
                    if (value[2]!==null) {
                        arrayRows = [value[2], value[6], value[5]];
                        arrayHastags.push(arrayRows);
                    }
                    }
            
                    for (const valor of arrayHastags) {
                    
                        if (valor[0].indexOf(this.value) !== -1) { 
                            $('#usuarios').append('<div class="bg-light m-3 text-center" style="border-radius: 8px; width: 200px;"><div class="mt-3"><img id="fotoPerfil" class="rounded-circle" src="../../'+valor[2]+'" alt="" style="width: 170px; height: 150px;"></div><div class="col-12 my-4"><span>Perfil de:'+valor[1]+'</span><br><span id="nombrePerfil"></span><a href="../hastags/hastags.html?idCom='+idCom+',hastags='+valor[0].split('#')[1]+',idUser='+idUser+'">'+valor[0]+'</a></div></div>');
                        }
                      
                    }
            }
        }
        
        
    })
        
    })



}