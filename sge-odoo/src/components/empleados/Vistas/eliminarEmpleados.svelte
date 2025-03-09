<script>
    let empleados = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: true,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
    ];

    let empleados2 = [
        {
            nombre: "Beatriz",
            email: "prueba@gmail.com",
            departamento: "Administración",
            inicial: "B",
            online: false,
        },
        {
            nombre: "Pedro",
            email: "pedro@gmail.com",
            departamento: "Ventas",
            inicial: "P",
            online: true,
        },
        {
            nombre: "Juan",
            email: "juan@gmail.com",
            departamento: "Ventas",
            inicial: "J",
            online: true,
        },
    ];

    let empleadosActivos = [...empleados2]; // Usamos empleados2 al principio
    let departamentoSeleccionado = ""; // Variable para el filtro de departamento

    // Función para alternar entre listas de empleados
    function toggleEmpleados() {
        empleadosActivos = empleadosActivos.length === empleados.length ? [...empleados2] : [...empleados];
    }

    // Función para vaciar la papelera y cambiar la lista de empleados
    function vaciarPapelera() {
        empleadosActivos = [...empleados];
    }

    $: departamentoCounts = countEmpleadosByDepartamento();

    // Filtrar empleados por departamento seleccionado
    $: empleadosFiltrados = departamentoSeleccionado
        ? empleadosActivos.filter(emp => emp.departamento === departamentoSeleccionado)
        : empleadosActivos;

    // Función para contar empleados por departamento
    function countEmpleadosByDepartamento() {
        const counts = {};
        empleadosActivos.forEach(emp => {
            counts[emp.departamento] = (counts[emp.departamento] || 0) + 1;
        });
        return counts;
    }
</script>

<div class="app-empleados">
    <div class="app-content">
        <div class="sidebar">
            <!-- Se eliminó el botón de "Nuevo Empleado" -->
            <h3>DEPARTAMENTO</h3>
            <ul>
                <li><strong on:click={() => departamentoSeleccionado = ""}>Todos</strong></li>
                {#each Object.entries(departamentoCounts) as [departamento, count]}
                    <li on:click={() => departamentoSeleccionado = departamento}>
                        {departamento} ({count})
                    </li>
                {/each}
            </ul>
        </div>

        <div class="main">
            <div class="header">
                <input type="text" class="search-bar" placeholder="Buscar..." />
            </div>

            <div class="empleados">
                {#each empleadosFiltrados as emp}
                    <div class="empleado-card">
                        <div class="icon">{emp.inicial}</div>
                        <div class="info">
                            <strong>{emp.nombre}</strong>
                            <p>{emp.email}</p>
                        </div>
                        {#if emp.online}
                            <div class="status"></div>
                        {/if}
                        <!-- Papelera -->
                        <div class="papelera" on:click={vaciarPapelera}>
                            🗑️
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
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
  background-color: #fff; /* Fondo blanco */
  color: #333; /* Texto en gris oscuro */
}

/* Contenedor principal */
.app-empleados {
  margin-top: -70px;
  display: flex;
  min-height: 100vh;
}

/* Contenedor de contenido */
.app-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Sidebar */
.sidebar {
  background-color: #f5f5f5; /* Gris muy claro */
  width: 250px;
  padding: 20px;
  padding-top: 130px;
  border-right: 2px solid #ddd;
}

.sidebar h3 {
  margin-top: 30px;
  color: #8A7BB7; /* Color de acento */
  margin-bottom: 15px;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
}

.sidebar li:hover {
  background-color: #ddd;
}

/* Área principal */
.main {
  flex: 1;
  background-color: #fff;
  padding: 20px;
}

/* Barra de búsqueda en el header */
.header .search-bar {
  margin-top: 100px;
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Tarjetas de empleados */
.empleados {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}



.empleado-card {
  background-color: #f9f9f9;
  padding: 10px;     /* Antes 20px */
  min-height: 80px;  /* Antes 120px */
  border: 1px solid #ccc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.empleado-card .icon {
  background-color: #8A7BB7;
  color: #fff;
  font-size: 20px;   /* Antes 24px */
  font-weight: bold;
  width: 40px;       /* Antes 50px */
  height: 40px;      /* Antes 50px */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 15px;
}


.empleado-card:hover {
  background-color: #eee;
}

/* .empleado-card .icon {
  background-color: #8A7BB7;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 15px;
} */

.empleado-card .info {
  display: flex;
  flex-direction: column;
}


.empleado-card strong {
  display: block;
  margin-bottom: 5px;
}

.empleado-card .status {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-left: 10px;
}

.empleado-card .papelera {
  margin-left: auto;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  border-radius: 50%;
}

.empleado-card .papelera:hover {
  background-color: red;
  color: white;
}

/* Popup (si se requiere) */
.popup {
  display: none;
  position: fixed;
  z-index: 9999; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 900px;
  max-height: 90%;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 2px solid #8A7BB7;
  box-sizing: border-box;
}

.popup-content h2 {
  text-align: center;
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #8A7BB7;
  cursor: pointer;
}

/* Estilos generales del formulario (en caso de que se use un popup) */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Organización de cada sección del formulario con grid */
.form-section {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 10px 15px;
  align-items: center;
}

.form-section label {
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
  color: #333;
}

.form-section input,
.form-section select {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Secciones expandibles (si se requieren) */
.expandable {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
}

.expandable label {
  text-align: left;
  font-weight: bold;
  color: #333;
}

.expandable input,
.expandable select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    padding: 15px;
  }
  
  .empleados {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .popup-content {
    width: 95%;
    padding: 15px;
  }
}
</style>
