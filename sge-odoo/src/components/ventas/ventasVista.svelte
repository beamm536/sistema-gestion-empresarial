<script>
    import Principal from "./Vistas/Principal.svelte";
    import Inventario from "./Vistas/Inventario.svelte";
    import Ventas from "./Vistas/Ventas.svelte";

    let vistaActual = "principal";
    let mostrarDropdownProductos = false; // Controla si se muestra el dropdown de empleados

    function cambiarVista(vista) {
        vistaActual = vista;
        mostrarDropdownProductos = false; // Cierra el dropdown de empleados al cambiar de vista
    }

    function toggleDropdownProductos() {
        mostrarDropdownProductos = !mostrarDropdownProductos;
    }
</script>

<div class="app-empleados">
    <div class="app">
        <div class="navbar">
            <div class="menu">
                <span role="button" tabindex="0" on:click={() => cambiarVista("principal")}>Informacion General</span>

                <span role="button" tabindex="0" on:click={() => cambiarVista("ventas")}>Ventas</span>

                <span role="button" tabindex="0" on:click={() => cambiarVista("inventario")}>Inventario</span>
            </div>
        </div>

        <!-- Mostrar el componente correspondiente -->
        {#if vistaActual === "principal"}
            <Principal />
        {:else if vistaActual === "ventas"}
            <Ventas />
        {:else if vistaActual === "inventario"}
            <Inventario />
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
        align-items: center;
    }

    .menu span {
        color: white;
        text-decoration: none;
        padding: 8px;
        font-size: 16px;
        cursor: pointer;
    }

    .menu span:hover {
        background-color: #34495e;
        border-radius: 4px;
    }

    /* Estilo del dropdown */
    .dropdown {
        position: relative;
        display: inline-block;
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

    .dropdown-content span {
        color: white;
        padding: 10px;
        display: block;
        text-decoration: none;
        font-size: 14px;
    }

    .dropdown-content span:hover {
        background-color: #34495e;
    }
</style>
