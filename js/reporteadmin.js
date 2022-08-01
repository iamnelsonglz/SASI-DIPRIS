$(document).ready(function () {
    finalizado();
    espera();
    atencion();
    //listaSoporte();
    estado();
    fecha();
    obtenerReportesEspera();

    // Contador solicitudes finalizadas
    function finalizado() {
        $.ajax({
            url: '../bdd/scriptadministrador.php?finish',
            type: 'GET',
            beforeSend: function (xhr) {

            },
            success: function (response) {

                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    console.log("-->" + persona);
                    template += `
                    <li> <i class="fa-solid fa-clipboard-user"></i>${persona.total} | ${persona.nombre}</li>
                    `;
                    $('.scoreboard-fin').html(template);

                })
            }
        });
    }

    // Contador solicitudes en espera
    function espera() {
        $.ajax({
            url: '../bdd/scriptadministrador.php?wait',
            type: 'GET',
            success: function (response) {
                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    template += `
                    <li> <i class="fa-solid fa-clock"></i> Total: ${persona.total}</li>
                    `;
                    $('.scoreboard-esp').html(template);
                })
            }
        });
    }

    // Contador solicitudes en atención
    function atencion() {
        $.ajax({
            url: '../bdd/scriptadministrador.php?attention',
            type: 'GET',
            beforeSend: function (xhr) {

            },
            success: function (response) {

                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    console.log("-->" + persona);
                    template += `
                    <li> <i class="fa-solid fa-clipboard-user"></i> ${persona.total} | ${persona.nombre}</li>
                    `;
                    $('.scoreboard-aten').html(template);

                })
            }
        });
    }

    // Listado de usuarios de soporte
    function atencion() {
        $.ajax({
            url: '../bdd/scriptadministrador.php?listadosoporte',
            type: 'GET',
            beforeSend: function (xhr) {

            },
            success: function (response) {

                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    console.log("-->" + persona);
                    template += `
                    <li> <i class="fa-solid fa-user"></i> ${persona.nombre}</li>
                    `;
                    $('.scoreboard-listsoport').html(template);

                })
            }
        });
    }

    // Rellenar filtro de solicitudes por estado
    function estado() {
        $.ajax({
            url: '../bdd/scriptadministrador.php?where',
            type: 'GET',
            success: function (response) {
                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    template += `
                    <option value="${persona.idEstado}">${persona.nombre}</option>
                `
                    $('#where').html(template);
                })
            }
        });
    }

    // Mostrar fecha actual en input de filtro de solicitudes por fecha
    function fecha() {
        var fecha = new Date();
        document.getElementById("fechainicio").value = fecha.toJSON().slice(0, 10);
        document.getElementById("fechafin").value = fecha.toJSON().slice(0, 10);
    }

    var modal = document.getElementById("modalPrevisual");
    // Cerrar modal al hacer click en botón
    $(document).on('click', '.close', function (e) {
        modal.style.display = "none";
    })

    // Cerrar modal al hacer click fuera del modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Cerrar modal al finalizar acción
    function cerrarModal() {
        modal.style.display = "none";
    }

    // Previsualizar solicitud en espera
    $(document).on('click', '.previsualizar__espera', function (e) {
        modal.style.display = "block";
        let template = '';
        e.preventDefault();
        let element = $(this)[0];
        let folio = $(element).attr('folio');
        $.ajax({
            url: '../bdd/scriptadministrador.php?previsual=' + folio + '&estado=1',
            type: 'GET',
            success: function (response) {
                console.log(response);
                const personas = JSON.parse(response);
                personas.forEach(persona => {
                    template = '';
                    template += `
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="reporta"><b>Persona que reporta:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="reporta" id="p_reporta">${persona.nombre} ${persona.paterno} ${persona.materno}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="tipop"><b>Tipo de usuario: </b></label>
                                <label class="modal__item__in modal__item__txt" name="tipop" id="tipo_reporta">${persona.categoria}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="reporta"><b>Departamento:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="reporta" id="p_reporta">${persona.departamento}, ubicado en la planta ${persona.planta}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="msj"><b>Mensaje:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="msj" id="msj_solicitud">${persona.descripcion}</label>
                            </div>
                            `;
                    $('#modalbody__espera').html(template);
                    $('#modalbody__espera').show();
                })

                personas.forEach(persona => {
                    template = '';
                    template += `
                            <div>
                                <select class="support-user modal__item__in modal__item__txt" name="user-soporte" id="${persona.folio}">
                                </select>
                            </div>
                            <div>
                                <button class="assign-button btn-modal item__modal" type="submit" folio="${persona.folio}" title="Presione para asignar tarea "> <i class="fa-solid fa-check"></i> Asignar </button>
                            </div>
                            `;
                    $('#modalfooter__espera').html(template);
                    $('#modalfooter__espera').show();
                })
                selectSoporte();
            }
        });
    })

    // Previsualizar solicitud en atención
    $(document).on('click', '.previsualizar__atencion', function (e) {
        modal.style.display = "block";
        let template = '';
        e.preventDefault();
        let element = $(this)[0];
        let folio = $(element).attr('folio');
        $.ajax({
            url: '../bdd/scriptadministrador.php?previsual=' + folio + '&estado=2',
            type: 'GET',
            success: function (response) {
                console.log(response);
                const personas = JSON.parse(response);
                personas.forEach(persona => {
                    template = '';
                    template += `
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="reporta"><b>Persona que reporta:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="reporta" id="p_reporta">${persona.nombre} ${persona.paterno} ${persona.materno}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="tipop"><b>Tipo de usuario: </b></label>
                                <label class="modal__item__in modal__item__txt" name="tipop" id="tipo_reporta">${persona.categoria}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="reporta"><b>Departamento:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="reporta" id="p_reporta">${persona.departamento}, ubicado en la planta ${persona.planta}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="msj"><b>Mensaje:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="msj" id="msj_solicitud">${persona.descripcion}</label>
                            </div>
                            `;
                    $('#modalbody__espera').html(template);
                    $('#modalbody__espera').show();
                })

                personas.forEach(persona => {
                    template = '';
                    template += `
                            <div class="modal__item__dos">
                            <span class="modal__item__in modal__item__txt"><b>Usuario asignado: </b></span>
                            <select class="support-user modal__item__in modal__item__txt" name="user-soporte" id="${persona.folio}">
                            <option value="${persona.responde}">${persona.responde}</option>
                            </select>
                            </div>
                            <div class="modal__item__dos">
                                <button type="submit" folio="${persona.folio}" class="assign-button btn-modal item__modal" title="Presione para re asignar solicitud "> <i class="fa-solid fa-check"></i> Re asignar </button>
                            </div>
                            `;
                    $('#modalfooter__espera').html(template);
                    $('#modalfooter__espera').show();
                })
            }
        });
    })

    // Previsualizar solicitud finalizada
    $(document).on('click', '.previsualizar__finalizado', function (e) {
        modal.style.display = "block";
        let template = '';
        e.preventDefault();
        let element = $(this)[0];
        let folio = $(element).attr('folio');
        $.ajax({
            url: '../bdd/scriptadministrador.php?previsual=' + folio + '&estado=3',
            type: 'GET',
            success: function (response) {
                console.log(response);
                const personas = JSON.parse(response);
                personas.forEach(persona => {
                    template = '';
                    template += `
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="msj"><b>Mensaje:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="msj" id="msj_solicitud">${persona.descripcion}</label>
                            </div>
                            <div class="modal__item__dos">
                                <label class="modal__item__in modal__item__txt" for="resp"><b>Respuesta:</b> </label>
                                <label class="modal__item__in modal__item__txt" name="resp" id="resp_solicitud">${persona.respuesta}</label>
                            </div>
                            `;
                    $('#modalbody__espera').html(template);
                    $('#modalbody__espera').show();
                })

                personas.forEach(persona => {
                    template = '';
                    template += `
                            <div></div>
                            <div>
                            <button type="submit" folio="${persona.folio}" class="btn-modal item__modal pdf-button" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button>
                            </div>
                            `;
                    $('#modalfooter__espera').html(template);
                    $('#modalfooter__espera').show();
                })
                //selectSoporte();
            }
        });
    })

    // Mostrar las solicitudes en Espera
    function obtenerReportesEspera() {
        let template = '';
        let thead = '';



        $.ajax({
            url: '../bdd/scriptadministrador.php?espera',
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>ACCIÓN</th>
                `;
                $('#header').html(thead);
                if (response === '[]') {
                    template += `
                    <tr>
                        <td>No hay reportes pendientes de atención</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);

                    personas.forEach(persona => {


                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td>
                            <button type="submit" folio="${persona.folio}" class="btn previsualizar__espera" title="Presione para ver la solicitud "> <i class="fa-solid fa-eye"></i> Ver solicitud</button>
                            <button type="submit" folio="${persona.folio}" class="pdf-button btn" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button>
                            </td>
                        </tr>
                    `;
                        $('#table-admin').html(template);
                    })
                }

            }
        });

    }

    // Mostrar las solicitudes en Atención
    function obtenerReportesAtencion() {
        let template = '';

        let thead = '';

        thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>ACCIÓN</th>
            `;
        $('#header').html(thead);
        $.ajax({
            url: '../bdd/scriptadministrador.php?atencion',
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes en atención</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td>
                            <button type="submit" folio="${persona.folio}" class="btn previsualizar__atencion" title="Presione para ver la solicitud "> <i class="fa-solid fa-eye"></i> Ver solicitud</button>
                            <button type="submit" folio="${persona.folio}" class="pdf-button btn" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button>
                            </td>
                        </tr>
                    `;
                        $('#table-admin').html(template);
                    })
                }

            }
        });
    }

    // Mostrar las solicitudes Finalizadas
    function obtenerReportesFinalizado() {
        let template = '';

        let thead = '';

        thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>RESPONDE</th>
                <th>ACCIÓN</th>
            `;
        $('#header').html(thead);
        $.ajax({
            url: '../bdd/scriptadministrador.php?finalizado',
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes finalizados</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td>${persona.responde}</td>
                            <td>
                            <button type="submit" folio="${persona.folio}" class="btn previsualizar__finalizado" title="Presione para ver la solicitud "> <i class="fa-solid fa-eye"></i> Ver solicitud</button>
                            </td>
                        </tr>
                    `
                        $('#table-admin').html(template);
                    })
                }

            }
        });
    }

    // Mostrar los reportes Caneladas
    function obtenerReportesCancelado() {
        let template = '';
        let thead = '';

        thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>ACCIÓN</th>
            `;
        $('#header').html(thead);
        $.ajax({
            url: '../bdd/scriptadministrador.php?cancelado',
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes cancelados</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td><button type="submit" folio="${persona.folio}" class="pdf-button btn" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button></td>
                        </tr>
                    `
                        $('#table-admin').html(template);
                    })
                }

            }
        });
    }

    // Rellenar select con usuarios de soporte
    function selectSoporte() {
        let template = '';
        $.ajax({
            url: '../bdd/scriptadministrador.php?soporte',
            type: 'GET',
            success: function (response) {
                if (response === '[]') {
                    template += `
                    <option>
                    No existen opciones
                    </option>`;
                    $('.support-user').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    template = '<option value="0">Seleccione un usuario</option>';
                    personas.forEach(persona => {
                        template += `
                            <option value="${persona.usuario}" usr="${persona.usuario}">
                                ${persona.nombre}
                            </option>
                         
                    `;
                        $('.support-user').html(template);
                    })
                }

            }
        });
    }

    // Rellenar select con usuarios de soporte
    function reselectSoporte(id) {

        let template = '';
        $.ajax({
            url: '../bdd/scriptadministrador.php?soporte',
            type: 'GET',
            success: function (response) {
                if (response === '[]') {
                    template += `
                    <option>
                    No existen opciones
                    </option>`;
                    $('#' + id).html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    template = '<option value="0">Seleccione una opción</option>';
                    personas.forEach(persona => {
                        template += `
                            <option value="${persona.usuario}" usr="${persona.usuario}">
                                ${persona.nombre}
                            </option>
                         
                    `;
                        $('#' + id).html(template);
                    })
                }

            }
        });
    }

    // Filtrar solicitudes Espera
    function filtrarReportesEspera(fechainicio, fechafin) {
        let template = '';
        let thead = '';

        thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>ACCIÓN</th>
            `;
        $('#header').html(thead);
        $.ajax({
            url: '../bdd/scriptadministrador.php?esperafiltro=true&inicio=' + fechainicio + '&fin=' + fechafin,
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes pendientes de atención</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td>
                            <button type="submit" folio="${persona.folio}" class="btn previsualizar__espera" title="Presione para ver la solicitud "> <i class="fa-solid fa-eye"></i> Ver solicitud</button>
                            <button type="submit" folio="${persona.folio}" class="pdf-button btn" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button>
                            </td>
                        </tr>
                        
                    `;
                        $('#table-admin').html(template);
                    })
                    selectSoporte();
                }

            }
        });
    }

    // Filtrar solicitudes Atención
    function filtrarReportesAtencion(fechainicio, fechafin) {
        let template = '';

        let thead = '';

        thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>ACCIÓN</th>
            `;
        $('#header').html(thead);
        $.ajax({
            url: '../bdd/scriptadministrador.php?atencionfiltro=true&inicio=' + fechainicio + '&fin=' + fechafin,
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes en atención</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td>
                            <button type="submit" folio="${persona.folio}" class="btn previsualizar__atencion" title="Presione para ver la solicitud "> <i class="fa-solid fa-eye"></i> Ver solicitud</button>
                            <button type="submit" folio="${persona.folio}" class="pdf-button btn" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button>
                            </td>
                        </tr>
                    `;
                        $('#table-admin').html(template);
                    })

                }

            }
        });
    }

    // Filtrar solicitudes Finalizado
    function filtrarReportesFinalizado(fechainicio, fechafin) {
        let template = '';
        let thead = '';

        thead += `
                <th>FECHA</th>
                <th>SOLICITUD</th>
                <th>REPORTA</th>
                <th>RESPONDE</th>
                <th>ACCIÓN</th>
            `;
        $('#header').html(thead);
        $.ajax({
            url: '../bdd/scriptadministrador.php?finalizadofiltro=true&inicio=' + fechainicio + '&fin=' + fechafin,
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes finalizados</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td>${persona.responde}</td>
                            <td>
                            <button type="submit" folio="${persona.folio}" class="btn previsualizar__finalizado" title="Presione para ver la solicitud "> <i class="fa-solid fa-eye"></i> Ver solicitud</button>
                            </td>
                        </tr>
                    `;
                        $('#table-admin').html(template);
                    })

                }

            }
        });
    }

    // Filtrar solicitudes Cancelado
    function filtrarReportesCancelado(fechainicio, fechafin) {
        let template = '';
        $.ajax({
            url: '../bdd/scriptadministrador.php?canceladofiltro=true&inicio=' + fechainicio + '&fin=' + fechafin,
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                if (response === '[]') {
                    template += `
                    <tr>
                    <td>No hay reportes cancelados</td>
                    <td></td>
                    <td></td>
                    <td></td>
                <tr/>`;
                    $('#table-admin').html(template);
                }
                else {
                    const personas = JSON.parse(response);
                    personas.forEach(persona => {
                        template += `
                        <tr folio="${persona.folio}" class="selected">
                            <td>${persona.fecha}</td>
                            <td>${persona.tipo}</td>
                            <td>${persona.usuario}</td>
                            <td><button type="submit" folio="${persona.folio}" class="pdf-button btn" title="Presione para generar pdf "> <i class="fa-solid fa-file-pdf"></i> Descargar solicitud</button></td>
                        </tr>
                    `;
                        $('#table-admin').html(template);
                    })
                }

            }
        });
    }

    $(document).on('click', '.support-user', function (e) {
        // var s = document.querySelector(".support-user");
        const id = e.target.getAttribute("id");
        const l = e.target.length;

        if (l <= 1) {
            reselectSoporte(id);
        } else {

        }
    })

    /* nuevo reporte
    $(document).on('click', '.add-button', function (e) {
        window.location.href = "../reportes/nuevo.php";
    })*/

    // Asignar tarea
    $(document).on('click', '.assign-button', function (e) {
        e.preventDefault();
        // Extraer folio del reporte
        let element = $(this)[0];
        let folio = $(element).attr('folio');

        // Extraer datos del select para asignar tarea
        let id_select = $('#' + folio).val();

        // Comprobar que se haya seleccionado una opción del select
        if ((id_select.length <= 0) || (id_select === '0')) {
            alert('Seleccione una opción valida');
        } else {
            if (confirm('¿Desea asignar esta tarea a ' + id_select + '?')) {
                const postData = {
                    add_soporte: id_select,
                    folio_reporte: folio
                };
                $.post('../bdd/scriptadministrador.php', postData, function (response) {
                    alert(response);
                    obtenerReportesEspera();
                });

            } else {

            }
        }
        cerrarModal();
        finish();
        wait();
        attention();
    })

    // filtrar reporte
    $(document).on('click', '#estado-filter', function (e) {
        e.preventDefault();
        let filtro = $('#where').val();
        if (filtro == 1) {
            obtenerReportesEspera();
        } else if (filtro == 2) {
            obtenerReportesAtencion();
        } else if (filtro == 3) {
            obtenerReportesFinalizado();
        } else if (filtro == 4) {
            obtenerReportesCancelado();
        } else {

        }
        finish();
        wait();
        attention();
    })

    // Generar pdf de reporte
    $(document).on('click', '.pdf-button', function (e) {
        // Extraer folio del reporte
        let element = $(this)[0];
        let folio = $(element).attr('folio');
        window.location.href = "../reportes/solicitud.php?folio=" + folio;
    })

    // filtrar solicitudes
    $(document).on('click', '#filter-button', function (e) {
        e.preventDefault();
        let fechainicio = $("#fechainicio").val();
        let fechafin = $("#fechafin").val();
        let filtro = $("#where").val();
        console.log(filtro);

        if (fechainicio.length <= 0 || fechafin.length <= 0) {

            alert("Es necesario seleccionar fecha de inicio y fecha de fin");

        } else {
            if (Date.parse(fechafin) < Date.parse(fechainicio)) {

                alert("La fecha final debe ser mayor o igual a la fecha de inicio");

            } else {
                if (filtro == 1) {
                    filtrarReportesEspera(fechainicio, fechafin);
                } else if (filtro == 2) {
                    filtrarReportesAtencion(fechainicio, fechafin);
                } else if (filtro == 3) {
                    filtrarReportesFinalizado(fechainicio, fechafin);
                } else if (filtro == 4) {
                    filtrarReportesCancelado(fechainicio, fechafin);
                } else {

                }
            }
        }
        finish();
        wait();
        attention();
    })

    // Generar pdf de solicitudes filtradas
    $('#filter-pdf-button').on('click', function (e) {

        let fechainicio = $("#fechainicio").val();
        let fechafin = $("#fechafin").val();
        let filtro = $('#where').val();

        if (fechainicio.length <= 0 || fechafin.length <= 0) {
            e.preventDefault();
            alert("Es necesario seleccionar fecha de inicio y fecha de fin");

        } else {
            if (Date.parse(fechafin) < Date.parse(fechainicio)) {
                e.preventDefault();
                alert("La fecha final debe ser mayor o igual a la fecha de inicio");

            } else {

            }
        }

    })

});