<script>
    import "../InventarioVista.css";

    let productos = JSON.parse(localStorage.getItem("productos")) || []; 
    let nombre = "";
    let descripcion = "";
    let cantidad = "";
    let precio = "";
    let searchQuery = ""; // Nueva variable para la barra de búsqueda

    let popupVisible = false;

    function openPopup() {
        popupVisible = true;
    }

    function closePopup() {
        popupVisible = false;
    }

    function handleSubmit() {
        productos = [...productos, { nombre, descripcion, cantidad, precio }];
        localStorage.setItem("productos", JSON.stringify(productos));

        nombre = "";
        descripcion = "";
        cantidad = "";
        precio = "";

        closePopup();
    }

    function eliminarProducto(index) {
        productos = productos.filter((_, i) => i !== index);
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    // Filtrar productos según la búsqueda
    $: productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );
</script>

<div class="app-productos">
    <div class="app-content">
        <div class="sidebar">
            <button on:click={openPopup}>Nuevo</button>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." bind:value={searchQuery} />
            </div>

            <div class="productos">
                {#each productosFiltrados as producto, index}
                    <div class="producto-card">
                        <strong>{producto.nombre}</strong>
                        <p>{producto.descripcion}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Precio: ${producto.precio}</p>
                        <button class="delete-btn" on:click={() => eliminarProducto(index)}>🗑️</button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

{#if popupVisible}
    <div id="popup" class="popup">
        <div class="popup-content">
            <span class="close-btn" on:click={closePopup}>&times;</span>
            <h2>Formulario de Producto</h2>
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-section">
                    <label for="nombre">Nombre del producto:</label>
                    <input type="text" id="nombre" bind:value={nombre} required>

                    <label for="descripcion">Descripción:</label>
                    <textarea id="descripcion" bind:value={descripcion} required></textarea>

                    <label for="cantidad">Cantidad:</label>
                    <input type="number" id="cantidad" bind:value={cantidad} required>

                    <label for="precio">Precio:</label>
                    <input type="number" id="precio" bind:value={precio} step="0.01" required>
                </div>

                <button type="submit">Guardar Producto</button>
            </form>
        </div>
    </div>
{/if}
