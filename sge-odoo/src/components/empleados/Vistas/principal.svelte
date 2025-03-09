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
            online: false,
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
    let searchQuery = ""; // Variable para almacenar el texto de búsqueda

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

    // Filtrar empleados por departamento y texto de búsqueda
    $: empleadosFiltrados = empleadosActivos.filter(emp => {
        const matchesDepartamento = departamentoSeleccionado ? emp.departamento === departamentoSeleccionado : true;
        const matchesSearchQuery = emp.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || emp.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDepartamento && matchesSearchQuery;
    });

    let empleadoSeleccionado = null; // Variable para almacenar el empleado seleccionado

    function openPopup(emp) {
        empleadoSeleccionado = emp;
        document.getElementById("popup").style.display = "block";

        // Rellenar los campos del formulario con los datos del empleado seleccionado
        const nombreInput = document.getElementById("nombre");
        if (nombreInput && nombreInput instanceof HTMLInputElement) {
            nombreInput.value = emp.nombre;
        }
        
        // (Continúa con el resto de los campos como lo tenías)
    }

    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

</script>

<div class="app-empleados">
    <div class="app-content">
        <div class="sidebar">
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
                <!-- Barra de búsqueda -->
                <input 
                    type="text" 
                    class="search-bar" 
                    placeholder="Buscar..." 
                    bind:value={searchQuery} 
                />
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
