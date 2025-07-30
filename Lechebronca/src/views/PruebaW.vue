<template>
  <div class="ventana-wrapper">
    <!-- Imagen de la plantilla de navegador -->
    <img src="../assets/WEB-BROWSER.png" alt="Ventana Retro" class="plantilla" />

    <!-- Contenido dentro de la ventana -->
    <div class="contenido">
      <label>Address:</label>
      <input type="text" :value="url" readonly />
      <button>Go</button>
      <p class="estado">Done</p>
    </div>
  </div>
</template>

<script setup>
const url = 'https://www.youtube.com/watch?v=BpKxQ55DugI'
</script>

<style scoped>
.ventana-wrapper {
  position: relative;
  width: 1000px; /* Ajusta al tamaño real de tu imagen */
  height: 800px;
  font-family: Tahoma, sans-serif;
}

.plantilla {
  width: 100%;
  height: 100%;
  display: block;
}

.contenido {
  position: absolute;
  top: 100px;     /* Ajusta según dónde empieza el "área blanca" */
  left: 30px;
  right: 30px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
}

input {
  padding: 4px;
  width: 100%;
  border: 1px solid #ccc;
}

button {
  width: fit-content;
  padding: 4px 12px;
  background-color: #b6d7a8;
  border: 1px solid black;
  cursor: pointer;
}

.estado {
  position: absolute;
  bottom: -30px;
  left: 10px;
  font-size: 12px;
  color: #333;
}
</style>
