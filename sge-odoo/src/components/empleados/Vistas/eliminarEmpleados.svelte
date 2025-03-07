<script>
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

    let empleadosActivos = [...empleados2]; // Usamos empleados2 al principio
    let departamentoSeleccionado = ""; // Variable para el filtro de departamento

    // Función para alternar entre listas de empleados
    function toggleEmpleados() {
        empleadosActivos = empleadosActivos.length === empleados.length ? [...empleados2] : [...empleados];
    }

    // Función para vaciar la papelera y cambiar la lista de empleados
    function vaciarPapelera() {
        empleadosActivos = [...empleados];
    }

    $: departamentoCounts = countEmpleadosByDepartamento();

    // Filtrar empleados por departamento seleccionado
    $: empleadosFiltrados = departamentoSeleccionado
        ? empleadosActivos.filter(emp => emp.departamento === departamentoSeleccionado)
        : empleadosActivos;

    // Función para contar empleados por departamento
    function countEmpleadosByDepartamento() {
        const counts = {};
        empleadosActivos.forEach(emp => {
            counts[emp.departamento] = (counts[emp.departamento] || 0) + 1;
        });
        return counts;
    }
</script>

<div class="app-empleados">
    <div class="app-content">
        <div class="sidebar">
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li><strong on:click={() => departamentoSeleccionado = ""}>Todos</strong></li>
                {#each Object.entries(departamentoCounts) as [departamento, count]}
                    <li on:click={() => departamentoSeleccionado = departamento}>
                        {departamento} ({count})
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
                        <!-- Papelera -->
                        <div class="papelera" on:click={vaciarPapelera}>
                            🗑️
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .app-content {
        display: flex;
        justify-content: space-between;
    }

    .sidebar {
        width: 250px;
        padding: 10px;
        background-color: #f4f4f4;
    }

    .sidebar ul {
        list-style-type: none;
        padding: 0;
    }

    .sidebar li {
        padding: 10px;
        cursor: pointer;
    }

    .sidebar li:hover {
        background-color: #ddd;
    }

    .main {
        flex: 1;
        padding: 10px;
    }

    .empleado-card {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .empleado-card .icon {
        font-size: 30px;
        font-weight: bold;
        margin-right: 10px;
    }

    .empleado-card .status {
        width: 10px;
        height: 10px;
        background-color: green;
        border-radius: 50%;
    }

    .empleado-card .papelera {
        margin-left: auto;
        cursor: pointer;
        font-size: 20px;
        padding: 5px;
        border-radius: 50%;
    }

    .empleado-card .papelera:hover {
        background-color: red;
        color: white;
    }
</style>
