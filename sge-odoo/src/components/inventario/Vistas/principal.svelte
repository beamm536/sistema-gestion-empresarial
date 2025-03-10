<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { push } from "svelte-spa-router";

    function goHome() {
        push("/");
    }

    const inventario = [
        { producto: "Laptop", cantidad: 35 },
        { producto: "Mouse", cantidad: 120 },
        { producto: "Teclado", cantidad: 85 },
        { producto: "Monitor", cantidad: 40 },
        { producto: "Impresora", cantidad: 15 },
    ];

    const pastelColors = [
        "#FFB3BA",
        "#BAE1FF",
        "#BAFFC9",
        "#FFFFBA",
        "#FFDFBA",
    ];

    let chartCanvas;

    onMount(() => {
        new Chart(chartCanvas, {
            type: "bar",
            data: {
                labels: inventario.map((item) => item.producto),
                datasets: [
                    {
                        label: "Cantidad en Inventario",
                        data: inventario.map((item) => item.cantidad),
                        backgroundColor: pastelColors,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "top" },
                    title: {
                        display: true,
                        text: "Inventario Actual",
                    },
                },
            },
        });
    });
</script>

<div class="contenedor-grafica">
    <div class="container">
        <canvas bind:this={chartCanvas}></canvas>
    </div>
</div>

<button class="home-btn" on:click={goHome} aria-label="Inicio">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="home-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
</button>

<style>
    .contenedor-grafica{
        width: 100vw;
  height: 100vh;
  background-color: #fff; /* Fondo blanco /
  overflow-y: auto; / Para permitir scroll si el contenido es mayor */
  padding: 20px;
  margin-top: 150px;
    }
    .container {
        width: 60%;
        height: 400px;
        margin: auto;
        padding-top: 30px;
    }

    .home-btn {
        position: fixed;
        bottom: 50px;
        right: 50px;
        background-color: #8a7bb7;
        color: white;
        border: none;
        padding: 20px;
        border-radius: 50%;
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
