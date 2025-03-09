<script>
  import IconoBoton from "./IconoBoton.svelte";
  import './styles/Estructura.css';
  import { push, location } from 'svelte-spa-router';

  const imgs = [
    { img: "/imgs/facturacion.png", label: "Facturacion" },
    { img: "/imgs/ventas.png", label: "Ventas" },
    { img: "/imgs/contabilidad.png", label: "Contabilidad" },
    { img: "/imgs/crm.png", label: "CRM" },
    { img: "/imgs/proyecto.png", label: "Proyecto" },
    { img: "/imgs/informacion.png", label: "Informacion" },
    { img: "/imgs/inventario.png", label: "Inventario" },
    { img: "/imgs/compra.png", label: "Compra" },
    { img: "/imgs/documentos.png", label: "Documentos" },
    { img: "/imgs/empleados.png", label: "Empleados"}
  ];

  // Solo estos botones estarán habilitados
  const enabledButtons = ["Empleados", "Ventas", "Inventario"];

  function handleClick(label) {
    // Si el botón no está habilitado, no se hace nada
    if (!enabledButtons.includes(label)) return;
    console.log('Navegando a:', label);
    if (label === "Empleados") {
      push('/empleados');
    } else if (label === "Inventario") {
      push('/inventario');
    } else if (label === "Ventas") {
      push('/ventas');
    } else {
      push('/');
    }
  }

  // Se utiliza el store location para determinar la ruta actual
  $: isHome = $location === "/";
</script>

<!-- Se asigna la clase 'home-background' solo si estamos en "/" y 'white-background' en caso contrario -->
<div class="contenedor-estructura {isHome ? 'home-background' : 'white-background'}">
  <header class="main-header">
    <h1>SmartOps</h1>
    <p>Bienvenido a la prueba de nuestro software nuevo de gestión empresarial</p>
  </header>

  <div class="launcher-vistaPrincipal">
    <div class="oval-container">
      {#each imgs as { img, label }}
        <!-- Se asigna la clase "disabled" si el botón no está en la lista de habilitados -->
        <div class="icon-wrapper {enabledButtons.includes(label) ? '' : 'disabled'}">
          <!-- Se ejecuta el handleClick solo si el botón está habilitado -->
          <div on:click={() => enabledButtons.includes(label) && handleClick(label)} style="cursor: pointer;">
            <IconoBoton {img} {label} enabled={enabledButtons.includes(label)} />
          </div>
        </div>
      {/each}
    </div>
  </div>

  <footer class="main-footer">
    <p>&copy; 2025 Mi Aplicación</p>
  </footer>
</div>
