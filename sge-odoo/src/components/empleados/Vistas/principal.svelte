<script>
    /*import "../EmpleadosVista.css";*/
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
    let empleadoSeleccionado = null; // Variable para el empleado seleccionado
    let departamentoSeleccionado = ""; // Variable para el filtro de departamento
    let searchText = ""; // Variable para el texto de búsqueda

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

    // Filtrar empleados por departamento seleccionado y texto de búsqueda
    $: empleadosFiltrados = empleadosActivos
        .filter(emp => 
            (departamentoSeleccionado ? emp.departamento === departamentoSeleccionado : true) &&
            (emp.nombre.toLowerCase().includes(searchText.toLowerCase()) || 
             emp.email.toLowerCase().includes(searchText.toLowerCase()))
        );

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

<!-- Contenedor padre -->
<div class="app-empleados">
  
    <!-- Sidebar -->
    <div class="sidebar">
      <button class="nuevo" on:click={toggleEmpleados}>Nuevo Empleado</button>
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
  
    <!-- Contenido principal -->
    <div class="main">
        <div class="header">
          <input type="text" class="search-bar" placeholder="Buscar..." bind:value={searchText} />
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
            <div class="form-section2">
                <button type="button" class="expand-btn" id="expand-curriculum">  ▼ Currículum</button>
                <div class="expandable" id="curriculum">
                    <label for="cv">Sube tu CV:</label>
                    <input type="file" id="cv" name="cv">
                </div>
            </div>

            <!-- Sección Información de trabajo -->
            <div class="form-section2">
                <button type="button" class="expand-btn" id="expand-trabajo">   ▼ Información de trabajo</button>
                <div class="expandable" id="informacion-trabajo">
                    <label for="horas">Horas laborales/semana:</label>
                    <input type="number" id="horas" name="horas" required>

                    <label for="ubicacion">Ubicación de trabajo:</label>
                    <input type="text" id="ubicacion" name="ubicacion" required>
                </div>
            </div>

            <!-- Sección Información privada -->
            <div class="form-section2">
                <button type="button" class="expand-btn" id="expand-privada">  ▼ Información privada </button>
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
/* Reset y configuración global */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #fff; /* Fondo blanco */
  color: #333; /* Texto en gris oscuro */
}

/* Contenedor principal */
.app-empleados {
   margin-top: -70px;
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  background-color: #f5f5f5; /* Gris muy claro */
  width: 250px;
  padding: 20px;
  border-right: 2px solid #ddd;
  padding-top: 130px;
}

button, .nuevo{
    padding: 8px 16px;
        background-color: #8A7BB7;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
}
button, .nuevo:hover{
    background-color: #786aa0;
}
.sidebar h3 {
    margin-top: 30px;
  color: #8A7BB7; /* Color de acento */
  margin-bottom: 15px;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
}

.sidebar li:hover {
  background-color: #ddd;
}

/* Área principal */
.main {
   
  flex: 1;
  background-color: #fff;
  padding: 20px;
}

/* Barra de búsqueda en el header */
.header .search-bar {
   margin-top: 100px;
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Tarjetas de empleados */
.empleados {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.empleado-card {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.empleado-card:hover {
  background-color: #eee;
}

.empleado-card .icon {
  background-color: #8A7BB7;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 15px;
}

.empleado-card strong {
  display: block;
  margin-bottom: 5px;
}

/* Popup */
.popup {
  display: none;
  position: fixed;
  z-index: 9999; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 900px; /* Aumenta el ancho máximo del popup */
  max-height: 90%;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 2px solid #8A7BB7; /* Borde de acento */
  box-sizing: border-box;
}

.popup-content h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* Botón de cierre */
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #8A7BB7;
  cursor: pointer;
}

/* Estilos generales del formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Mayor separación entre secciones */

}

/* Organización de cada sección del formulario con grid */
.form-section {
  display: grid;
  grid-template-columns: 30% 70%; /* Etiqueta e input en dos columnas */
  gap: 10px 15px;
  align-items: center;
}

/* Estilo para las etiquetas */
.form-section label {
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
  color: #333;
}

/* Estilo para los campos de entrada y select */
.form-section input,
.form-section select {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
 .form-section2, button{
    width: 100%;
 }
/* Elementos que deben ocupar todo el ancho (como botones de expansión y el botón de enviar) */
.form-section2 > .expand-btn,
.form-section2 > button {
  grid-column: 1 / -1;
  text-align: left;
  background-color: #e0e0e0; /* Gris medio para el botón de expansión */
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
.form-section2 > .expand-btn:hover,
.form-section2 > button:hover{
    background-color: #8A7BB7;
}

/* Organización de las secciones expandibles con grid */
.expandable {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 10px 15px;
  align-items: center;
  padding: 10px 0;
}

.expandable input,
.expandable select {
  width: 100%;
}
.expandable {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacio entre cada bloque label+input */
  padding: 10px 0;
}

.expandable label {
  text-align: left; 
  font-weight: bold;
  color: #333;
}

.expandable input,
.expandable select {
  width: 100%; /* Para que ocupen todo el ancho disponible */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}


/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    padding: 15px;
  }
  
  .empleados {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .popup-content {
    width: 95%;
    padding: 15px;
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
