<!-- <script>
    import "../EmpleadosVista.css";
    import NuevoEmpleado from "./nuevoEmpleado.svelte";

    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
    ];

    let empleados2 = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
    ];
</script>

<div class="app-empleados">
    <div class="navbar">
        <div class="menu">
            <a href="#">Empleados</a>
            <a href="#">Departamentos</a>
            <a href="#">Informes</a>
            <a href="#">Configuración</a>
        </div>
    </div>

    <div class="app-content">
        <div class="sidebar">
            <button>Nuevo</button>
            
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li><strong>Todos</strong></li>
                <li>Administración (1)</li>
            </ul>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." />
            </div>

            <div class="empleados">
                {#each empleados as emp}
                    <div class="empleado-card">
                        <div class="icon">{emp.inicial}</div>
                        <div>
                            <strong>{emp.nombre}</strong>
                            <p>{emp.email}</p>
                        </div>
                        {#if emp.online}
                            <div class="status"></div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div> -->
<!--
<script>
    import "../EmpleadosVista.css";
    import NuevoEmpleado from "./nuevoEmpleado.svelte";

    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
    ];

    let empleados2 = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
    ];

    let empleadosActivos = empleados; // Inicialmente, se usa la lista empleados

    function toggleEmpleados() {
        empleadosActivos = empleadosActivos === empleados ? empleados2 : empleados;
    }
</script>

<div class="app-empleados">
    <div class="navbar">
        <div class="menu">
            <a href="#">Empleados</a>
            <a href="#">Departamentos</a>
            <a href="#">Informes</a>
            <a href="#">Configuración</a>
        </div>
    </div>

    <div class="app-content">
        <div class="sidebar">
            <button on:click={toggleEmpleados}>Nuevo</button>
            
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li><strong>Todos</strong></li>
                <li>Administración (1)</li>
            </ul>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." />
            </div>

            <div class="empleados">
                {#each empleadosActivos as emp}
                    <div class="empleado-card">
                        <div class="icon">{emp.inicial}</div>
                        <div>
                            <strong>{emp.nombre}</strong>
                            <p>{emp.email}</p>
                        </div>
                        {#if emp.online}
                            <div class="status"></div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
-->


<script>
    import "../EmpleadosVista.css";
    import NuevoEmpleado from "./nuevoEmpleado.svelte";

    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
    ];

    let empleados2 = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
        {
            nombre: "Juan",
            email: "juan@gmail.com",
            departamento: "Ventas",
            inicial: "J",
            online: true,
        },
    ];

    let empleadosActivos = [...empleados]; // Usamos una copia de empleados al principio
    let departamentoSeleccionado = ""; // Variable para el filtro de departamento

    // Función para alternar entre listas de empleados
    function toggleEmpleados() {
        // Alternamos entre empleados y empleados2
        empleadosActivos = empleadosActivos.length === empleados.length ? [...empleados2] : [...empleados];
        openPopup();
    }

    function handleSubmit(ev){
        ev.preventDefault()
        closePopup()
    }
    // Función para contar empleados por departamento
    function countEmpleadosByDepartamento() {
        const counts = {};
        empleadosActivos.forEach(emp => {
            counts[emp.departamento] = (counts[emp.departamento] || 0) + 1;
        });
        return counts;
    }

    // Declaración reactiva para actualizar departamentoCounts cuando empleadosActivos cambie
    $: departamentoCounts = countEmpleadosByDepartamento();

    // Filtrar empleados por departamento seleccionado
    $: empleadosFiltrados = departamentoSeleccionado
        ? empleadosActivos.filter(emp => emp.departamento === departamentoSeleccionado)
        : empleadosActivos;

         //     function openPopup() {
    //     document.getElementById("popup").style.display = "block";
    // }

    let empleadoSeleccionado = null; // Variable para almacenar el empleado seleccionado

function openPopup(emp) {
    empleadoSeleccionado = emp; // Asignar el empleado seleccionado
    document.getElementById("popup").style.display = "block"; // Mostrar el popup

    // Rellenar los campos del formulario con los datos del empleado seleccionado
    const nombreInput = document.getElementById("nombre");
    if (nombreInput && nombreInput instanceof HTMLInputElement) {
        nombreInput.value = emp.nombre;
    }

    const tituloInput = document.getElementById("titulo");
    if (tituloInput && tituloInput instanceof HTMLInputElement) {
        tituloInput.value = emp.titulo || "Jefaza";  // Si el título no está en el objeto, dejarlo vacío
    }

    const correoInput = document.getElementById("correo");
    if (correoInput && correoInput instanceof HTMLInputElement) {
        correoInput.value = emp.email;
    }

    const telefonoInput = document.getElementById("telefono");
    if (telefonoInput && telefonoInput instanceof HTMLInputElement) {
        telefonoInput.value = emp.telefono || "123456789";  // Asegúrate de que tenga valor o dejes vacío si no
    }

    const departamentoInput = document.getElementById("departamento");
    if (departamentoInput && departamentoInput instanceof HTMLInputElement) {
        departamentoInput.value = emp.departamento;
    }

    const puestoInput = document.getElementById("puesto");
    if (puestoInput && puestoInput instanceof HTMLInputElement) {
        puestoInput.value = emp.puesto || "Administrador";  // Lo mismo para el puesto
    }

    const gerenteInput = document.getElementById("gerente");
    if (gerenteInput && gerenteInput instanceof HTMLInputElement) {
        gerenteInput.value = emp.gerente || "-";
    }

    const mentorInput = document.getElementById("mentor");
    if (mentorInput && mentorInput instanceof HTMLInputElement) {
        mentorInput.value = emp.mentor || "-";
    }

    // Sección de Información de trabajo
    const horasInput = document.getElementById("horas");
    if (horasInput && horasInput instanceof HTMLInputElement) {
        horasInput.value = emp.horas || "60";  // Si no tiene horas, dejar vacío
    }

    const ubicacionInput = document.getElementById("ubicacion");
    if (ubicacionInput && ubicacionInput instanceof HTMLInputElement) {
        ubicacionInput.value = emp.ubicacion || "Oficinas";  // Si no tiene ubicación, dejar vacío
    }

    // Sección de Información privada
    const direccionInput = document.getElementById("direccion");
    if (direccionInput && direccionInput instanceof HTMLInputElement) {
        direccionInput.value = emp.direccion || "Casa d Beaaa";  // Si no tiene dirección, dejar vacío
    }

    const dniInput = document.getElementById("dni");
    if (dniInput && dniInput instanceof HTMLInputElement) {
        dniInput.value = emp.dni || "12345678Z";  // Si no tiene DNI, dejar vacío
    }

    const generoInput = document.getElementById("genero");
    if (generoInput && generoInput instanceof HTMLInputElement) {
        generoInput.value = emp.genero || "Mujer";  // Si no tiene género, dejar vacío
    }

    const fechaNacimientoInput = document.getElementById("fecha-nacimiento");
    if (fechaNacimientoInput && fechaNacimientoInput instanceof HTMLInputElement) {
        fechaNacimientoInput.value = emp.fechaNacimiento || "16/03/2005";  // Si no tiene fecha de nacimiento, dejar vacío
    }
}

    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

       
// Espera a que el DOM se haya cargado completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Función para abrir el popup
    

    // Función para cerrar el popup
    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

    // Función para alternar la visibilidad de las secciones
    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section.style.display === "block") {
            section.style.display = "none";
        } else {
            section.style.display = "block";
        }
    }

    // Conectar los botones con sus respectivas funciones
    document.getElementById("close-btn").addEventListener("click", closePopup);
    document.getElementById("expand-curriculum").addEventListener("click", () => toggleSection("curriculum"));
    document.getElementById("expand-trabajo").addEventListener("click", () => toggleSection("informacion-trabajo"));
    document.getElementById("expand-privada").addEventListener("click", () => toggleSection("informacion-privada"));

    // Abrir el popup automáticamente 1 segundo después de que la página cargue
    //setTimeout(openPopup, 1000);
});

</script>

<div class="app-empleados">
    <!--<div class="navbar">
        <div class="menu">
            <a href="#">Empleados</a>
            <a href="#">Departamentos</a>
            <a href="#">Informes</a>
            <a href="#">Configuración</a>
        </div>
    </div>-->

    <div class="app-content">
        <div class="sidebar">
            <!-- Botón para cambiar entre empleados -->
            <button on:click={toggleEmpleados}>Nuevo</button>
            
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li><strong on:click={() => departamentoSeleccionado = ""}>Todos</strong></li>
                {#each Object.entries(departamentoCounts) as [departamento, count]}
                    <li on:click={() => departamentoSeleccionado = departamento}>
                        {departamento} 
                    </li>
                {/each}
            </ul>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." />
            </div>

            <div class="empleados">
                {#each empleadosFiltrados as emp}
                <div class="empleado-card" on:click={() => openPopup(emp)}>
                    <div class="icon">{emp.inicial}</div>
                    <div>
                        <strong>{emp.nombre}</strong>
                        <p>{emp.email}</p>
                    </div>
                    {#if emp.online}
                        <div class="status"></div>
                    {/if}
                </div>
            {/each}
            </div>
        </div>
    </div>
</div>




<div id="popup" class="popup">
    <div class="popup-content">
        <span id="close-btn" class="close-btn">&times;</span>
        <h2>Formulario de Empleado</h2>
        <form id="employee-form" on:submit={handleSubmit}>
            <!-- Información general -->
            <div class="form-section">
                <label for="nombre">Nombre de empleado:</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="titulo">Título de trabajo:</label>
                <input type="text" id="titulo" name="titulo" required>

                <label for="correo">Correo electrónico:</label>
                <input type="email" id="correo" name="correo" required>

                <label for="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" required>

                <label for="departamento">Departamento:</label>
                <input type="text" id="departamento" name="departamento" required>

                <label for="puesto">Puesto de trabajo:</label>
                <input type="text" id="puesto" name="puesto" required>

                <label for="gerente">Gerente:</label>
                <input type="text" id="gerente" name="gerente" required>

                <label for="mentor">Mentor:</label>
                <input type="text" id="mentor" name="mentor" required>
            </div>

            <!-- Sección Curriculum -->
            <div class="form-section">
                <button type="button" class="expand-btn" id="expand-curriculum">Currículum</button>
                <div class="expandable" id="curriculum">
                    <label for="cv">Sube tu CV:</label>
                    <input type="file" id="cv" name="cv">
                </div>
            </div>

            <!-- Sección Información de trabajo -->
            <div class="form-section">
                <button type="button" class="expand-btn" id="expand-trabajo">Información de trabajo</button>
                <div class="expandable" id="informacion-trabajo">
                    <label for="horas">Horas laborales/semana:</label>
                    <input type="number" id="horas" name="horas" required>

                    <label for="ubicacion">Ubicación de trabajo:</label>
                    <input type="text" id="ubicacion" name="ubicacion" required>
                </div>
            </div>

            <!-- Sección Información privada -->
            <div class="form-section">
                <button type="button" class="expand-btn" id="expand-privada">Información privada</button>
                <div class="expandable" id="informacion-privada">
                    <label for="direccion">Dirección privada:</label>
                    <input type="text" id="direccion" name="direccion" required>

                    <label for="dni">DNI:</label>
                    <input type="text" id="dni" name="dni" required>

                    <label for="genero">Género:</label>
                    <select id="genero" name="genero" required>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <label for="fecha-nacimiento">Fecha de nacimiento:</label>
                    <input type="date" id="fecha-nacimiento" name="fecha-nacimiento" required>
                </div>
            </div>

            <button type="submit">Enviar</button>
        </form>
    </div>
</div>

<style>
    /* Estilos generales del popup */
/* Estilos generales del popup */
.popup {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 50px;
    box-sizing: border-box;
}

.popup-content {
    background-color: white;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 600px;
    box-sizing: border-box;
    overflow-y: auto;
    height: 80%;
}

.close-btn {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 25px;
    cursor: pointer;
}

.close-btn:hover,
.close-btn:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

/* Estilos de formulario */
form {
    display: flex;
    flex-direction: column;
}

.form-section {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input, select {
    padding: 8px;
    margin: 5px 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Estilos de botones */
button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

button:hover {
    background-color: #45a049;
}

/* Secciones desplegables */
.expand-btn {
    background-color: #f0f0f0;
    border: none;
    padding: 10px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
}

.expandable {
    display: none;
    margin-top: 10px;
}

.expandable input {
    width: 100%;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .popup-content {
        width: 95%;
        padding: 15px;
    }

    .close-btn {
        font-size: 24px;
        top: 5px;
        right: 15px;
    }

    button {
        padding: 8px 12px;
    }

    .expand-btn {
        font-size: 14px;
    }
}

</style>
<!--
<script>
  import { createEventDispatcher } from "svelte";
    import "../EmpleadosVista.css";
    import NuevoEmpleado from "./nuevoEmpleado.svelte";

    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
    ];

    let empleados2 = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
        {
            nombre: "Juan",
            email: "juan@gmail.com",
            departamento: "Ventas",
            inicial: "J",
            online: true,
        },
    ];

    let empleadosActivos = [...empleados]; // Usamos una copia de empleados al principio
    let departamentoSeleccionado = ""; // Variable para el filtro de departamento

    // Función para alternar entre listas de empleados
    function toggleEmpleados() {
        // Alternamos entre empleados y empleados2
        empleadosActivos = empleadosActivos.length === empleados.length ? [...empleados] : [...empleados];
    }

    // Función para contar empleados por departamento
    function countEmpleadosByDepartamento() {
        const counts = {};
        empleadosActivos.forEach(emp => {
            counts[emp.departamento] = (counts[emp.departamento] || 0) + 1;
        });
        return counts;
    }

    // Declaración reactiva para actualizar departamentoCounts cuando empleadosActivos cambie
    $: departamentoCounts = countEmpleadosByDepartamento();

    // Filtrar empleados por departamento seleccionado
    $: empleadosFiltrados = departamentoSeleccionado
        ? empleadosActivos.filter(emp => emp.departamento === departamentoSeleccionado)
        : empleadosActivos;

    // Emitir el evento para cambiar el estado en el componente padre
    function cambiarANuevoEmpleado() {
        // Se emite el evento para cambiar el estado en el componente padre
        dispatch('toggleNuevoEmpleado');
    }

    const dispatch = createEventDispatcher();
</script>

<div class="app-empleados">
    
    <!- <div class="navbar">
        <div class="menu">
            <!- Al hacer clic en "Empleados", se asegura que PagPrincipal se muestre ->
            <a href="#">Empleados</a>
            <a href="#">Departamentos</a>
            <a href="#">Informes</a>
            <a href="#">Configuración</a>
        </div></div> -->
<!--


EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    <div class="app-content">
        <div class="sidebar">
            <!- Botón para cambiar entre empleados --
            <button on:click={cambiarANuevoEmpleado}>Nuevo</button>
            
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li class:selected={departamentoSeleccionado === ""} on:click={() => departamentoSeleccionado = ""}>Todos</li>
                {#each Object.entries(departamentoCounts) as [departamento, count]}
                    <li class:selected={departamentoSeleccionado === departamento} on:click={() => departamentoSeleccionado = departamento}>
                        {departamento} 
                    </li>
                {/each}
            </ul>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." />
            </div>

            <div class="empleados">
                {#each empleadosFiltrados as emp}
                    <div class="empleado-card">
                        <div class="icon">{emp.inicial}</div>
                        <div>
                            <strong>{emp.nombre}</strong>
                            <p>{emp.email}</p>
                        </div>
                        {#if emp.online}
                            <div class="status"></div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- El código del popup sigue igual -->

<!--
<script>
  import { createEventDispatcher } from "svelte";
    import "../EmpleadosVista.css";
    import NuevoEmpleado from "./nuevoEmpleado.svelte";

    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
    ];

    let empleados2 = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
        {
            nombre: "Juan",
            email: "juan@gmail.com",
            departamento: "Ventas",
            inicial: "J",
            online: true,
        },
    ];

    let empleadosActivos = [...empleados]; // Usamos una copia de empleados al principio
    let departamentoSeleccionado = ""; // Variable para el filtro de departamento

    // Función para alternar entre listas de empleados
    function toggleEmpleados() {
        // Alternamos entre empleados y empleados2
        empleadosActivos = empleadosActivos.length === empleados.length ? [...empleados] : [...empleados];
    }

    // Función para contar empleados por departamento
    function countEmpleadosByDepartamento() {
        const counts = {};
        empleadosActivos.forEach(emp => {
            counts[emp.departamento] = (counts[emp.departamento] || 0) + 1;
        });
        return counts;
    }

    // Declaración reactiva para actualizar departamentoCounts cuando empleadosActivos cambie
    $: departamentoCounts = countEmpleadosByDepartamento();

    // Filtrar empleados por departamento seleccionado
    $: empleadosFiltrados = departamentoSeleccionado
        ? empleadosActivos.filter(emp => emp.departamento === departamentoSeleccionado)
        : empleadosActivos;

    // Emitir el evento para cambiar el estado en el componente padre
    function cambiarANuevoEmpleado() {
        // Se emite el evento para cambiar el estado en el componente padre
        dispatch('toggleNuevoEmpleado');
    }

    const dispatch = createEventDispatcher();
</script>

<div class="app-empleados">
    
    <!- <div class="navbar">
        <div class="menu">
            <!- Al hacer clic en "Empleados", se asegura que PagPrincipal se muestre ->
            <a href="#">Empleados</a>
            <a href="#">Departamentos</a>
            <a href="#">Informes</a>
            <a href="#">Configuración</a>
        </div></div> -->
<!--


EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    <div class="app-content">
        <div class="sidebar">
            <!- Botón para cambiar entre empleados --
            <button on:click={cambiarANuevoEmpleado}>Nuevo</button>
            
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li class:selected={departamentoSeleccionado === ""} on:click={() => departamentoSeleccionado = ""}>Todos</li>
                {#each Object.entries(departamentoCounts) as [departamento, count]}
                    <li class:selected={departamentoSeleccionado === departamento} on:click={() => departamentoSeleccionado = departamento}>
                        {departamento} 
                    </li>
                {/each}
            </ul>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." />
            </div>

            <div class="empleados">
                {#each empleadosFiltrados as emp}
                    <div class="empleado-card">
                        <div class="icon">{emp.inicial}</div>
                        <div>
                            <strong>{emp.nombre}</strong>
                            <p>{emp.email}</p>
                        </div>
                        {#if emp.online}
                            <div class="status"></div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
-->
