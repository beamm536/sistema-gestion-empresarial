<script>
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
        if (confirm("¿Estás seguro que deseas eliminar este producto?")) {
            productos = productos.filter((_, i) => i !== index);
            localStorage.setItem("productos", JSON.stringify(productos));
        }
    }

    // Filtrar productos según la búsqueda
    $: productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );
</script>

<div class="app-productos">
    <div class="app-content">
        <div class="main">
            <!-- Encabezado con botón a la izquierda y barra de búsqueda a la derecha -->
            <div class="header">
                <button class="nuevo-btn" on:click={openPopup}>Nuevo Producto</button>
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
            <!-- Botón de cerrar (X) -->
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


<style>
    /* Contenedor principal */
    .app-productos {
        margin-top: -50px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    /* Contenedor interno */
    .app-content {
        width: 100%;
        max-width: 1200px;
        margin: auto;
    }

    /* Encabezado que contiene el botón y la barra de búsqueda */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    /* Botón de nuevo producto */
    .nuevo-btn {
        padding: 8px 16px;
        background-color: #8A7BB7;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
    }

    .nuevo-btn:hover {
        background-color: #7c68a3;
    }

    /* Barra de búsqueda */
    .search-bar {
    width: 50%;
    max-width: 400px;
    padding: 7px;
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

    /* Tarjetas de producto */
    .productos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .producto-card {
        position: relative;
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
        border: 1px solid transparent;
    }

    .producto-card:hover {
        transform: translateY(-5px);
        border: 1px solid #8A7BB7;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    }

    .producto-card strong {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }

    .producto-card p {
        font-size: 14px;
        color: #666;
        margin: 5px 0;
    }

    /* Papelera (delete button) */
    .delete-btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: #e74c3c;
        padding: 5px;
        border-radius: 50%;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .delete-btn:hover {
        background-color: red;
        color: white;
    }

    /* Estilos del popup */
    /* Estilos del popup */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
}

.popup-content h2 {
    margin-top: 0;
    color: #333;
}

.close-btn {
    font-size: 30px;  /* Tamaño de la X */
    color: #333;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    padding: 0;
    transition: color 0.3s ease;
}





    .form-section {
        display: flex;
        flex-direction: column;
    }

    .form-section label {
        margin-bottom: 5px;
        font-size: 14px;
        color: #333;
    }
    /*.form-section textarea {
        resize: vertical;
        min-height: 80px;
    }*/

    .form-section input,
    .form-section textarea {
        padding: 8px;
        resize: vertical;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }
    .form-section input:focus {
    border-color: #8A7BB7; /* Borde color morado al enfocarse */
    outline: none;
}
.form-section textarea:focus {
    border-color: #8A7BB7; /* Borde color morado al enfocarse */
    outline: none;
}

    

    button[type="submit"] {
        padding: 10px 20px;
        background-color: #8A7BB7;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }

    button[type="submit"]:hover {
        background-color: #7c68a3;
    }

    /* Botón de cerrar el popup */
    .close-btn {
        font-size: 24px;
        color: #333;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }

</style>
