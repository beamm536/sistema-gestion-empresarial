<script>

  //importaciones para el enrutamiento
  import Router from 'svelte-spa-router';
  import routes from './routes';

  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import IconoBoton from "./components/IconoBoton.svelte";
  import Estructura from "./components/Estructura.svelte";
  import EmpleadosVista from "./components/empleados/EmpleadosVista.svelte";
  import InventarioVista from "./components/inventario/InventarioVista.svelte";
  import VentasVista from "./components/ventas/ventasVista.svelte";

  let vista = "estructura";

  function cambiarVista(nuevaVista) {
        vista = nuevaVista; // Cambia el componente mostrado
    }
</script>

<div class="app-main">

  <Router {routes} />
  
   <div class="app-main-estructura">
     <Estructura />
   </div>
<!--  <EmpleadosVista /> -->

 <!--<InventarioVista/>-->
 <VentasVista/>


 
</div>
