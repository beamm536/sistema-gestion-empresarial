<script>
    import PagPrincipal from "./Vistas/principal.svelte";
    import NuevoEmpleado from "./Vistas/nuevoEmpleado.svelte";

    let mostrarNuevoEmpleado = false;
    let mostrarPagPrincipal = true;
    let mostrarDropdown = false; // Variable para controlar la visibilidad del dropdown
</script>

<div class="app-empleados">
    <div class="app">
        <div class="navbar">
            <div class="menu">
                <!-- Dropdown de "Empleados" -->
                <div class="dropdown">
                <a href="#">Empleados </a>
                <a href="#">Departamentos</a>
                <a href="#">Informes</a>
                <a href="#">Configuración</a>
            </div>
        </div>

    </div>
        <!-- Condicional para mostrar el componente según la variable 'mostrarPagPrincipal' -->
        {#if mostrarPagPrincipal}
            <PagPrincipal />
        {:else if mostrarNuevoEmpleado}
            <NuevoEmpleado />
        {/if}
    </div>
</div>

<style>
    .dropdown {
        position: relative;
    }
    .dropdown-menu {
        position: absolute;
        background-color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 10px;
        margin-top: 5px;
        border-radius: 4px;
        min-width: 160px;
    }
    .dropdown-menu a {
        display: block;
        padding: 8px;
        text-decoration: none;
    }
    .dropdown-menu a:hover {
        background-color: #f0f0f0;
    }
</style>
