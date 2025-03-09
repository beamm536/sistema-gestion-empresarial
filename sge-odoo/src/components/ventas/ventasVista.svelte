<script>
    import Principal from "./Vistas/Principal.svelte";
    import Inventario from "./Vistas/Inventario.svelte";
    import Ventas from "./Vistas/Ventas.svelte";

    let vistaActual = "principal";
    let mostrarDropdownProductos = false;

    function cambiarVista(vista) {
        vistaActual = vista;
        mostrarDropdownProductos = false;
    }

    function toggleDropdownProductos() {
        mostrarDropdownProductos = !mostrarDropdownProductos;
    }
</script>

<div class="app-empleados">
    <div class="app">
        <div class="navbar">
            <div class="menu">
                <button type="button" on:click={() => cambiarVista("principal")}>
                    Información General
                </button>

                <div class="dropdown">
                    <button type="button" on:click={toggleDropdownProductos}>
                        Ventas
                    </button>

                    {#if mostrarDropdownProductos}
                        <div class="dropdown-content">
                            <button type="button" on:click={() => cambiarVista("ventas")}>
                                Ver/hacer una venta
                            </button>
                        </div>
                    {/if}
                </div>

                <button type="button" on:click={() => cambiarVista("inventario")}>
                    Inventario
                </button>
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

    .menu button {
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        padding: 8px;
        cursor: pointer;
    }

    .menu button:hover {
        background-color: #34495e;
        border-radius: 4px;
    }

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

    .dropdown-content button {
        color: white;
        padding: 10px;
        display: block;
        text-decoration: none;
        font-size: 14px;
    }

    .dropdown-content button:hover {
        background-color: #34495e;
    }
</style>
