<template>
  <RetroWindow>
    <div class="projects-window">
       <div class="window-title-bar">
      PROJECTS
     <div class="window-controls">
        <button class="minimizar">_</button>
        <button class="maximizar">☐</button>
        <button @click="irAHome" class="cerrar">✕</button>
      </div>
    </div>
    <div class="projects">

         <ul>
          <li v-for="img in images" :key="img.id">
            <img :src="backendUrl + img.filepath" alt="Imagen" width="100" />
          </li>
        </ul>


      </div>
    </div>
  </RetroWindow>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RetroWindow from '@/components/RetroWindow.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter();

function irAHome() {
  router.push('/');
}

const images = ref([]);

const backendUrl = 'https://lechebronca-backend-production-b77f.up.railway.app';

const fetchImages = async () => {
  try {
    const res = await axios.get(backendUrl + "/images");
    images.value = res.data;
  } catch (error) {
    console.error('Error al cargar imágenes', error);
  }
};

onMounted(fetchImages);

</script>

<style scoped>
.projects-window {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  border: 7px solid #0050EE;
  border-radius: 10px;
  font-family: 'agency fb', sans-serif;
  box-shadow: 0 0 12px black;
  background-color: #ECE9D8;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.window-title-bar {
  background-color: #0050EE;
  color: white;
  font-size: 24px;
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
  border: white 2px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 18px;
  width: 30px;
  height: 30px;
}

.window-controls button.minimizar,button.maximizar {
  display: flex;
  justify-content: center;
  border-radius: 3px;
  align-items: center;
  background: linear-gradient(to bottom, #a8b4cc, #0050EE, #214da5);
  color: white;
  border: white 2px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 18px;
  width: 30px;
  height: 30px;
}
.window-controls button.minimizar:hover, button.maximizar:hover {
  background: linear-gradient(to bottom, #0050EE, #214da5, #a8b4cc);
}

.window-controls button.cerrar:hover {
  background: linear-gradient(to bottom, #ff0000, #a52121, #cca8a8);
}
.projects {
  display: grid;
  gap: 10px;
  
  margin: 4px;
  flex: 1;
  overflow-y: auto;
  padding: 1px;
  border: 2px solid #0050EE;
  padding: 20px;
  background-color: #ffffff;
  width: 70%;
  top: 40px;
  margin-left: auto;
}

.projects ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.projects li {
  margin: 10px 0;
  display: inline-block;
  margin-right: 10px;
  padding: 5px;
}
.projects img {
  max-height: auto;
  width: 400px;
}

</style>
