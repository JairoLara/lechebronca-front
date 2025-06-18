<template>
  <RetroWindow>
    <div class="projects-content">
      <div class="projects-window">
        <div class="window-title-bar">
          PROJECTS
          <div class="window-controls">
            <button class="minimizar">_</button>
            <button class="maximizar">☐</button>
            <button @click="irAHome" class="cerrar">✕</button>
          </div>
        </div>

        <!-- NUEVO contenedor para alinear horizontalmente -->
        <div class="content-wrapper">
          <div class="years">
            <ul>
              <li
                v-for="year in uniqueYears"
                :key="year"
                @click="filterByYear(year)"
                :class="{ active: year === selectedYear }"
              >
                {{ year }}
              </li>
            </ul>
          </div>

          <div class="projects">
            <h2>{{ selectedYear }}</h2>
            <ul>
              <li v-for="img in filteredImages" :key="img.id">
                <router-link :to="`/project/${img.id}`">
                  <img :src="backendUrl + img.filepath" alt="Imagen" width="100" />
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
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
function irAHome() {
  router.push('/')
}

const images = ref([])
const selectedYear = ref(null)
const backendUrl = 'https://lechebronca-backend-production-b77f.up.railway.app'

const fetchImages = async () => {
  try {
    const res = await axios.get(backendUrl + '/images')
    images.value = res.data
    if (uniqueYears.value.length && !selectedYear.value) {
      selectedYear.value = uniqueYears.value[0]
    }
  } catch (error) {
    console.error('Error al cargar imágenes', error)
  }
}

const uniqueYears = computed(() => {
  const years = images.value
    .filter((img) => img.fechaPublicacion)
    .map((img) => img.fechaPublicacion)

  return Array.from(new Set(years)).sort((a, b) => a - b)
})

const filterByYear = (year) => {
  selectedYear.value = year
}

const filteredImages = computed(() => {
  if (!selectedYear.value) return images.value
  return images.value.filter((img) => img.fechaPublicacion === selectedYear.value)
})

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
  max-width: 850px;
  margin: 0 auto;
  border: 7px solid #0050ee;
  border-radius: 10px;
  font-family: 'agency fb', sans-serif;
  box-shadow: 0 0 12px black;
  background-color: #ece9d8;
  position: relative;
}

.window-title-bar {
  background-color: #0050ee;
  color: white;
  font-size: 24px;
  padding: 4px;
  position: relative;
}

.window-controls {
  position: absolute;
  right: 10px;
  top: 5px;
  display: flex;
}

.window-controls button.cerrar,
.window-controls button.minimizar,
.window-controls button.maximizar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  color: white;
  border: white 2px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 18px;
  width: 30px;
  height: 30px;
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

.years ul li.active,
.years ul li:hover {
  background-image: url('https://img1.picmix.com/output/stamp/normal/8/3/1/8/2498138_cf86a.gif');
  color: white;
  border-color: #ffffff;
  font-weight: bold;
  box-shadow:
    inset -2px -2px 0px #cccccc,
    inset 2px 2px 0px #0018aa;
  transform: translateY(-1px);
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
</style>
