<script>
    import "./EmpleadosVista.css";

    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
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
</div>
