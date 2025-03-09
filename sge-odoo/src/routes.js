//nuestro archivo para definir las rutas :)

import Home from './components/Estructura.svelte';
import EmpleadosVista from './components/empleados/EmpleadosVista.svelte';
import InventarioVista from './components/inventario/InventarioVista.svelte';

export default{
    '/': Home,
    '/empleados': EmpleadosVista,
    '/inventario': InventarioVista
};