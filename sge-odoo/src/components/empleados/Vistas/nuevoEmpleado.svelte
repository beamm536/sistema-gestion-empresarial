<div id="popup" class="popup">
    <div class="popup-content">
        <span id="close-btn" class="close-btn">&times;</span>
        <h2>Formulario de Empleado</h2>
        <form id="employee-form">
            <!-- Información general -->
            <div class="form-section">
                <label for="nombre">Nombre de empleado:</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="titulo">Título de trabajo:</label>
                <input type="text" id="titulo" name="titulo" required>

                <label for="correo">Correo electrónico:</label>
                <input type="email" id="correo" name="correo" required>

                <label for="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" required>

                <label for="departamento">Departamento:</label>
                <input type="text" id="departamento" name="departamento" required>

                <label for="puesto">Puesto de trabajo:</label>
                <input type="text" id="puesto" name="puesto" required>

                <label for="gerente">Gerente:</label>
                <input type="text" id="gerente" name="gerente" required>

                <label for="mentor">Mentor:</label>
                <input type="text" id="mentor" name="mentor" required>
            </div>

            <!-- Sección Curriculum -->
            <div class="form-section">
                <button type="button" class="expand-btn" id="expand-curriculum">Currículum</button>
                <div class="expandable" id="curriculum">
                    <label for="cv">Sube tu CV:</label>
                    <input type="file" id="cv" name="cv">
                </div>
            </div>

            <!-- Sección Información de trabajo -->
            <div class="form-section">
                <button type="button" class="expand-btn" id="expand-trabajo">Información de trabajo</button>
                <div class="expandable" id="informacion-trabajo">
                    <label for="horas">Horas laborales/semana:</label>
                    <input type="number" id="horas" name="horas" required>

                    <label for="ubicacion">Ubicación de trabajo:</label>
                    <input type="text" id="ubicacion" name="ubicacion" required>
                </div>
            </div>

            <!-- Sección Información privada -->
            <div class="form-section">
                <button type="button" class="expand-btn" id="expand-privada">Información privada</button>
                <div class="expandable" id="informacion-privada">
                    <label for="direccion">Dirección privada:</label>
                    <input type="text" id="direccion" name="direccion" required>

                    <label for="dni">DNI:</label>
                    <input type="text" id="dni" name="dni" required>

                    <label for="genero">Género:</label>
                    <select id="genero" name="genero" required>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <label for="fecha-nacimiento">Fecha de nacimiento:</label>
                    <input type="date" id="fecha-nacimiento" name="fecha-nacimiento" required>
                </div>
            </div>

            <button type="submit">Enviar</button>
        </form>
    </div>
</div>

<button class="home-btn" on:click={goHome} aria-label="Inicio">
    <svg xmlns="http://www.w3.org/2000/svg" class="home-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  </button>
<script>
    import { push } from 'svelte-spa-router';
    function goHome(){
    push('/');
  }
// Espera a que el DOM se haya cargado completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // Función para abrir el popup
    function openPopup() {
        document.getElementById("popup").style.display = "block";
    }

    // Función para cerrar el popup
    function closePopup() {
        document.getElementById("popup").style.display = "none";
    }

    // Función para alternar la visibilidad de las secciones
    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section.style.display === "block") {
            section.style.display = "none";
        } else {
            section.style.display = "block";
        }
    }

    // Conectar los botones con sus respectivas funciones
    document.getElementById("close-btn").addEventListener("click", closePopup);
    document.getElementById("expand-curriculum").addEventListener("click", () => toggleSection("curriculum"));
    document.getElementById("expand-trabajo").addEventListener("click", () => toggleSection("informacion-trabajo"));
    document.getElementById("expand-privada").addEventListener("click", () => toggleSection("informacion-privada"));

    // Abrir el popup automáticamente 1 segundo después de que la página cargue
    setTimeout(openPopup, 1000);
});
</script>
<style>
    /* Estilos generales del popup */
.popup {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 50px;
}

.popup-content {
    background-color: white;
    margin: 5% auto;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
}

.close-btn {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    right: 25px;
    cursor: pointer;
}

.close-btn:hover,
.close-btn:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

/* Estilos de formulario */
form {
    display: flex;
    flex-direction: column;
}

.form-section {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input, select {
    padding: 8px;
    margin: 5px 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Estilos de botones */
button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

/* Secciones desplegables */
.expand-btn {
    background-color: #f0f0f0;
    border: none;
    padding: 10px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
}

.expandable {
    display: none;
    margin-top: 10px;
}

.expandable input {
    width: 100%;
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