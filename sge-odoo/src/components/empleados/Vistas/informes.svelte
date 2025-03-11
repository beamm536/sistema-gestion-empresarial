<script>
  import { push } from 'svelte-spa-router';
  import * as d3 from "d3";
  import { onMount } from "svelte";

  function goHome(){
    push('/');
  }

  let data_synthetic = [
    { contratos: 5, fecha: "01-03-2024" },
    { contratos: 8, fecha: "02-03-2024" },
    { contratos: 3, fecha: "03-03-2024" },
    { contratos: 7, fecha: "04-03-2024" },
    { contratos: 6, fecha: "05-03-2024" },
  ];

  onMount(() => {
    buildChart(data_synthetic);
  });

  function buildChart(data) {
    // Definir márgenes y dimensiones
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 370 - margin.top - margin.bottom;

    // Seleccionar el SVG y aplicar dimensiones y grupo de trabajo
    const svg = d3
      .select("#bar-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escala x tipo band para datos categóricos
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.fecha))
      .range([0, width])
      .padding(0.2);

    // Escala y lineal
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.contratos) + 2])
      .nice()
      .range([height, 0]);

    // Eje x con etiquetas rotadas
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "#8A8A8A");

    // Eje y
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "#8A8A8A");

    // Rejilla en el eje y para facilitar la lectura
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width)
          .tickFormat("")
      );

    // Dibujar barras con transición
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.fecha))
      .attr("y", height) // inicia en la parte inferior
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "#ffb6c1")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#ff91a4");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#ffb6c1");
      })
      .transition()
      .duration(800)
      .attr("y", d => y(d.contratos))
      .attr("height", d => height - y(d.contratos));

    // Añadir etiquetas de valor encima de cada barra
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => x(d.fecha) + x.bandwidth() / 2)
      .attr("y", d => y(d.contratos) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#8A8A8A")
      .text(d => d.contratos);
  }
</script>

<div class="container">
  <h2>Contratos por Fecha</h2>
  <div class="chart-container">
    <svg id="bar-chart"></svg>
  </div>
</div>

<button class="home-btn" on:click={goHome} aria-label="Inicio">
  <svg xmlns="http://www.w3.org/2000/svg" class="home-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
</button>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    /* Se reduce el margen superior para subir el contenido */
    margin-top: 2%;
  }

  h1 {
    margin-bottom: 20px;
    color: #8A8A8A;
  }

  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Estilo para la rejilla: líneas grises claras */
  .grid line {
    stroke: #ddd;
    stroke-dasharray: 3;
  }

  /* Botón Home */
  .home-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #8A7BB7;
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
