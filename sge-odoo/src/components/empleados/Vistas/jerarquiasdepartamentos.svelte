<script>
    const departamentos = [
        { id: 1, nombre: "Administración", gerente: "Beatriz", parentId: null },
        { id: 2, nombre: "Recursos Humanos", gerente: "Carlos", parentId: 1 },
        { id: 3, nombre: "Ventas", gerente: "Pedro", parentId: 1 },
        { id: 4, nombre: "Marketing", gerente: "Ana", parentId: 3 },
        { id: 5, nombre: "Atención al Cliente", gerente: "Luca", parentId: 3 },
    ];

    // Organizar los departamentos en un objeto de padres
    const departamentosPorPadre = {};

    departamentos.forEach(departamento => {
        if (!departamentosPorPadre[departamento.parentId]) {
            departamentosPorPadre[departamento.parentId] = [];
        }
        departamentosPorPadre[departamento.parentId].push(departamento);
    });

    // Función para obtener los departamentos hijos
    const obtenerDepartamentos = (parentId) => {
        return departamentosPorPadre[parentId] || [];
    };
</script>

<style>
    .tarjeta {
        border: 1px solid #ccc;
        padding: 15px 20px;
        margin: 10px;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* Diferentes colores para cada nivel */
    .nivel-1 {
        background-color: #f0f8ff; /* Azul claro para el primer nivel */
    }

    .nivel-2 {
        background-color: #e0ffe0; /* Verde claro para el segundo nivel */
    }

    .nivel-3 {
        background-color: #fff0e0; /* Amarillo claro para el tercer nivel */
    }

    .nivel-4 {
        background-color: #ffe0e0; /* Rojo claro para el cuarto nivel */
    }

    .contenedor-hijos {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        width: 100%;
    }

    .contenedor-principal {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .contenedor-padre {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 80vw;
        margin-bottom: 20px;
    }

    .tarjeta-hija {
        width: 200px;
        margin-right: 10px;
        flex-shrink: 0;
    }

    .contenedor-padre .tarjeta {
        padding: 10px;
        height: auto;
    }

    .contenedor-hijos > .tarjeta {
        flex-grow: 1;
    }
</style>

<div class="contenedor-principal">
    {#each obtenerDepartamentos(null) as departamento (departamento.id)}
        <div class="tarjeta contenedor-padre nivel-1">
            <h3>{departamento.nombre}</h3>
            <p>Gerente: {departamento.gerente}</p>
            <div class="contenedor-hijos">
                {#each obtenerDepartamentos(departamento.id) as hijo (hijo.id)}
                    <div class="tarjeta tarjeta-hija nivel-2">
                        <h3>{hijo.nombre}</h3>
                        <p>Gerente: {hijo.gerente}</p>
                        <div class="contenedor-hijos">
                            {#each obtenerDepartamentos(hijo.id) as nieto (nieto.id)}
                                <div class="tarjeta tarjeta-hija nivel-3">
                                    <h3>{nieto.nombre}</h3>
                                    <p>Gerente: {nieto.gerente}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
