$(document).ready(function () {
    obtenerDepartamentos();

    // Mostrar todos los registros
    function obtenerDepartamentos() {
        $.ajax({
            url: '../bdd/scriptdepartamento.php?select',
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
                        <tr folio="${persona.id}" class="selected" title="Presione para editar">
                            <td>${persona.nombre}</td>
                            <td>${persona.planta}</td>
                        </tr>
                    `
                    $('#table').html(template);
                })
            }
        });
    }

    function cerrarModal(){
        modal.style.display = "none";
        let template = '';
        $('#modal-body').html(template);
        $('#modal-body').show();
        $('#modal-footer').html(template);
        $('#modal-footer').show();
    }

    // Mostrar modal para agregar departamento
    var modal = document.getElementById("modalDepto");
    $(".add").click(function (e) {
        modal.style.display = "block";
        e.preventDefault();  
            let template = '';
            template += `
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="nombre"><b>NOMBRE</b></label>
                        <input class="modal__item__in modal__item__txt" type="search" name="nombre" placeholder="Ingrese el nombre" id="nombre">     
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="planta"><b>PLANTA</b></label>
                        <input class="modal__item__in modal__item__txt" type="number" name="planta" placeholder="Ingrese planta o piso" id="planta">
                    </div>
                    `;
            $('#modal-body').html(template);
            $('#modal-body').show();

            template = '';
            template += `
            <div></div>
            <div>
                <button type="submit" class="btn-modal item__modal btn-add"> <i class="fa-regular fa-floppy-disk"></i> Guardar</button>
            </div>
            `;
            $('#modal-footer').html(template);
            $('#modal-footer').show();
    })

    $(document).on('click', '.close', function (e) {
        modal.style.display = "none";
    })

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Registrar 
    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();
        let nombre = $('#nombre').val();
        let planta = $('#planta').val();
        if ((nombre.trim()).length <= 0 || (planta.trim()).length <= 0) {
            alert('Uno o varios campos estan vacios');
        } else {
            const postData = {
                nombre: nombre,
                planta: planta,
            };
            $.post('../bdd/scriptdepartamento.php', postData, function (response) {
                alert(response);
                obtenerDepartamentos();
                cerrarModal();
            });
            
        }
        
    })

    // Mostrar formulario para modificar en modal
    $(document).on('click', '.selected', function (e) {
        modal.style.display = "block";
        e.preventDefault();   
            let element = $(this)[0];
            let id = $(element).attr('folio');
            $.ajax({
                // direcci??n a la que se mandan los datos
                url: '../bdd/scriptdepartamento.php',
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
                            <label class="modal__item__in modal__item__txt" for="nombre"><b>NOMBRE</b></label>
                            <input class="modal__item__in modal__item__txt" type="search" name="nombre" placeholder="Ingrese el nombre" value="${persona.nombre}" id="nombre">     
                        </div>
                        <div class="modal__item__dos">
                            <label class="modal__item__in modal__item__txt" for="planta"><b>PLANTA</b></label>
                            <input class="modal__item__in modal__item__txt" type="number" name="planta" placeholder="Ingrese planta o piso" value="${persona.planta}" id="planta">
                        </div>
                        `;
                    });
                    $('#modal-body').html(template);
                    $('#modal-body').show();
                    personal.forEach(persona => {
                        template = '';
                        template += `
                        <div>
                            <button type="submit" folio="${persona.id}" class="btn-modal item__modal" id="btn-del"> <i class="fa-solid fa-trash-can"></i> Eliminar </button>
                        </div>
                        <div>
                            <button type="submit" folio="${persona.id}" class="btn-modal item__modal" id="btn-mod"> <i class="fa-regular fa-floppy-disk"></i> Guardar </button>
                        </div>
                        `;
                        $('#modal-footer').html(template);
                        $('#modal-footer').show();
                    });
                }
            });
    })

    // Enviar modificaci??n al registro
    $(document).on('click', '#btn-mod', function (e) {
        e.preventDefault();
        let element = $(this)[0];
        let id_mod = $(element).attr('folio');
        let nombre = $('#nombre').val();
        let planta = $('#planta').val();

        if ((id_mod.trim()).length <= 0 || (nombre.trim()).length <= 0 ||
            (planta.trim()).length <= 0 ) {
            alert('Uno o varios campos estan vacios');
        } else {
            if (confirm('??Esta seguro de modificar el departamento?')) {
                const postData = {
                    id_mod: id_mod,
                    nombre_mod: nombre,
                    planta: planta,
                };
                $.post('../bdd/scriptdepartamento.php', postData, function (response) {
                    alert(response);
                    obtenerDepartamentos();
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
        let id_del = $(element).attr('folio');
        if ((id_del.trim()).length <= 0) {
            alert('Error con el folio de departamento');
        } else {
            if (confirm('??Esta seguro de eliminar el departamento?')) {
                const postData = {
                    id_del: id_del,
                };
                $.post('../bdd/scriptdepartamento.php', postData, function (response) {
                    alert(response);
                    obtenerDepartamentos();
                    cerrarModal();
                });
                
            }else{

            }
            
        }
        
    })
});