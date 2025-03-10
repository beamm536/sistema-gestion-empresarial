<script>
  import { push } from 'svelte-spa-router';
    function goHome(){
    push('/');
  }
  import * as d3 from "d3";
  import { onMount } from "svelte";

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
    const svg = d3.select("#bar-chart");
    const height = 300;
    const width = 500;
    const barWidth = 50;
    const barSpacing = 50;
    const marginBottom = 70;
    const marginLeft = 70;

    svg.attr("width", width).attr("height", height + marginBottom);

    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.contratos)])
      .range([height, 0]);

    let offsetX = marginLeft;

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => offsetX + i * (barWidth + barSpacing))
      .attr("y", (d) => scaleY(d.contratos))
      .attr("width", barWidth)
      .attr("height", (d) => height - scaleY(d.contratos))
      .attr("fill", "steelblue")
      .append("title")
      .text((d) => `${d.contratos} contratos`);

    svg
      .selectAll("text.value")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value")
      .attr("x", (d, i) => offsetX + i * (barWidth + barSpacing) + barWidth / 2)
      .attr("y", (d) => scaleY(d.contratos) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => d.contratos);

    svg
      .selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d, i) => offsetX + i * (barWidth + barSpacing) + barWidth / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => d.fecha);
  }
</script>

<div class="container">
  <h1>Contratos por Fecha</h1>
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
  svg {
    height: 370px;
    width: 600px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 5%;
  }

  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
