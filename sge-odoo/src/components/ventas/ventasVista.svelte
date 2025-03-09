<script>
    import Principal from "./Vistas/Principal.svelte";
    import Inventario from "./Vistas/Inventario.svelte";
    import Ventas from "./Vistas/Ventas.svelte";

    let vistaActual = "principal"; // Vista inicial
    let mostrarDropdownProductos = false;

    function cambiarVista(vista) {
        vistaActual = vista;
        mostrarDropdownProductos = false; // Cierra el dropdown de productos al cambiar de vista
    }
</script>

<div class="app-empleados">
    <div class="app">
        <nav class="navbar">
            <div class="navbar-container">
                <div class="menu">
                    <div class="menu-item" 
                         on:click={() => cambiarVista("principal")}
                         class:selected={vistaActual === "principal"}>
                        Información General
                    </div>
                    <div class="menu-item" 
                         on:click={() => cambiarVista("ventas")}
                         class:selected={vistaActual === "ventas"}>
                        Ventas
                    </div>
                    <div class="menu-item" 
                         on:click={() => cambiarVista("inventario")}
                         class:selected={vistaActual === "inventario"}>
                        Inventario
                    </div>
                </div>
            </div>
        </nav>

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
    /* Estilos del Navbar */
    .navbar {
        /*background-color: #f0f0f0; /* Fondo gris claro */
        padding: 10px 20px;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
    }

    .navbar-container {
        display: flex;
        justify-content: center; /* Centra la barra de navegación */
        align-items: center;
        width: 100%;
    }

    .menu {
        display: flex;
        width: 100%; /* Hace que el menú ocupe todo el ancho disponible */
        max-width: 1200px;
        gap: 0; /* Elimina el espacio entre los elementos */
    }

    .menu-item {
        flex: 1; /* Cada ítem ocupará un tercio del espacio disponible */
        display: flex;
        justify-content: center; /* Centra el texto dentro de cada ítem */
        align-items: center;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
        background-color: #d7d6d6; /* Fondo gris claro */
        color: #333; /* Texto gris oscuro */
        font-size: 16px;
        font-weight: 500;
        border: #c1c0c0 1px solid;
    }

    /* Estilo para la sección seleccionada */
    .menu-item.selected {
        background-color: #8A7BB7; /* Fondo morado para el ítem seleccionado */
        color: white; /* Texto blanco */
        
    }

    .menu-item:hover {
        background-color: #b9b7b7;
        color: white; /* Fondo gris más oscuro al pasar el mouse */
    }

    /* Ajustes para asegurar que el contenido no quede oculto detrás del navbar */
    .app {
        padding-top: 60px; /* Da espacio suficiente para que el navbar no tape el contenido */
    }

    /* Responsividad */
    @media (max-width: 768px) {
        .navbar-container {
            flex-direction: column;
            align-items: flex-start;
        }

        .menu {
            flex-direction: column;
            gap: 15px;
        }

        .menu-item {
            flex: none; /* Los ítems no se estiran en pantallas pequeñas */
            width: 100%; /* Asegura que cada ítem ocupe el 100% del ancho */
        }
    }
</style>
