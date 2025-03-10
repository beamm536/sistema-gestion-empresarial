<script>
    import { push } from 'svelte-spa-router';
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let searchQuery = "";

    $: productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function goHome(){
    push('/');
  }
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
    </div>   </div>


    <button class="home-btn" on:click={goHome} aria-label="Inicio">
        <svg xmlns="http://www.w3.org/2000/svg" class="home-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>
      
      
      



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
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #ffffff;
    color: #333333;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
}

.search-bar:focus {
    border-color: #8A7BB7; /* Color morado al hacer foco */
    outline: none;
}

/* Cambiar el borde de la barra de búsqueda al hacer hover */
.search-bar:hover {
    border-color: #8A7BB7; /* Color morado al hacer hover */
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
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        border-color: #8A7BB7;
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

    .home-btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: #8A7BB7;
  color: white;
  border: none;
  padding: 20px;
  border-radius: 50%; /* Botón circular */
  cursor: pointer;
  z-index: 10000;
  transition: background-color 0.3s ease;
}

.home-btn:hover {
  background-color: #786aa0;
}

.home-icon {
  width: 24px;
  height: 24px;
  display: block;
}

</style>
