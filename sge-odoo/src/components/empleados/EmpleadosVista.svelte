<script>
  import PagPrincipal from "./Vistas/principal.svelte";
  import EliminarEmpleados from "./Vistas/eliminarEmpleados.svelte";
  import Departamentos from "./Vistas/departamentos.svelte";
  import Jerarquiasdepartamentos from "./Vistas/jerarquiasdepartamentos.svelte";
  import Informes from "./Vistas/informes.svelte";

  let vistaActual = "principal";

  function cambiarVista(vista) {
    vistaActual = vista;
  }
</script>

<div class="app-empleados">
  <div class="app">
    <!-- Título fijo en la parte superior -->
    <div class="titulo">
      Módulo de Empleados
    </div>

    <!-- Navbar fijo debajo del título -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="menu">
          <div 
            class="menu-item" 
            on:click={() => cambiarVista("principal")}
            class:selected={vistaActual === "principal"}>
            Ver/añadir empleados
          </div>
          <div 
            class="menu-item" 
            on:click={() => cambiarVista("eliminar-empleados")}
            class:selected={vistaActual === "eliminar-empleados"}>
            Eliminar empleados
          </div>
          <div 
            class="menu-item" 
            on:click={() => cambiarVista("departamentos")}
            class:selected={vistaActual === "departamentos"}>
            Departamentos
          </div>
          <div 
            class="menu-item" 
            on:click={() => cambiarVista("jerarquias")}
            class:selected={vistaActual === "jerarquias"}>
            Jerarquía de Departamentos
          </div>
          <div 
            class="menu-item" 
            on:click={() => cambiarVista("informes")}
            class:selected={vistaActual === "informes"}>
            Informes
          </div>
        </div>
      </div>
    </nav>

    <!-- Espacio para que el contenido no quede oculto detrás del navbar -->
    <div class="contenido">
      {#if vistaActual === "principal"}
        <PagPrincipal />
      {:else if vistaActual === "eliminar-empleados"}
        <EliminarEmpleados />
      {:else if vistaActual === "departamentos"}
        <Departamentos />
      {:else if vistaActual === "jerarquias"}
        <Jerarquiasdepartamentos />
      {:else if vistaActual === "informes"}
        <Informes />
      {/if}
    </div>
  </div>
</div>

<style>
  /* Título fijo en la parte superior */
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

  /* Navbar fijo debajo del título */
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
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
      background-color: #d7d6d6;
      color: #333;
      font-size: 18px;
      font-weight: 500;
      border: 1px solid #c1c0c0;
  }

  .menu-item.selected {
      background-color: #8A7BB7;
      color: white;
  }

  .menu-item:hover {
      background-color: #b9b7b7;
      color: white;
  }

  /* Espacio para el contenido: se agrega padding-top para que no quede tapado por el título y el navbar */
  .contenido {
      padding-top: 120px;
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
