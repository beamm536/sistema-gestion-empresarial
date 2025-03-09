<script>
    let mostrarPopup = false;
    let nombreDepartamento = "";
    let gerente = "";
    let departamentoPadre = "ninguno";  // Valor inicial del select
    let departamentos = [];

    let empleados2 = [
        { nombre: "Beatriz" },
        { nombre: "Pedro" },
        { nombre: "Juan" },
    ];

    let departamentosPadre = [
        { nombre: "ninguno" }
    ];

    // Paginación
    let currentPage = 1;
    let itemsPerPage = 4;
    $: totalPages = Math.ceil(departamentos.length / itemsPerPage);
    $: displayedDepartamentos = departamentos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function abrirPopup() {
        mostrarPopup = true;
    }

    function cerrarPopup() {
        mostrarPopup = false;
        limpiarFormulario();
    }

    function guardarDepartamento() {
        if (nombreDepartamento && gerente) {
            let nuevoDepartamento = {
                id: Date.now(),
                nombreDepartamento,
                gerente,
                departamentoPadre
            };

            // Agregar a la lista de departamentos
            departamentos = [...departamentos, nuevoDepartamento];
            // Reiniciamos la página para ver el nuevo elemento (opcional)
            currentPage = 1;

            // Agregar el nuevo departamento como opción en el select de "Departamento Padre"
            departamentosPadre = [...departamentosPadre, { nombre: nombreDepartamento }];

            cerrarPopup();
        }
    }

    function limpiarFormulario() {
        nombreDepartamento = "";
        gerente = "";
        departamentoPadre = "ninguno";  // Restablecer valor por defecto
    }

    // Funciones de paginación
    function prevPage() {
        if (currentPage > 1) currentPage -= 1;
    }

    function nextPage() {
        if (currentPage < totalPages) currentPage += 1;
    }
</script>

<div class="contenedor">
    <button class="nuevo-btn" on:click={abrirPopup}>Nuevo Departamento</button>

    <div class="tarjetas">
        {#if displayedDepartamentos.length === 0}
            <p class="no-data">No hay departamentos para mostrar</p>
        {:else}
            {#each displayedDepartamentos as depto (depto.id)}
                <div class="tarjeta">
                    <h3>{depto.nombreDepartamento}</h3>
                    <p><strong>Gerente:</strong> {depto.gerente}</p>
                    <p><strong>Departamento Padre:</strong> {depto.departamentoPadre}</p>
                </div>
            {/each}
        {/if}
    </div>

    <!-- Paginación -->
    {#if totalPages > 1}
        <div class="pagination">
            <button on:click={prevPage} disabled={currentPage === 1}>Anterior</button>
            <span class="page-info">Página {currentPage} de {totalPages}</span>
            <button on:click={nextPage} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
    {/if}

    {#if mostrarPopup}
        <div class="popup">
            <div class="popup-content">
                <span class="close-btn" on:click={cerrarPopup}>&times;</span>
                <h2>Nuevo Departamento</h2>
                
                <label>Nombre del Departamento:</label>
                <input type="text" bind:value={nombreDepartamento} required>

                <label>Gerente:</label>
                <select bind:value={gerente} required>
                    <option value="" disabled selected>Seleccione un gerente</option>
                    {#each empleados2 as empleado}
                        <option value={empleado.nombre}>{empleado.nombre}</option>
                    {/each}
                </select>

                <label>Departamento Padre:</label>
                <select bind:value={departamentoPadre}>
                    {#each departamentosPadre as depto}
                        <option value={depto.nombre}>{depto.nombre}</option>
                    {/each}
                </select>

                <button class="guardar-btn" on:click={guardarDepartamento}>Guardar</button>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Reset y configuración global */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #fff;
      color: #333;
    }

    .contenedor {
  width: 100vw;
  height: 100vh;
  background-color: #fff; /* Fondo blanco */
  overflow-y: auto; /* Para permitir scroll si el contenido es mayor */
  padding: 20px;
}


    /* Botón Nuevo */
    .nuevo-btn {
      background-color: #8A7BB7;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .nuevo-btn:hover {
      background-color: #786aa0;
    }

    /* Tarjetas */
    .tarjetas {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .tarjeta {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    .tarjeta h3 {
      color: #8A7BB7;
      margin-bottom: 10px;
    }
    .tarjeta p {
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 5px;
    }
    .no-data {
      grid-column: 1 / -1;
      text-align: center;
      color: #666;
      font-size: 16px;
    }

    /* Paginación */
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
    }
    .pagination button {
      background-color: #8A7BB7;
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .pagination button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .pagination button:hover:not(:disabled) {
      background-color: #786aa0;
    }
    .page-info {
      font-size: 14px;
      color: #333;
    }

    /* Popup */
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
    }
    .popup {
  position: fixed;
  z-index: 99999; /* Muy alto para que esté por delante de todo */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  min-width: 500px;  /* Aumenta el ancho mínimo */
  max-width: 800px;  /* Aumenta el ancho máximo */
  max-height: 90%;
  overflow-y: auto;
  text-align: center;
  position: relative;
  border: 2px solid #8A7BB7;
  box-sizing: border-box;
}


    .popup-content h2 {
      color: #8A7BB7;
      margin-bottom: 20px;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
      color: #8A7BB7;
    }

    /* Formularios */
    input, select {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .guardar-btn {
      background-color: #8A7BB7;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .guardar-btn:hover {
      background-color: #786aa0;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .tarjetas {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      .popup-content {
        width: 90%;
        max-width: 400px;
      }
    }
</style>
