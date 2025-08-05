<template>
    <FoldersNavbar/>
  <RetroWindow>
    <div class="projects-content">
      <div class="projects-window">
        <div class="window-title-bar">
          <img style="height: 15px;" src="@/assets/carpeta.png" alt="">
          Projects

          <div class="window-controls">
            <button @click="irAHome" class="cerrar">✕</button>
          </div>
        </div>

        <div class="content-wrapper">
          <div class="years">
            <ul>
              <li v-for="year in uniqueYears" :key="year" class="year-container">
                <div @click="toggleYear(year)" class="year-button">
                  {{ year }}
                </div>

                <div v-if="openYear === year" class="months-list">
                  <div
                    v-for="month in monthsByYear(year)"
                    :key="month"
                    @click="selectMonth(year, month)"
                    :class="{ 'month-item': true, active: selectedYear === year && selectedMonth === month }"
                  >
                    {{ month }}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="projects">
            <h2 v-if="selectedMonth">{{ selectedYear }} - {{ selectedMonth }}</h2>
            <ul>
              <li v-for="img in filteredImages" :key="img.id">
                <router-link :to="`/project/${img.id}`">
                  <img :src="backendUrl + img.filepath" alt="Imagen" />
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </RetroWindow>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'
import RetroWindow from '@/components/RetroWindow.vue'
import FoldersNavbar from '@/components/FoldersNavbar.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
function irAHome() {
  router.push('/')
}

const images = ref([])
const openYear = ref(null)
const selectedYear = ref(null)
const selectedMonth = ref(null)
const backendUrl = 'https://lechebronca-backend-production-b77f.up.railway.app'

// Obtener imágenes desde el backend
const fetchImages = async () => {
  try {
    const res = await axios.get(backendUrl + '/images')
    images.value = res.data
  } catch (error) {
    console.error('Error al cargar imágenes', error)
  }
}

// Años únicos para mostrar
const uniqueYears = computed(() => {
  const years = images.value
    .filter((img) => img.fechaPublicacion)
    .map((img) => img.fechaPublicacion)
  return Array.from(new Set(years)).sort((a, b) => a - b)
})

// Meses únicos según el año
const monthsByYear = (year) => {
  const months = images.value
    .filter((img) => img.fechaPublicacion === year)
    .map((img) => img.mesPublicacion)
  return Array.from(new Set(months)).sort()
}

// Mostrar imágenes solo si hay mes y año seleccionado
const filteredImages = computed(() => {
  if (!selectedYear.value || !selectedMonth.value) return []
  return images.value.filter(
    (img) =>
      img.fechaPublicacion === selectedYear.value && img.mesPublicacion === selectedMonth.value,
  )
})

// Cuando le picas al año, solo se expande su lista de meses
const toggleYear = (year) => {
  openYear.value = openYear.value === year ? null : year
}

// Cuando eliges un mes, ahora sí cambia el contenido mostrado
const selectMonth = (year, month) => {
  selectedYear.value = year
  selectedMonth.value = month
}

onMounted(fetchImages)
</script>

<style scoped>
.projects-content {
  padding: 1rem;
}

.projects-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  border: 4px solid #0050ee;
  border-radius: 10px;
  box-shadow: 0 0 12px black;
  background-color: #ece9d8;
  position: relative;
}

.window-title-bar {
  height: 20px;
  background-color: #0050ee;
  color: white;
  font-size: 13px;
}

.window-controls {
  position: absolute;
  right: 10px;
  top: -2px;
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
  margin: 2px;
  cursor: pointer;
  font-size: 12px;
  width: 18px;
  height: 18px;
}

.window-controls button.cerrar {
  background: linear-gradient(to bottom, #cca8a8, #ff0000, #a52121);
}
.window-controls button.minimizar,
.window-controls button.maximizar {
  background: linear-gradient(to bottom, #a8b4cc, #0050ee, #214da5);
}
.window-controls button.minimizar:hover,
.window-controls button.maximizar:hover {
  background: linear-gradient(to bottom, #0050ee, #214da5, #a8b4cc);
}
.window-controls button.cerrar:hover {
  background: linear-gradient(to bottom, #ff0000, #a52121, #cca8a8);
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.projects {
  flex: 1;
  margin: 4px;
  padding: 20px;
  border: 4px solid #0050ee;
  background-color: #ffffff;
  width: 70%;
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.projects ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1; /* hace que el scroll solo se aplique aquí */

  padding: 10px;
  scroll-behavior: smooth;
}
.projects li {
  display: inline-block;
  margin: 10px;
}
.projects img {
  width: 230px;
}
.projects h2 {
  text-align: center;
  font-size: 54px;
  text-decoration: underline;
  animation: color 2.3s infinite;
  flex-shrink: 0;
}

@keyframes color {
  0% {
    color: red;
  }
  14% {
    color: orange;
  }
  28% {
    color: yellow;
  }
  42% {
    color: green;
  }
  57% {
    color: blue;
  }
  71% {
    color: indigo;
  }
  85% {
    color: violet;
  }
  100% {
    color: red;
  }
}

.years {
  width: 130px;
  background-color: #d4d4d4;
  border: 2px solid #0050ee;
  padding: 10px;
  margin: 10px 0 0 25px;
  font-family: 'agency fb', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow:
    inset -3px -3px 0px #ffffff,
    inset 3px 3px 0px #7d7d7d;
}

.years ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.years ul li {
  margin: 10px 0;
  padding: 12px 8px;
  text-align: center;
  background-color: #e0e0e0;
  border: 2px solid #777;
  font-size: 18px;
  cursor: pointer;
  box-shadow:
    inset -2px -2px 0px #fff,
    inset 2px 2px 0px #555;
}



/* Retro estilo del scroll */
.projects ul::-webkit-scrollbar {
  width: 14px;
}
.projects ul::-webkit-scrollbar-track {
  background: #c0c0c0;
  border: 2px inset #ffffff;
}
.projects ul::-webkit-scrollbar-thumb {
  background-color: #808080;
  border: 2px outset #dcdcdc;
}
.projects ul::-webkit-scrollbar-thumb:hover {
  background-color: #0050ee;
}

.projects ul {
  scrollbar-color: rgb(255, 255, 255) #bdbcbc;
  scrollbar-width: thin;
}

.projects li {
  display: inline-block;
  margin: 10px;
}
.projects img {
  width: 230px;
}

@media (max-width: 480px) {
  .content-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .years {
    margin: 10px auto;
    width: 90%;
    flex-direction: row;
    justify-content: center;
    overflow-x: auto;
    gap: 10px;
  }

  .years ul {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .years ul li {
    flex: 0 0 auto;
    font-size: 16px;
    padding: 10px;
    min-width: 50px;
  }

  .projects {
    width: 100%;
    padding: 10px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    margin: 0;
    overflow-y: auto; /* Agrega scroll si es necesario */
    border: none;
    background-color: #ece9d8;
  }

  .projects img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .projects h2 {
    font-size: 36px;
  }

  .projects ul {
    overflow-y: auto;
    max-height: 60vh;
    padding-right: 8px;
  }
}

/* 🔷 Año - con fondo gif */
.year-container {
  margin: 10px 0;
}

.year-button {

  color: rgb(49, 49, 49);
  font-size: 18px;
  padding: 12px 8px;
  text-align: center;
  cursor: pointer;
  border: none;
  box-shadow:
    inset -2px -2px 0px #ffffff,
    inset 2px 2px 0px #7d7d7d;
}
.year-button:hover {
    background-image: url('https://img1.picmix.com/output/stamp/normal/8/3/1/8/2498138_cf86a.gif');
  color: white;
}


/* ✅ Meses - sin heredar estilo del año */
.months-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0 12px;
  align-items: center;
}

.month-item {
  font-size: 14px;
  color: #0050ee;
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  box-shadow: none;
  user-select: none;
}

.month-item:hover {
  color: red;
}

.month-item.active {
  font-weight: bold;
  color: darkred;
}


</style>
