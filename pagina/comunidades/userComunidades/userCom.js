$(window).on('load', codigo);

function codigo() {

    $('#close').on('click', eventoBorrar);

    function eventoBorrar() {
        $('#search').val('');
    }

    fetch('userCom.php')
    .then(function(res){
        return res.json();
    })
    .then(function(data){

        $('#search').on('input', eventoBuscar);


        function eventoBuscar() {

            $('#comunidades').html('');

                for (const valor of data) {

                    let rutaImg = valor[2].split('/')[4];

                    if (valor[1].indexOf(this.value) !== -1) { 
                        $('#comunidades').append('<div class="bg-light m-3 text-center" style="border-radius: 8px; width: 200px;"><div class="mt-3"><img id="fotoPerfil" class="rounded-circle" src="../add/imgCom/'+rutaImg+'" alt="" style="width: 170px; height: 150px;"></div><div class="col-12 my-4"><span>Comunidad:'+valor[1]+'</span><br><span id="nombrePerfil"></span><a class="btn btn-warning" href="./altaComs/altaComs.html?idCom='+valor[0]+'">Seleccionar</a></div></div>');
                    }
                   
                }
            
        }

        
    })

}