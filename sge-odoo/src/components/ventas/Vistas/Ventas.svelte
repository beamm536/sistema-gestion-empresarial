<script>
    import { onMount } from 'svelte';

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    let clientes = [
        { nombre: "Tech Company", email: "techcompany@gmail.com" },
        { nombre: "El Corte Ingles", email: "elCorteIngles@gmail.com" }
    ];

    productos = productos.map(producto => ({
        ...producto,
        cantidad: Number(producto.cantidad), // Convertir cantidad a número
        precio: Number(producto.precio) // Convertir precio a número
    }));

    let selectedCliente = "";
    let selectedProducto = "";
    let emailFactura = "";
    let cantidad = 0; // Inicializado como número
    let mensajeError = "";
    let fase = 0; // 0 = Listado, 1 = Formulario, 2 = Factura

    function avanzarFase() {
        let producto = productos.find(p => p.nombre === selectedProducto);

        if (!producto) {
            mensajeError = "Debe seleccionar un producto válido";
            return;
        }

        cantidad = Number(cantidad); // Asegurar que cantidad es un número

        if (cantidad <= 0 || cantidad > producto.cantidad) {
            mensajeError = "Stock insuficiente o cantidad inválida";
            return;
        }

        mensajeError = "";
        fase = 2;
    }

    function completarVenta() {
        let producto = productos.find(p => p.nombre === selectedProducto);

        if (!producto) {
            mensajeError = "Error: Producto no encontrado";
            return;
        }

        producto.cantidad -= cantidad;
        localStorage.setItem("productos", JSON.stringify(productos));

        let nuevaVenta = {
            cliente: selectedCliente,
            producto: selectedProducto,
            cantidad,
            precioTotal: cantidad * producto.precio,
            email: emailFactura
        };

        ventas.push(nuevaVenta);
        localStorage.setItem("ventas", JSON.stringify(ventas));

        // Simular envío de factura por correo
        alert(`Factura enviada a ${emailFactura}`);

        // Reiniciar formulario
        selectedCliente = "";
        selectedProducto = "";
        cantidad = 0;
        emailFactura = "";
        fase = 0; // Volver al listado
    }
</script>

<div class="ventas-container">
    <h2>Listado de Ventas</h2>
    <ul>
        {#each ventas as venta}
            <li>{venta.cliente} compró {venta.cantidad} de {venta.producto} por ${venta.precioTotal}</li>
        {/each}
    </ul>
    
    <button on:click={() => fase = 1}>Nueva Venta</button>

    {#if fase === 1}
        <div class="formulario">
            <h3>Crear Venta</h3>
            <label>Cliente:
                <select bind:value={selectedCliente}>
                    <option value="">Seleccione un cliente</option>
                    {#each clientes as cliente}
                        <option value={cliente.nombre}>{cliente.nombre}</option>
                    {/each}
                </select>
            </label>
            <label>Producto:
                <select bind:value={selectedProducto}>
                    <option value="">Seleccione un producto</option>
                    {#each productos as producto}
                        <option value={producto.nombre}>{producto.nombre} (Stock: {producto.cantidad})</option>
                    {/each}
                </select>
            </label>
            <label>Cantidad:
                <input type="number" bind:value={cantidad} min="1" />
            </label>
            {#if mensajeError}
                <p class="error">{mensajeError}</p>
            {/if}
            <button on:click={avanzarFase}>Siguiente</button>
        </div>
    {/if}

    {#if fase === 2}
        <div class="factura">
            <h3>Generar Factura</h3>
            <p>Cliente: {selectedCliente}</p>
            <p>Producto: {selectedProducto}</p>
            <p>Cantidad: {cantidad}</p>
            <label>Email para Factura:
                <input type="email" bind:value={emailFactura} />
            </label>
            <button on:click={completarVenta}>Finalizar Venta</button>
        </div>
    {/if}
</div>

<style>
    .ventas-container {
        padding: 20px;
        max-width: 600px;
        margin: auto;
    }
    .formulario, .factura {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        margin-top: 10px;
    }
    .error {
        color: red;
    }
</style>
