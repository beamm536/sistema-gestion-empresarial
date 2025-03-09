<script>
  import './styles/IconoBoton.css';
  export let img;
  export let label = "";
  export let enabled = false;
</script>

<div class="icon-button {enabled ? '' : 'disabled'}">
  <div class="icon">
    <img src={img} alt={label} width="50" height="50" />
  </div>
  <span>{label}</span>
</div>
