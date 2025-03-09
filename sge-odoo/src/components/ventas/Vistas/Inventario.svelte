<script>
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let searchQuery = "";

    $: productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );
</script>

<div class="inventario-container">
    <h2>Inventario de Productos</h2>

    <!-- Barra de búsqueda -->
    <input 
        type="text" 
        class="search-bar" 
        placeholder="Buscar productos..." 
        bind:value={searchQuery}
    />

    <div class="productos-grid">
        {#if productosFiltrados.length > 0}
            {#each productosFiltrados as producto}
                <div class="producto-card">
                    <strong class="producto-nombre">{producto.nombre}</strong>
                    <p class="producto-descripcion">{producto.descripcion}</p>
                    <p class="producto-detalle">Cantidad: <span>{producto.cantidad}</span></p>
                    <p class="producto-detalle">Precio: <span>${producto.precio}</span></p>
                </div>
            {/each}
        {:else}
            <p class="mensaje-no-resultados">No se encontraron productos.</p>
        {/if}
    </div>
</div>

<style>
    /* Contenedor principal */
    .inventario-container {
        padding: 20px;
        text-align: center;
        background-color: #fff; /* Fondo blanco */
        color: #333; /* Gris oscuro */
        min-height: 100vh;
    }

    h2 {
        font-size: 24px;
        color: #444; /* Gris oscuro */
        margin-bottom: 15px;
    }

    /* Barra de búsqueda */
    .search-bar {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        outline: none;
        background-color: #fff;
        color: #333;
        transition: border-color 0.3s;
    }

    .search-bar:focus {
        border-color: #888; /* Gris oscuro */
    }

    /* Contenedor de productos */
    .productos-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    /* Tarjetas de productos */
    .producto-card {
        background-color: #fff;
        padding: 15px;
        border-radius: 6px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        text-align: left;
        width: 220px;
        transition: transform 0.2s, box-shadow 0.2s;
        border: 1px solid #ddd; /* Gris claro */
    }

    .producto-card:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Gris más oscuro */
    }

    .producto-nombre {
        font-size: 18px;
        color: #444; /* Gris oscuro */
        display: block;
        margin-bottom: 5px;
    }

    .producto-descripcion {
        font-size: 14px;
        color: #777; /* Gris más claro */
        margin-bottom: 10px;
    }

    .producto-detalle {
        font-size: 14px;
        color: #555; /* Gris más oscuro */
    }

    .producto-detalle span {
        font-weight: bold;
        color: #333; /* Gris muy oscuro */
    }

    .mensaje-no-resultados {
        font-size: 16px;
        color: #888; /* Gris más claro */
        margin-top: 20px;
    }
</style>
