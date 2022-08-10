$(document).ready(function () {
    saludar();
    
    function saludar(){
        var tiempo = new Date();
        var hora, cad;
        with (tiempo){
        hora = getHours();
        cad += hora + ":" + getMinutes()+":"+getSeconds();
        }
        if (hora >= 5 && hora < 12){
            cad = "Buenos días";
        }else if (hora >= 12 && hora < 19){
            cad = "Buenas tardes";
        }else{
            cad = "Buenas noches";
        } 
        cad +=', Bienvenido a SASI'
        $("#saludo").html(cad);
    }
    

    $(document).on('click', '.login', function (e) {
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        let type = '';
        if ((username.trim()).length <= 0 || (password.trim()).length <= 0) {
            alert('Uno o varios campos estan vacios');
        } else {
            const postData = {
                username: $('#username').val(),
                password: $('#password').val()
            };
            $.post('../bdd/scriptlogin.php', postData, function (response) {
                if (response === "0") {
                    alert("Usuario o contraseña incorrectos");
                } else {
                    window.location.href = "/inicio.php";
                    $('.formulario_registre').trigger('reset');
                }

            });
        }
        
    })
});
