<script>
    import { onMount } from "svelte";

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
</script>

<div class="contenedor">
    <button class="nuevo-btn" on:click={abrirPopup}>Nuevo</button>

    <div class="tarjetas">
        {#each departamentos as depto (depto.id)}
            <div class="tarjeta">
                <h3>{depto.nombreDepartamento}</h3>
                <p><strong>Gerente:</strong> {depto.gerente}</p>
                <p><strong>Departamento Padre:</strong> {depto.departamentoPadre}</p>
            </div>
        {/each}
    </div>

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
    .contenedor {
        padding: 20px;
    }

    .nuevo-btn {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    .nuevo-btn:hover {
        background-color: #45a049;
    }

    .tarjetas {
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .tarjeta {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

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

    .popup-content {
        background: white;
        padding: 20px;
        border-radius: 5px;
        min-width: 300px;
        text-align: center;
        position: relative;
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
    }

    .guardar-btn {
        background-color: #007BFF;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
    }

    .guardar-btn:hover {
        background-color: #0056b3;
    }

    input, select {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>
