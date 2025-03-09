<script>
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
</script>

<div class="inventario-container">
    <h2>Inventario de Productos</h2>
    <div class="productos-grid">
        {#each productos as producto, index}
            <div class="producto-card">
                <strong>{producto.nombre}</strong>
                <p>{producto.descripcion}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .inventario-container {
        padding: 20px;
        text-align: center;
    }

    .productos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    .producto-card {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
    }
</style>
