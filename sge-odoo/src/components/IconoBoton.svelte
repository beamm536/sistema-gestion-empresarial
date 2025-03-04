<script>
    export let img;
    export let label = "";
  </script>
  
  <style>
    .icon-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #f5a623;
      color: white;
      font-size: 14px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
      
    }
    .icon-button:hover {
      transform: scale(1.1);
    }
    .icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  </style>
  
  <div class="icon-button">
    <div class="icon">
        <img src={img} alt={label} width="50" height="50" />
    </div> <!-- prop -> para la img -->
    
    <span>{label}</span> <!-- prop -> para el texto -->
  </div>
  