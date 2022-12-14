$(document).ready(function () {
    obtenerTipoProblema();

    // Mostrar todos los registros
    function obtenerTipoProblema() {
        $.ajax({
            url: '../bdd/scripttipoproblema.php?select',
            async: false,
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    template += `
                        <tr tipo="${persona.id}" class="selected" title="Presione para editar">
                            <td>${persona.nombre}</td>
                            <td>${persona.prioridad}</td>
                        </tr>
                    `
                    $('#table').html(template);
                })
            }
        });
    }

    function cerrarModal() {
        modal.style.display = "none";
    }

    $(document).on('click', '.close', function (e) {
        modal.style.display = "none";
    })

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Botón para abrir modal registrar 
    var modal = document.getElementById("modalTipo");
    $(document).on('click', '.add-button', function (e) {
        modal.style.display = "block";
        e.preventDefault();
        let template = '';
        template += `
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="nombre"><b>NOMBRE</b></label>
                        <input class="modal__item__in modal__item__txt" type="search" name="nombre" placeholder="Ingrese el nombre" id="nombre">     
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="planta"><b>PRIORIDAD</b></label>
                        <input class="modal__item__in modal__item__txt" type="number" name="planta" placeholder="Prioridad del reporte" id="prioridad">
                    </div>
                    `;
        $('#modal-body').html(template);
        $('#modal-body').show();

        template = '';
        template += `
        <div></div>
        <div>
            <button type="submit" class="btn-modal item__modal btn-add"> <i class="fa-regular fa-floppy-disk"></i> Guardar </button>
        </div>
            `;
        $('#modal-footer').html(template);
        $('#modal-footer').show();
    })

    // Registrar 
    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();
        let nombre = $('#nombre').val();
        let prioridad = $('#prioridad').val();
        if ((nombre.trim()).length <= 0 || (prioridad.trim()).length <= 0) {
            alert('Uno o varios campos estan vacios');
        } else {
            const postData = {
                nombre: nombre,
                prioridad: prioridad,
            };
            $.post('../bdd/scripttipoproblema.php', postData, function (response) {
                alert(response);
                obtenerTipoProblema();
                cerrarModal();
            });
        }

    })

    // Mostrar formulario para modificar en modal
    $(document).on('click', '.selected', function (e) {
        modal.style.display = "block";
        e.preventDefault();
        let element = $(this)[0];
        let id = $(element).attr('tipo');
        $.ajax({
            // dirección a la que se mandan los datos
            url: '../bdd/scripttipoproblema.php',
            async: false,
            // type: 'POST' para enviar | type: 'GET' para recibir
            type: 'POST',
            // datos que se envian
            data: { id },
            // si se obtiene respuesta
            success: function (response) {
                let personal = JSON.parse(response);
                let template = '';

                personal.forEach(persona => {
                    template += `
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt"  for="nombre"><b>NOMBRE</b></label>
                        <input class="modal__item__in modal__item__txt" type="search" name="nombre" placeholder="Ingrese el nombre" value="${persona.nombre}" id="nombre">     
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="planta"><b>PRIORIDAD</b></label>
                        <input class="modal__item__in modal__item__txt" type="number" name="planta" placeholder="Prioridad del reporte" value="${persona.prioridad}" id="prioridad">
                    </div>
                    `;
                });
                $('#modal-body').html(template);
                $('#modal-body').show();
                personal.forEach(persona => {
                    template = '';
                    template += `
                    <div>
                    <button type="submit" tipo="${persona.id}" class="btn-modal item__modal" id="btn-del"> <i class="fa-solid fa-trash-can"></i> Eliminar </button>
                    </div>
                    <div>
                    <button type="submit" tipo="${persona.id}" class="btn-modal item__modal" id="btn-mod"> <i class="fa-regular fa-floppy-disk"></i> Guardar </button>
                    </div>
                    `;
                    $('#modal-footer').html(template);
                    $('#modal-footer').show();
                });
            }
        });
    })

    // Enviar modificación al registro
    $(document).on('click', '#btn-mod', function (e) {
        e.preventDefault();
        let element = $(this)[0];
        let id_mod = $(element).attr('tipo');
        let nombre = $('#nombre').val();
        let prioridad = $('#prioridad').val();

        if ((id_mod.trim()).length <= 0 || (nombre.trim()).length <= 0 ||
            (prioridad.trim()).length <= 0) {
            alert('Uno o varios campos estan vacios');
        } else {
            if (confirm('¿Esta seguro de modificar el tipo de reporte?')) {
                const postData = {
                    id_mod: id_mod,
                    nombre_mod: nombre,
                    prioridad: prioridad,
                };
                $.post('../bdd/scripttipoproblema.php', postData, function (response) {
                    alert(response);
                    obtenerTipoProblema();
                    cerrarModal();
                });
            } else {

            }
            
        }
    })

    // Eliminar al registro
    $(document).on('click', '#btn-del', function (e) {
        e.preventDefault();
        let element = $(this)[0];
        let id_del = $(element).attr('tipo');
        if ((id_del.trim()).length <= 0) {
            alert('Error con el tipo de reporte');
        } else {
            if (confirm('¿Esta seguro de eliminar el tipo de reporte?')) {
                const postData = {
                    id_del: id_del,
                };
                $.post('../bdd/scripttipoproblema.php', postData, function (response) {
                    alert(response);
                    obtenerTipoProblema();
                    cerrarModal();
                });
            } else {

            }
           
        }
    })
});