<?php
// Session
session_start();
if (isset($_SESSION['username']) && isset($_SESSION['tipo'])) {
?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Icono en pestaña -->
        <link rel="icon" type="image/x-icon" href="../imagenes/favicon.ico" />
        <!-- Estilos -->
        <link href="../css/stylemodal.css" rel="stylesheet" />
        <link href="../css/style.css" rel="stylesheet" />
        <link href="../css/styleTable.css" rel="stylesheet" />
        <link href="../css/stylethings.css" rel="stylesheet" />
        <link rel="stylesheet" href="../css/mlateral.css">
        <script src="https://kit.fontawesome.com/25f7695136.js" crossorigin="anonymous"></script>
        <!-- Script's para Jquery y Ajax -->
        <script src="../js/jquery.min.js"></script>
        <title>Inicio</title>
    </head>

    <body id="body">
        <!--barra del icono del menu-->
        <header>
            <div class="icon_menu" title="Menu">
                <i class="fa-solid fa-align-justify" id="btn_open"></i>
            </div>
            <p class="hola">Inicio</p>
        </header>
        <!--Fin de la barra del icono del menu-->

        <!--Barra lateral(Vertical) Inicio-->
        <div class="menu__side" id="menu_side">
            <!--Inicio del menu lateral(Vertical)-->
            <!--Donde ira el icono usuario-->
            <div class="name__page" id="op_cuenta">
            <i username="<?php echo ($_SESSION['username']) ?>" class="fa-solid fa-circle-user" title="Información de usuario"></i>
                <div id="u_result">
                    <h4><?php echo ($_SESSION['username']) ?></h4>
                </div>
            </div>
            <!--fin icono del usuario-->

            <?php
            /* ************ Si el usuario es de tipo Administrador **************** */
            if ($_SESSION['tipo'] == '1') { 
            ?>
            
                <!--Inicio Menu opciones-->
                <div class="options__menu">
                    <!--1.-Opcion de Inicio-->
                    <a id="op_home" class="selected">
                        <!--Para las direcciones entre paginas-->
                        <div class="option activo">
                            <i class="fa-solid fa-house" title="Inicio"></i>
                            <h4 class="h4">Inicio</h4>
                        </div>
                    </a>

                    <!--2.-Opcion de Departamentos-->
                    <a id="op_depto">
                        <div class="option">
                            <i class="fa-solid fa-building" title="Departamentos"></i>
                            <h4 class="h4">Departamentos</h4>
                        </div>
                    </a>
                    <!--3.-Opcion de Personal-->
                    <a id="op_person">
                        <div class="option">
                            <i class="fa-solid fa-users" title="Personal"></i>
                            <h4 class="h4">Personal</h4>
                        </div>
                    </a>

                    <!--4.-Opcion de Tipo de problema -->
                    <a id="op_tipo_problem">
                        <div class="option">
                            <i class="fa-solid fa-wrench" title="Tipo de reporte"></i>
                            <h4 class="h4">Tipo de reporte</h4>
                        </div>
                    </a>

                    <!--5.-Opcion de Salir-->
                    <a id="op_salir">
                        <div class="option">
                            <i class="fa-solid fa-arrow-right-from-bracket" title="Salir"></i>
                            <h4>Salir</h4>
                        </div>
                    </a>
                </div>
                <!--Fin del opciones del menu-->

            <?php
            /* *********** Si el usuario es de tipo Soporte ********** */
            } else if ($_SESSION['tipo'] == '2') {
            ?>
                <!--Inicio Menu opciones-->
                <div class="options__menu">
                    <!--1.-Opcion de Inicio-->
                    <a id="op_home" class="selected">
                        <!--Para las direcciones entre paginas-->
                        <div class="option activo">
                            <i class="fa-solid fa-house" title="Inicio"></i>
                            <h4 class="h4">Inicio</h4>
                        </div>
                    </a>
                    <!--2.-Opcion de Personal-->
                    <a id="op_person">
                        <div class="option">
                            <i class="fa-solid fa-users" title="Personal"></i>
                            <h4 class="h4">Personal</h4>
                        </div>
                    </a>
                    <!--3.-Opcion de Salir-->
                    <a id="op_salir">
                        <div class="option">
                            <i class="fa-solid fa-arrow-right-from-bracket" title="Salir"></i>
                            <h4>Salir</h4>
                        </div>
                    </a>
                </div>
                <!--Fin del opciones del menu-->

            <?php
            /* ***************  Si el usuario es de tipo General *************** */
            } else if ($_SESSION['tipo'] == '3') {
            ?>
                <!--Inicio Menu opciones-->
                <div class="options__menu">
                    <!--1.-Opcion de Inicio-->
                    <a id="op_home" class="selected">
                        <!--Para las direcciones entre paginas-->
                        <div class="option activo">
                            <i class="fa-solid fa-house" title="Inicio"></i>
                            <h4 class="h4">Inicio</h4>
                        </div>
                    </a>
                    <!--2.-Opcion de Salir-->
                    <a id="op_salir">
                        <div class="option">
                            <i class="fa-solid fa-arrow-right-from-bracket" title="Salir"></i>
                            <h4>Salir</h4>
                        </div>
                    </a>
                </div>
            <?php
            }else{
                session_destroy();
                header("Location: ../index.php");
                die();
            }
            ?>
        </div>
        <!--Barra lateral(Vertical) Fin cambiar-->
        <main class="main">
            <?php
            // Si el usuario es administrador 
            if ($_SESSION['tipo'] == '1') {
            ?>
            <!-- Tabla -->
            <div class="content">
            <div class="card__cuatro">
                <div class="card">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Solicitudes en espera</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-esp card__item">
                            <li><i class="fa-solid fa-clock"></i> Total: 0</li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Solicitudes finalizadas</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-fin card__item">
                            <li><i class="fa-solid fa-circle-check"></i> Total de hoy: 0</li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Solicitudes en atención</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-aten card__item">
                            
                            <li><i class="fa-solid fa-bell-concierge"></i> Total: 0</li>
                        </ul>
                    </div>
                </div>

                <div class="card card__listasoporte">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Usuarios de soporte</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-listsoport card__item">
                            
                        </ul>
                    </div>
                </div>
            </div>
                
                <form action="/reportes/" target="_blank" method="POST" id="formulario">
            <div class="card__tres">
                <div class="card__withitems">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Filtrar solicitudes por estado</span>
                        </div>
                    </div>
                    <div class="card__content card__fragment__mitad">
                        <select name="where" class="card__input__mitad" id="where"></select>
                        <button class="btn card__input__mitad" id="estado-filter"><i class="fa-solid fa-filter"></i> Filtrar</button>
                    </div>
                </div>

                <div class="card__withitems">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Filtrar solicitudes por fecha</span>
                        </div>
                    </div>
                    <div class="card__content card__fragment__tres">

                        <div class="card__fragment__fecha">
                        <label for="fechainicio" class="card__input__mitad">Fecha de inicio</label>
                        <input type="date" class="in card__input__mitad" name="fechainicio" id="fechainicio"/>
                        </div>

                        <div class="card__fragment__fecha">
                        <label for="fechafin" class="card__input__mitad">Fecha de fin</label>
                        <input type="date" class="in card__input__mitad" name="fechafin"  id="fechafin"/>
                        </div>

                        <div class="card__fragment__fecha">
                        <button class="btn card__input__mitad" id="filter-button"><i class="fa-solid fa-filter"></i> Filtrar</button>
                        <button type="submit" class="btn card__input__mitad" id="filter-pdf-button"><i class="fa-solid fa-file-pdf"></i> Reporte</button>
                        </div>

                    </div>
                </div>
                <div></div>
                </div>
                </div>

                </form>
                    <div id="loadtabla" class="loading">
                        <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                        </svg>
                    </div> 
                    <table id="tabla-admin">          
                        <!-- Encabezado de tabla -->
                        <thead>
                            <tr id="header">
                                
                            </tr>
                        </thead>
                        <!-- Contenido de la tabla  -->
                        <tbody id="table-admin">
                        </tbody>
                    </table>

                    <!-- Previsualizar solicitud -->
                </div>
                    <div class="modal" id="modalPrevisual">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="btn-modal close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
                                <h2 class="modal__item__titulo"><b>Solicitud</b></h2>
                            </div>
                            <div class="modal-body modal__dos" id="modalbody__espera">
                                
                            </div>
                            <div class="modal-footer fragment__modal__item" id="modalfooter__espera">
                                
                            </div>
                        </div>
                    </div>
                    <script src="../js/reporteadmin.js"></script>
            </div>

            <?php
                // Si el usuario es de informatica
            } else if ($_SESSION['tipo'] == 2) {
            ?>
                <!-- Tabla con reportes registrados -->
                
            <div class="content">
            <div class="card__tres__full">
                <div class="card">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Solicitudes en espera</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-esp card__item">
                            
                            <li><i class="fa-solid fa-clock"></i> Total: 0</li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Solicitudes finalizadas hoy</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-fin card__item">
                            <li><i class="fa-solid fa-circle-check"></i> Total: 0</li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle">Solicitudes en atención</span>
                        </div>
                    </div>
                    <div class="card__content">
                        <ul class="scoreboard-aten card__item">
                            
                            <li><i class="fa-solid fa-bell-concierge"></i> Total: 0</li>
                        </ul>
                    </div>
                </div>
            </div>    
            <div class="card__tres">
                <div class="card__withitems">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle"><b>Filtrar solicitudes por estado</b></span>
                        </div>
                    </div>
                    <div class="card__content card__tres__filtro">
                        <div>
                        <input checked type="radio" name="radOverclock" id="radio1" class="card__input__mitad" />
                        </div>
                        <div>
                        <label for="radio1" class="card__input__mitad">Espera o Atención</label>
                        </div>
                        <div>
                        <input type="radio" name="radOverclock" id="radio2" class=" card__input__mitad"/>
                        </div>
                        <div>
                        <label for="radio2" class="card__input__mitad">Finalizado</label>
                        </div>
                        <div>
                        <button class="btn card__input__mitad" id="estado-filter"><i class="fa-solid fa-filter"></i> Filtrar</button>
                        </div>
                    </div>
                </div>

                <div class="card__withitems">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle"><b>Filtrar solicitudes por fecha</b></span>
                        </div>
                    </div>
                    <div class="card__fragment__tres">
                        <div class="card__fragment__fecha">
                        <label for="fechainicio" class="card__input__mitad">Fecha inicio</label>
                        <input type="date" class="card__input__mitad" name="fechainicio" id="fechainicio"/>
                        </div>
                        <div class="card__fragment__fecha">    
                        <label for="fechafin" class="card__input__mitad">Fecha fin</label>
                        <input type="date" class="card__input__mitad" name="fechafin"  id="fechafin"/>
                        </div>
                    <div class="card__fragment__fecha">    
                        <button class="btn card__input__mitad" id="filter-button"><i class="fa-solid fa-filter"></i> Filtrar</button>
                    </div>
                    </div>
                </div>
            </div>    
                    <div id="loadtabla" class="loading">
                        <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                        </svg>
                    </div>
                    <table>  
                        <!-- Encabezado de tabla -->
                        <thead>
                            <tr id="header">
                                <th>FECHA</th>
                                <th>REPORTE</th>
                                <th>REPORTA</th>
                                <th>ACCIÓN</th>
                            </tr>
                        </thead>
                        <!-- Contenido de la tabla  -->
                        <tbody id="table-support">
                            <tr>
                                <td>Sin Resultados.</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            <tr/>
                        </tbody>
                    </table>

                    <!-- Previsualizar solicitud -->
                    <div class="modal" id="modalPrevisual">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="btn-modal close"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
                                <h2 class="modal__item__titulo"><b>Solicitud</b></h2>
                            </div>
                            <div class="modal-body modal__dos" id="modalbody__espera">
                                
                            </div>
                            <div class="modal-footer fragment__modal__item" id="modalfooter__espera">
                                
                            </div>
                        </div>
                    </div>
                    <script src="../js/reportesoporte.js"></script>
                </div>
            <?php
                // Si el usuario es cualquier otro
            } else if ($_SESSION['tipo'] == 3) {
            ?>
            <div class="content">

            <div class="card__tres">
                <div class="card__withitems">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle"><b>Filtrar solicitudes por estado</b></span>
                        </div>
                    </div>
                    <div class="card__content card__tres__filtro">
                        <div>
                        <input checked type="radio" name="radOverclock" id="radio1" class="card__input__mitad" />
                        </div>
                        <div>
                        <label for="radio1" class="card__input__mitad"> Recientes</label>
                        </div>
                        <div>
                        <input type="radio" name="radOverclock" id="radio2" class=" card__input__mitad"/>
                        </div>
                        <div>
                        <label for="radio2" class="card__input__mitad"> Finalizado</label>
                        </div>
                        <div>
                        <button class="btn card__input__mitad" id="estado-filter"><i class="fa-solid fa-filter"></i> Filtrar</button>
                        </div>
                    </div>
                </div>

                <div class="card__withitems">
                    <div class="tools">
                        <div class="circle">
                            <span class="red box"></span>
                        </div>
                        <div class="circle">
                            <span class="yellow box"></span>
                        </div>
                        <div class="circle">
                            <span class="green box"></span>
                        </div>
                        <div>
                            <span class="card__item_tittle"><b>Filtrar solicitudes por fecha</b></span>
                        </div>
                    </div>
                    <div class="card__fragment__tres">
                        <div class="card__fragment__fecha">
                        <label for="fechainicio" class="card__input__mitad">Fecha inicio</label>
                        <input type="date" class="card__input__mitad" name="fechainicio" id="fechainicio"/>
                        </div>
                        <div class="card__fragment__fecha">    
                        <label for="fechafin" class="card__input__mitad">Fecha fin</label>
                        <input type="date" class="card__input__mitad" name="fechafin"  id="fechafin"/>
                        </div>
                    <div class="card__fragment__fecha">    
                        <button class="btn card__input__mitad" id="filter-button"><i class="fa-solid fa-filter"></i> Filtrar</button>
                    </div>
                    </div>
                </div>
            </div>
                <button type="submit" class="btn" id="add-button"><i class="fa-solid fa-plus"></i> Agregar reporte</button>
                <p><br></p>   
                    <div id="loadtabla" class="loading">
                        <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                        </svg>
                    </div> 
                <div id="card" >
                    <div class="cabecera">
                    <h2 class="titulo_reporte">No hay solicitudes en espera en este momento</h2>
                    </div>
                </div>
                
                <script src="../js/reporteusuario.js"></script>
            </div>
            <?php
            }
            ?>

        </main>
        <script src="../js/mlateral.js"></script>
    </body>
    <!-- Tiempo de inactividad -->
<script>
     var time = new Date().getTime();
     $(document.body).bind("mousemove keypress", function(e) {
         time = new Date().getTime();
     });

     function refresh() {
        // Espera a que pasen 2 minutos
         if(new Date().getTime() - time >= 120000) 
             window.location.reload(true);
         else 
             setTimeout(refresh, 60000);
     }
    // Comprueba cada 1 minuto
    setTimeout(refresh, 60000);
</script>
    </html>
<?php
} else {
    header("Location: ../index.php");
    die();
}
?>