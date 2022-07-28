<?php
session_start();
if (isset($_SESSION['username']) && isset($_SESSION['tipo'])) {
    header("Location: /inicio.php");
    die();
} else {
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="/imagenes/favicon.ico" />
    <title>SASI | Sistema para Atención de Solicitud Informática</title>
    <link rel="stylesheet" href="/css/styleLogin.css">
    <script src="/js/jquery.min.js"></script>
    <script src="/js/login.js"></script>
</head>

<body>
    <div class="header">
        <h1 class="title" id="saludo">Bienvenido al SASI</h1>
    </div>
        
    <div class="contenido fragment">
        <div class="imagen">
            <img class="img" src="/imagenes/logosalud.png">
        </div>
        <div class="form-container">
            <h2>Inicio de sesión</h2>
            <form>
                <div class="control">
                    <label for="username">Nombre</label>
                    <input type="text" name="username" id="username">
                </div>
                <div class="control">
                    <label for="password">Contraseña</label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="control">
                    <input class="btn login" type="submit" id="login" value="Entrar">
                </div>
            </form>
            </div>
    </div>

    <div class="footer">
        <footer>
            <label>
                Secretaría de Salud
            </label>
            <label>
                Sistema para Atención de Solicitud Informática
            </label>
            <label>
                2022
            </label>
        </footer>
    </div>

</body>
</html>

<?php
}
?>