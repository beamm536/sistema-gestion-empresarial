<script>

    import Principal from "../inventario/Vistas/principal.svelte";
    import AñadirProducto from "../inventario/Vistas/AñadirProductos.svelte"

  
    let vistaActual = "principal";
    let mostrarDropdownProductos = false; // Controla si se muestra el dropdown de empleados
  
    function cambiarVista(vista) {
      vistaActual = vista;
      mostrarDropdownProductos = false; // Cierra el dropdown de empleados al cambiar de vista
    }
  
    function toogleDropdownProductos() {
        mostrarDropdownProductos = !mostrarDropdownProductos;
      // Cierra el otro dropdown si está abierto
    }
  
  </script>
  
  <div class="app-empleados">
    <div class="app">
      <div class="navbar">
        <div class="menu">
          <!--<a href="#" on:click|preventDefault={() => cambiarVista("principal")}>Empleados</a>-->
            <a href="#" on:click|preventDefault={() => cambiarVista("principal")}
              >Inventario</a
            >
          <!-- Menú desplegable para Departamentos -->
            <a href="#" on:click|preventDefault={() => cambiarVista("principal")}
              >Informacion General</a>
  
              <div class="dropdown">
                <a href="#" on:click|preventDefault={toogleDropdownProductos}>Productos</a>
              
                {#if mostrarDropdownProductos}
                  <div class="dropdown-content">
                    <a href="#" on:click|preventDefault={() => cambiarVista("añadir-producto")}>Ver/añadir Productos</a>
                  </div>
                {/if}
              </div>
              

        </div>
      </div>
  
      <!-- Mostrar el componente correspondiente -->
      {#if vistaActual === "principal"}
      <Principal/>
      {:else if vistaActual === "añadir-producto"}
      <AñadirProducto/>
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
  