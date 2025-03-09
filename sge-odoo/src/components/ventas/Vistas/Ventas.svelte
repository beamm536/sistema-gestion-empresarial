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
        cantidad: Number(producto.cantidad),
        precio: Number(producto.precio)
    }));

    let selectedCliente = "";
    let selectedProducto = "";
    let emailFactura = "";
    let cantidad = 0;
    let mensajeError = "";
    let fase = 0; // 0 = Listado, 1 = Formulario, 2 = Factura
    let precioTotal = 0;

    function avanzarFase() {
        let producto = productos.find(p => p.nombre === selectedProducto);

        if (!producto) {
            mensajeError = "Debe seleccionar un producto válido";
            return;
        }

        cantidad = Number(cantidad);

        if (cantidad <= 0 || cantidad > producto.cantidad) {
            mensajeError = "Stock insuficiente o cantidad inválida";
            return;
        }

        mensajeError = "";
        precioTotal = cantidad * producto.precio;
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
            precioTotal,
            email: emailFactura
        };

        ventas.push(nuevaVenta);
        localStorage.setItem("ventas", JSON.stringify(ventas));

        // Simular envío de factura por correo
        alert(`Factura enviada a ${emailFactura}`);

        // Recargar la página
        window.location.reload();

        // Reiniciar formulario
        selectedCliente = "";
        selectedProducto = "";
        cantidad = 0;
        emailFactura = "";
        precioTotal = 0;
        fase = 0;
    }

    function cerrarPopup() {
        fase = 0;
        mensajeError = ""; // Reset error message when closing popup
    }
</script>

<div class="ventas-container">
    <h2>Listado de Ventas</h2>
    <table class="ventas-table">
        <thead>
            <tr>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Total</th>
            </tr>
        </thead>
        <tbody>
            {#each ventas as venta}
                <tr>
                    <td>{venta.cliente}</td>
                    <td>{venta.producto}</td>
                    <td>{venta.cantidad}</td>
                    <td>${venta.precioTotal}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <button class="nueva-venta-btn" on:click={() => fase = 1}>Nueva Venta</button>

    {#if fase === 1}
        <div class="formulario">
            <button class="cerrar-popup" on:click={cerrarPopup}>X</button>
            <h3>Crear Venta</h3>
            <div class="campo-formulario">
                <label>Cliente:
                    <select bind:value={selectedCliente}>
                        <option value="">Seleccione un cliente</option>
                        {#each clientes as cliente}
                            <option value={cliente.nombre}>{cliente.nombre}</option>
                        {/each}
                    </select>
                </label>
            </div>
            <div class="campo-formulario">
                <label>Producto:
                    <select bind:value={selectedProducto}>
                        <option value="">Seleccione un producto</option>
                        {#each productos as producto}
                            <option value={producto.nombre}>{producto.nombre} (Stock: {producto.cantidad})</option>
                        {/each}
                    </select>
                </label>
            </div>
            <div class="campo-formulario">
                <label>Cantidad:
                    <input type="number" bind:value={cantidad} min="1" class="cantidad-input"/>
                </label>
            </div>
            {#if mensajeError}
                <p class="error">{mensajeError}</p>
            {/if}
            <button class="siguiente-btn" on:click={avanzarFase}>Siguiente</button>
        </div>
    {/if}

    {#if fase === 2}
        <div class="factura">
            <button class="cerrar-popup" on:click={cerrarPopup}>X</button>
            <h3>Generar Factura</h3>
            <div class="factura-container">
                <div class="columna">
                    <p><strong>Cliente:</strong> {selectedCliente}</p>
                    <p><strong>Producto:</strong> {selectedProducto}</p>
                    <p><strong>Cantidad:</strong> {cantidad}</p>
                    <p><strong>Precio por unidad:</strong> ${productos.find(p => p.nombre === selectedProducto).precio}</p>
                </div>
                <div class="columna">
                    <p><strong>Precio Total:</strong> ${precioTotal}</p>
                    <div class="campo-formulario">
                        <label>Email para Factura:</label>
                        <input type="email" bind:value={emailFactura} />
                    </div>
                    <button class="finalizar-btn" on:click={completarVenta}>Finalizar Venta</button>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .ventas-container {
        padding: 20px;
        text-align: center;
        background-color: #f0f0f0; /* Gris suave de fondo */
        color: #333;
        min-height: 100vh;
        max-width: 100%;
        margin: 0;
    }

    h2 {
        font-size: 24px;
        color: #4A4A4A; /* Gris oscuro para el título */
        margin-bottom: 15px;
    }

    .ventas-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    .ventas-table th,
    .ventas-table td {
        padding: 10px;
        border: 1px solid #ccc; /* Gris claro en los bordes */
        text-align: center;
    }

    .ventas-table th {
        background-color: #8A7BB7; /* Color predominante morado */
        color: white;
    }

    .nueva-venta-btn, .siguiente-btn, .finalizar-btn {
        background-color: #8A7BB7; /* Color predominante morado */
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 60px;
    }

    .finalizar-btn, .siguiente-btn{
        margin-top: 10px;
    }

    .nueva-venta-btn:hover, .siguiente-btn:hover, .finalizar-btn:hover {
        background-color: #7a6aa0; /* Hover color */
    }

    .formulario, .factura {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        width: 80%;
        max-width: 900px;
        min-width: 600px;
    }

    .factura-container {
        display: flex;
        justify-content: space-between;
    }

    .columna {
        width: 48%;
    }

    .factura p {
        font-size: 16px;
        margin-bottom: 12px;
        color: #333;
    }

    .factura label {
        display: block;
        margin-bottom: 10px;
        color:#333;
    }

    .factura input {
        width: 50%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 15px;
        font-size: 14px;
        display: inline-block;
    }

    .cantidad-input {
        width: 10%;
    }

    .nueva-venta-btn {
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: #8A7BB7;
    }

    .error {
        color: #D9534F; /* Rojo más suave */
        font-size: 12px; /* Texto más pequeño */
        font-weight: 300; /* Texto más fino */
        margin-top: 10px;
    }

    .cerrar-popup {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        color: #333;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
</style>
