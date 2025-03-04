<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import IconoBoton from './components/IconoBoton.svelte';
    import Estructura from './components/Estructura.svelte';
</script>


  <div class="app">
    <!-- <IconoBoton /> -->
    <Estructura />
  </div>


<style>
   html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #5a2a56;
  }
  
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
</style>
