<script>
    import { push } from 'svelte-spa-router';
    function goHome(){
    push('/');
  }
    const departamentos = [
        { id: 1, nombre: "Administración", gerente: "Beatriz", parentId: null },
        { id: 2, nombre: "Recursos Humanos", gerente: "Carlos", parentId: 1 },
        { id: 3, nombre: "Ventas", gerente: "Pedro", parentId: 1 },
        { id: 4, nombre: "Marketing", gerente: "Ana", parentId: 3 },
        { id: 5, nombre: "Atención al Cliente", gerente: "Luca", parentId: 3 },
    ];

    // Organizar los departamentos por padre
    const departamentosPorPadre = {};
    departamentos.forEach(depto => {
      if (!departamentosPorPadre[depto.parentId]) {
        departamentosPorPadre[depto.parentId] = [];
      }
      departamentosPorPadre[depto.parentId].push(depto);
    });

    // Función para obtener los departamentos hijos
    const obtenerDepartamentos = (parentId) => {
      return departamentosPorPadre[parentId] || [];
    };
</script>

<style>
  /* Tarjeta base más compacta */
  .tarjeta {
    border: 1px solid #ccc;
    padding: 4px 6px;
    margin: 2px;
    border-radius: 2px;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-top: 45px;
  }

  /* Colores para cada nivel */
  .nivel-1 {
    background-color: #f0f8ff; /* Azul claro */
  }
  .nivel-2 {
    background-color: #e0ffe0; /* Verde claro */
  }
  .nivel-3 {
    background-color: #fff0e0; /* Amarillo claro */
  }
  .nivel-4 {
    background-color: #ffe0e0; /* Rojo claro */
  }

  /* Contenedor de hijos */
  .contenedor-hijos {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 2px;
    width: 100%;
  }

  /* Contenedor principal */
  .contenedor-principal {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* Contenedor para cada tarjeta padre */
  .contenedor-padre {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 50vw;  /* Ancho reducido */
    margin-bottom: 10px;
  }

  /* Tarjetas hijas más pequeñas */
  .tarjeta-hija {
    width: 120px;
    margin-right: 2px;
    margin-bottom: 2px;
    flex-shrink: 0;
  }

  /* Ajuste interno en tarjetas dentro del contenedor padre */
  .contenedor-padre .tarjeta {
    padding: 4px;
    height: auto;
  }

  /* Permitir que las tarjetas hijas ocupen el espacio disponible si es necesario */
  .contenedor-hijos > .tarjeta {
    flex-grow: 1;
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

<button class="home-btn" on:click={goHome} aria-label="Inicio">
    <svg xmlns="http://www.w3.org/2000/svg" class="home-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  </button>
