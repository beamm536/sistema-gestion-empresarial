<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    // Datos de ventas totales para diferentes productos en varios días
    const salesData = [
      { day: "2021-09-01", productoA: 150, productoB: 120, productoC: 200 },
      { day: "2021-09-02", productoA: 180, productoB: 100, productoC: 220 },
      { day: "2021-09-03", productoA: 170, productoB: 130, productoC: 210 },
      { day: "2021-09-04", productoA: 160, productoB: 140, productoC: 230 },
      { day: "2021-09-05", productoA: 190, productoB: 110, productoC: 240 },
    ];
  
    // Preparar etiquetas y datos para cada producto
    const labels = salesData.map(item => item.day);
    const productoAData = salesData.map(item => item.productoA);
    const productoBData = salesData.map(item => item.productoB);
    const productoCData = salesData.map(item => item.productoC);
  
    let chart;      // variable para almacenar la instancia del gráfico
    let chartCanvas; // referencia al elemento canvas
  
    onMount(() => {
      chart = new Chart(chartCanvas, {
        type: 'bar', // Puedes cambiar a 'line' si prefieres un gráfico de líneas
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Producto A',
              data: productoAData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Producto B',
              data: productoBData,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Producto C',
              data: productoCData,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Ventas Totales'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Días'
              }
            }
          }
        }
      });
    });
  </script>
  
  <style>
    .chart-container {
      width: 80vw;
      margin: 0 auto;
    }
  </style>
  
  <div class="chart-container">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
  