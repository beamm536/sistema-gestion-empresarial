<script>
    import IconoBoton from "./IconoBoton.svelte";
    import './styles/Estructura.css'

    /* import imgFacturacion from "../../public/imgs/facturacion.png"
    import imgVentas from "../../public/imgs/ventas.png"
    import imgContabilidad from "../../public/imgs/contabilidad.png"
    import imgCRM from "../../public/imgs/crm.png"
    import imgProyecto from "../../public/imgs/proyecto.png"
    import imgInformacion from "../../public/imgs/informacion.png"
    import imgInventario from "../../public/imgs/inventario.png"
    import imgCompra from "../../public/imgs/compra.png"
    import imgDocumentos from "../../public/imgs/documentos.png"
    import imgFabricacion from "../../public/imgs/fabricacion.png" */
  
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

  </script>
    
<!-- PARA LA POSICION DE LOS ICONOS -->
  <div class="launcher">
    <div class="icons-container">
      {#each imgs as { img, label }, i}
        <div
          class="icon-wrapper"
          style="transform: translate(-50%, -50%) rotate({i * (360 / imgs.length)}deg) translate(270px) rotate(-{i * (360 / imgs.length)}deg);"
        >
          <IconoBoton {img} {label}/>
        </div>
      {/each}
    </div>
  </div>