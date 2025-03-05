<script>
  import './styles/IconoBoton.css'

  export let img;
  export let label = "";
  
</script>
  
  
  <div class="icon-button">
    <div class="icon">
        <img src={img} alt={label} width="50" height="50" />
    </div> <!-- prop -> para la img -->
    
    <span>{label}</span> <!-- prop -> para el texto -->
  </div>
  