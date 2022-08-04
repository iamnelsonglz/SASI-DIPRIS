$(document).ready(function () {
    obtenerPersonal();

    // Mostrar todos los registros
    function obtenerPersonal() {
        let thead = '';
        $.ajax({
            url: '../bdd/scriptpersonal.php?select',
            async: false,
            type: 'GET',
            beforeSend: function (xhr) {
                $("#loadtabla").fadeIn("slow");
            },
            success: function (response) {
                $("#loadtabla").fadeOut("slow");
                thead += `
                <th>USUARIO</th>
                <th>NOMBRE</th>
                <th>PATERNO</th>
                <th>MATERNO</th>
                <th>CATEGORÍA</th>
                `;
                $('#header').html(thead);
                const personas = JSON.parse(response);
                let template = '';
                personas.forEach(persona => {
                    template += `
                        <tr user="${persona.username}" class="selected" title="Presione para editar">
                            <td>${persona.username}</td>
                            <td>${persona.nombre}</td>
                            <td>${persona.paterno}</td>
                            <td>${persona.materno}</td>
                            <td>${persona.categoria}</td>
                        </tr>
                    `
                    $('#table').html(template);
                })
            }
        });
    }

    function cerrarModal(){
        modal.style.display = "none";
    }

    $(document).on('click', '.close', function (e) {
        modal.style.display = "none";
    })

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Mostrar todos los departamentos
    function obtenerDepartamento() {
        $.ajax({
            url: '../bdd/scriptpersonal.php?depto',
            async: false,
            type: 'GET',
            success: function (response) {
                const personas = JSON.parse(response);
                let template = '<option value="0">Seleccione el departamento</option>';
                personas.forEach(persona => {
                    template += `
                        <option value="${persona.idDepartamento}">${persona.nombre}</option>
                    `
                    $('#departamento').html(template);
                })
            }
        });
    }

    // Mostrar todos los tipos
    function obtenerTipo() {
        $.ajax({
            url: '../bdd/scriptpersonal.php?tipo',
            async: false,
            type: 'GET',
            success: function (response) {
                const personas = JSON.parse(response);
                let template = '<option value="0">Seleccione la categoria </option>';
                personas.forEach(persona => {
                    template += `
                        <option value="${persona.id}">${persona.nombre}</option>
                    `
                    $('#tipo').html(template);
                })
            }
            
        });
        
    }

    // Botón para abrir modal registrar 
    var modal = document.getElementById("modalPersonal");
    $(document).on('click', '.add-button', function (e) {
        modal.style.display = "block";
        e.preventDefault();
        let template = '';
        template += `
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="username">Nombre de usuario</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="username" id="username">
                    </div>
                    <div class="pass modal__item__dos">
                        <div><label class="modal__item__in modal__item__txt" for="password">Contraseña</label></div>
                        <div class="modal__item__pass">
                        <div>
                        <input class="modal__item__in modal__item__txt" type="password" name="password" id="password">
                        </div>
                        <div>
                        <span class="modal__item__in modal__item__txt" id="show">Mostrar</span>
                        </div>
                        </div>
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="nombre">Nombre(s)</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="nombre" id="nombre">
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="paterno">Apellido paterno</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="paterno" id="paterno">
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="materno">Apellido materno</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="materno" id="materno">
                    </div>
                    <div></div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="departamento">Departamento</label>
                        <select class="modal__item__in modal__item__txt" name="departamento" id="departamento">
                            
                        </select>
                    </div>
                    <div>
                        <label class="modal__item__in modal__item__txt" for="tipo">Categoria de usuario</label>
                        <select class="modal__item__in modal__item__txt" name="tipo" id="tipo">

                        </select>
                    </div>
                `;
                $('#modal-body').html(template);
                $('#modal-body').show();
                obtenerDepartamento();
                obtenerTipo();

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
        let username = $('#username').val();
        let password = $('#password').val();
        let nombre = $('#nombre').val();
        let paterno = $('#paterno').val();
        let materno = $('#materno').val();
        let departamento = $('#departamento').val();
        let tipo = $('#tipo').val();

        if ((username.trim()).length <= 0 || (password.trim()).length <= 0 ||
            (nombre.trim()).length <= 0 || (paterno.trim()).length <= 0 || (materno.trim()).length <= 0 ||
            (departamento.trim()).length <= 0 || (tipo.trim()).length <= 0) {
            alert('Uno o varios campos estan vacios');
        } else {
            const postData = {
                username: username,
                password: password,
                nombre: nombre,
                paterno: paterno,
                materno: materno,
                departamento: departamento,
                tipo: tipo,
            };
            $.post('../bdd/scriptpersonal.php', postData, function (response) {
                alert(response);
                cerrarModal();
                obtenerPersonal();
            });
            
        }
        
    })

    // Mostrar formulario para modificar en modal
    $(document).on('click', '.selected', function (e) {
        modal.style.display = "block";
        e.preventDefault();
        let element = $(this)[0];
        let id = $(element).attr('user');
        $.ajax({
            // dirección a la que se mandan los datos
            url: '../bdd/scriptpersonal.php',
            async: false,
            // type: 'POST' para enviar | type: 'GET' para recibir
            type: 'POST',
            // datos que se envian
            data: { id },
            // si se obtiene respuesta
            success: function (response) {
                let personal = JSON.parse(response);
                let template = '';
                $('#form-modal').html(template);
                $('#form-modal').show();
                personal.forEach(persona => {
                    template += `
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="username">Nombre de usuario</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="username" readonly value="${persona.username}" id="username">
                    </div>
                    <div class="pass modal__item__dos">
                        <div>
                        <label class="modal__item__in modal__item__txt" for="password">Contraseña</label>
                        </div>
                        <div class="modal__item__pass">
                        <div>
                        <input class="modal__item__in modal__item__txt" type="password" name="password" value="${persona.password}" id="password">
                        </div>
                        <div>
                        <span class="modal__item__in modal__item__txt" id="show">Mostrar</span>
                        </div>
                        </div>
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="nombre">Nombre(s)</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="nombre" value="${persona.nombre}" id="nombre">
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="paterno">Apellido paterno</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="paterno" value="${persona.paterno}" id="paterno">
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="materno">Apellido materno</label>
                        <input class="modal__item__in modal__item__txt" type="text" name="materno" value="${persona.materno}" id="materno">
                    </div>
                    <div></div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="departamento">Departamento</label>
                        <select class="modal__item__in modal__item__txt" name="departamento" id="departamento">
                            <option value="${persona.iddepartamento}" selected>${persona.departamento}</option>
                        </select>
                    </div>
                    <div class="modal__item__dos">
                        <label class="modal__item__in modal__item__txt" for="tipo">Categoria de usuario</label>
                        <select class="modal__item__in modal__item__txt" name="tipo" id="tipo">
                            <option value="${persona.idtipo}" selected>${persona.tipo}</option>
                        </select>
                    </div>
                    `
                });
                $('#modal-body').html(template);
                $('#modal-body').show();
        
                let vtipo='';
                let vdepto='';
                personal.forEach(persona => {
                    template = '';
                    template += `
                    <div>
                    <button type="submit" user="${persona.username}" class="btn-modal item__modal" id="btn-del"> <i class="fa-solid fa-trash-can"></i> Eliminar </button>
                    </div>
                    <div>
                    <button type="submit" user="${persona.username}" class="btn-modal item__modal" id="btn-mod"> <i class="fa-regular fa-floppy-disk"></i> Guardar </button>
                    </div>
                    `;
                    
                });
                
                $('#modal-footer').html(template);
                $('#modal-footer').show();                 
            }
        });
    })

    $(document).on('click', '#tipo', function (e) {
        if(tipo.length <= 1){
            obtenerTipo();
        }else{

        }
    })

    $(document).on('click', '#departamento', function (e) {
        if(departamento.length <= 1){
            obtenerDepartamento();
        }else{

        }
    })

    // Enviar modificación al registro
    $(document).on('click', '#btn-mod', function (e) {
        e.preventDefault();
        let element = $(this)[0];
        let username_mod = $(element).attr('user');
        let password = $('#password').val();
        let nombre = $('#nombre').val();
        let paterno = $('#paterno').val();
        let materno = $('#materno').val();
        let departamento = $('#departamento').val();
        let tipo = $('#tipo').val();

        if ((username_mod.trim()).length <= 0 || (password.trim()).length <= 0 ||
            (nombre.trim()).length <= 0 || (paterno.trim()).length <= 0 || (materno.trim()).length <= 0 ||
            (departamento.trim()).length <= 0 || (tipo.trim()).length <= 0) {
            alert('Uno o varios campos estan vacios');
        } else {
            if (confirm('¿Esta seguro de modificar los datos del usuario?')) {
                const postData = {
                    username_mod: username_mod,
                    password: password,
                    nombre: nombre,
                    paterno: paterno,
                    materno: materno,
                    departamento: departamento,
                    tipo: tipo,
                };
                $.post('../bdd/scriptpersonal.php', postData, function (response) {
                    alert(response);
                    obtenerPersonal();
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
        let id_del = $(element).attr('user');
        if ((id_del.trim()).length <= 0) {
            alert('Error con el usuario');
        } else {
            if (confirm('¿Esta seguro de eliminar el usuario?')) {
                const postData = {
                    id_del: id_del,
                };
                $.post('../bdd/scriptpersonal.php', postData, function (response) {
                    alert(response);
                    obtenerPersonal();
                    cerrarModal();
                });
        
            }
        }
       
    })

    $(document).on('click', '#show', function (e) {
        const passwordInput = document.querySelector('#password');
        if (e.target.classList.contains('show')) {
            e.target.classList.remove('show');
            e.target.textContent = 'Ocultar';
            passwordInput.type = 'text';
        } else {
            e.target.classList.add('show');
            e.target.textContent = 'Mostrar';
            passwordInput.type = 'password';
        }
    });
});