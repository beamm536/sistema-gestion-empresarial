<script>
  import Principal from "../inventario/Vistas/principal.svelte";
  import AñadirProducto from "../inventario/Vistas/AñadirProductos.svelte";

  let vistaActual = "principal";
  let mostrarDropdownProductos = false;

  function cambiarVista(vista) {
      vistaActual = vista;
      mostrarDropdownProductos = false; // Cierra el dropdown de productos al cambiar de vista
  }

  function toogleDropdownProductos() {
      mostrarDropdownProductos = !mostrarDropdownProductos;
  }
</script>

<div class="app-empleados">
  <div class="app">
      <!-- Título encima del Navbar -->
      <div class="titulo">
          Módulo de Inventario
      </div>

      <nav class="navbar">
          <div class="navbar-container">
              <div class="menu">
                  <div class="menu-item" 
                       on:click={() => cambiarVista("principal")}
                       class:selected={vistaActual === "principal"}>
                      Información General
                  </div>
                  <div class="menu-item" 
                       on:click={() => cambiarVista("añadir-producto")}
                       class:selected={vistaActual === "añadir-producto"}>
                      Ver/añadir Productos
                  </div>
              </div>
          </div>
      </nav>

      <!-- Mostrar el componente correspondiente -->
      {#if vistaActual === "principal"}
          <Principal />
      {:else if vistaActual === "añadir-producto"}
          <AñadirProducto />
      {/if}
  </div>
</div>

<style>
  /* Estilos para el texto encima del Navbar */
  .titulo {
      text-align: center;
      padding: 10px 0;
      background-color: #8A7BB7; /* Fondo morado */
      color: white; /* Texto blanco */
      font-size: 24px;
      font-weight: 600;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1100;
  }

  /* Estilos del Navbar */
  .navbar {
      padding: 8px 15px;
      position: fixed;
      width: 100%;
      top: 60px; /* Espacio debajo del título */
      left: 0;
      z-index: 1000;
  }

  .navbar-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
  }

  .menu {
      display: flex;
      width: 100%;
      max-width: 1200px;
      gap: 0;
  }

  .menu-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 8px 12px; /* Reducir padding */
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
      background-color: #d7d6d6;
      color: #333;
      font-size: 18px; /* Reducir tamaño de fuente */
      font-weight: 500;
      border: #c1c0c0 1px solid;
  }

  .menu-item.selected {
      background-color: #8A7BB7;
      color: white;
  }

  .menu-item:hover {
      background-color: #b9b7b7;
      color: white;
  }

  /* Ajustes para asegurar que el contenido no quede oculto detrás del navbar */
  .app {
      /*padding-top: 120px;  Da espacio suficiente para el título y el navbar */
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
          flex: none;
          width: 100%;
      }
  }
</style>
