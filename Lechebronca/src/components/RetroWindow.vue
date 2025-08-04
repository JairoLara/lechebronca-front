<template>
  <div class="retro-window">
    <div class="window-title-bar">
      <img style="height: 15px;" src="@/assets/carpeta.png" alt="">
      Explorador - <strong>{{ currentViewName }}</strong>
      <div class="window-controls">
        <button class="cerrar">✕</button>
      </div>
    </div>

    <div class="window-header">
      <button>Archivo</button>
      <button>Editar</button>
      <button>Vista</button>
      <button>Favoritos</button>
      <button>Herramientas</button>
      <button>Ayuda</button>

      <div class="search-bar">
        <div style="color: #9B998C; margin-left: 6px; font-size: 11px;">
           Address
        </div>

        <div class="search-input">
          D:\PC\Dekstop\<strong>{{ currentViewName }}</strong>
          <button class="arrow">∨</button>
        </div>
        <button class="btn-go">➜</button> Go
        <button style="color: #9B998C; margin-left: 10px;">Links </button>»
      </div>
    </div>

    <div class="window-body">
      <slot />
    </div>
  </div>
  <Navbar></Navbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Navbar from './Navbar.vue'

const route = useRoute()
const currentViewName = ref(route.name)

watch(
  () => route.name,
  (newName) => {
    currentViewName.value = newName
  },
)
</script>

<style scoped>
.retro-window {
  width: auto;
  height: 50%;
  max-width: 650px;
  margin: 0 auto;
  border: 4px solid #0050ee;
  border-radius: 10px;
  box-shadow: 0 0 12px black;
  display: flex;
  flex-direction: column;
  position: relative;
}

.window-title-bar {
  height: 20px;
  background-color: #0050ee;
  color: white;
  font-size: 13px;
}

.window-controls {
  float: right;
  display: flex;
}

.window-controls button.cerrar {
  display: flex;
  justify-content: center;
  border-radius: 3px;
  align-items: center;
  background: linear-gradient(to bottom, #cca8a8, #ff0000, #a52121);
  color: white;
  border: white 1px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 12px;
  width: 18px;
  height: 18px;
}

.window-controls button.minimizar,
button.maximizar {
  display: flex;
  justify-content: center;
  border-radius: 3px;
  align-items: center;
  background: linear-gradient(to bottom, #a8b4cc, #0050ee, #214da5);
  color: white;
  border: white 2px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 18px;
  width: 30px;
  height: 30px;
}
.window-controls button.minimizar:hover,
button.maximizar:hover {
  background: linear-gradient(to bottom, #0050ee, #214da5, #a8b4cc);
}
.window-controls button.cerrar:hover {
  background: linear-gradient(to bottom, #ff0000, #a52121, #cca8a8);
}

.search-bar .btn-go {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 1px;
  font-size: 14px;
  background: linear-gradient(to right, #a5dba5, #5ab95a, #1ba81b);
  color: WHITE;
  margin-left: 10px;
}

.search-bar .btn-go:hover {
  background: linear-gradient(to right, #5ab95a, #1ba81b, #a5dba5);
}

.window-header {
  /* background-color: #0000aa;*/
  color: rgb(0, 0, 0);
  padding: 0.3rem;
  font-weight: bold;
  background-color: #efebd8;
}

.window-header button {
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 11px;
}

.window-header button:hover {
  text-decoration: underline;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 13px;
}
.search-input {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 2px solid #c2c2c2;
  padding: 0.03rem;
  margin-left: 0.5rem;
  width: 42rem;
  font-size: 10px;
  height: 20px;
}

.search-input .arrow {
   margin-left: auto;
  width: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 1px;
  font-size: 16px;
  color: #53678A;
  background: linear-gradient(to bottom, #d4e1f7, #C7DAFB, #98b5e7);

}

.nav-bar {
  display: flex;
  justify-content: space-around;
  background: #0050ee;
  padding: 0.5rem;
  box-shadow: 0 -7px 6px rgba(0, 0, 0, 0.2);
  position: relative;
}

.nav-bar button {
  display: flex;
  justify-content: center;
  background: white;
  border: 5px outset #8d8d8d;
  border-radius: 9px;
  padding: 0.3rem 0.7rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 24px;
  width: 145px;
  max-width: 100%;
  font-family: 'agency fb', sans-serif;
}

@media (max-width: 480px) {
  .nav-bar button {
    font-size: 16px;
    width: 100px;
  }
}

.nav-bar button:hover {
  background: #c0c0c0;
  border: 5px inset #8d8d8d;
}

.window-body {
  flex: 1;
  background-color: #f1f0e8;
  color: black;
  overflow-y: auto;
}
</style>
