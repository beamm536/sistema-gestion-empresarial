<script>
    import PagPrincipal from "./Vistas/principal.svelte";
    import Departamentos from "./Vistas/departamentos.svelte";
    import Jerarquiasdepartamentos from "./Vistas/jerarquiasdepartamentos.svelte";

    let vistaActual = "principal"; 
    let mostrarDropdown = false; // Controla si se muestra el desplegable

    function cambiarVista(vista) {
        vistaActual = vista;
        mostrarDropdown = false; // Cierra el dropdown al cambiar de vista
    }
</script>

<div class="app-empleados">
    <div class="app">
        <div class="navbar">
            <div class="menu">
                <a href="#" on:click|preventDefault={() => cambiarVista("principal")}>Empleados</a>

                <!-- Menú desplegable para Departamentos -->
                <div class="dropdown">
                    <a href="#" on:click|preventDefault={() => mostrarDropdown = !mostrarDropdown}>Departamentos</a>
                    {#if mostrarDropdown}
                        <div class="dropdown-content">
                            <a href="#" on:click|preventDefault={() => cambiarVista("departamentos")}>Departamentos</a>
                            <a href="#" on:click|preventDefault={() => cambiarVista("jerarquias")}>Jerarquía de Departamentos</a>
                        </div>
                    {/if}
                </div>

                <a href="#">Informes</a>
                <a href="#">Configuración</a>
            </div>
        </div>

        <!-- Mostrar el componente correspondiente -->
        {#if vistaActual === "principal"}
            <PagPrincipal />
        {:else if vistaActual === "departamentos"}
            <Departamentos />
        {:else if vistaActual === "jerarquias"}
            <Jerarquiasdepartamentos />
        {/if}
    </div>
</div>

<style>
    .navbar {
        background-color: #2c3e50;
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .menu {
        display: flex;
        gap: 15px;
        align-items: center; /* Alinea verticalmente los elementos del menú */
    }

    .menu a {
        color: white;
        text-decoration: none;
        padding: 8px;
        font-size: 16px;
        cursor: pointer;
    }

    .menu a:hover {
        background-color: #34495e;
        border-radius: 4px;
    }

    /* Estilo del dropdown */
    .dropdown {
        position: relative;
        display: inline-block; /* Asegura que el dropdown esté alineado correctamente con los demás enlaces */
    }

    .dropdown-content {
        position: absolute;
        background-color: #2c3e50;
        min-width: 180px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1;
        border-radius: 4px;
        margin-top: 8px;
    }

    .dropdown-content a {
        color: white;
        padding: 10px;
        display: block;
        text-decoration: none;
        font-size: 14px;
    }

    .dropdown-content a:hover {
        background-color: #34495e;
    }
</style>
