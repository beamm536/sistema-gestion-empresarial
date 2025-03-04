<script>
    import IconoBoton from "./IconoBoton.svelte";
  
    const icons = [
      { icon: "😀", label: "x" },
      { icon: "🤓", label: "xx" },
      { icon: "📷", label: "xxx" },
      { icon: "💬", label: "xxxx" },
      { icon: "😃", label: "xxxxx" },
      { icon: "🎁", label: "xxxxxx" },
      { icon: "🔄", label: "xxxxxxx" },
      { icon: "📅", label: "xxxxxxxx" },
      { icon: "😆", label: "xxxxxxxxx" },
      { icon: "🏛️", label: "xxxxxxxxxx" }
    ];
  </script>
  
  <style>
    .launcher {
      position: relative;
      width: 300px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
  
    .icons-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  
    .icon-wrapper {
      position: absolute;
      transform: translate(-50%, -50%);
    }
  </style>
  
  <div class="launcher">
    <div class="icons-container">
      {#each icons as { icon, label }, i}
        <div
          class="icon-wrapper"
          style="transform: translate(-50%, -50%) rotate({i * (360 / icons.length)}deg) translate(120px) rotate(-{i * (360 / icons.length)}deg);"
        >
          <IconoBoton {icon} {label} />
        </div>
      {/each}
    </div>
  </div>