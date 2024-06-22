$(window).on('load', codigo);

function codigo() {
    $('#atras').on('click', eventoAtras);
    $('#home').on('click', eventoHome);
    $('#btnLog').on('click', eventoLogin);
    $('#btnReg').on('click', eventoReg);


    function eventoAtras() {
        window.location.href = '../indice.html';
    }

    function eventoHome() {
        window.location.href = '../../index.html';
    }

    function eventoLogin() {
        window.location.href = './loginAdmin/loginAdmin.html?id='+window.location.href.split('?')[1];
    }

    function eventoReg() {
        window.location.href = '../admin/addAdmin.html?id='+window.location.href.split('?')[1];
    }
}