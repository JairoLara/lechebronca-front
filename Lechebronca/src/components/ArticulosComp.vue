<template>
  <div class="layout">
    <div class="articles-container">
      <div
        v-for="year in uniqueYears"
        :key="year"
        class="year-card">
        <div class="year-header" @click="toggleYear(year)">
          <span>{{ year }}</span>
          <button class="toggle-btn">
            {{ openYear === year ? '▼' : '▶' }}
          </button>
        </div>

        <ul v-if="openYear === year" class="article-list">
          <li
            v-for="article in articlesByYear(year)"
            :key="article.id">
            <a href="#" @click.prevent="selectArticle(article.id)">
              <img class="CDicon" src="@/assets/CD.png"></img> {{ article.titulo }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="article-view" v-if="articuloSeleccionado">
      <h2>{{ articuloSeleccionado.titulo }}</h2>
      <p>{{ articuloSeleccionado.texto }}</p>
      <small><em>Publicado en {{ articuloSeleccionado.fechaPublicacion }}</em></small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'https://lechebronca-backend-production-b77f.up.railway.app'
const articulos = ref([])
const articuloSeleccionado = ref(null)
const openYear = ref(null)

const fetchArticulos = async () => {
  try {
    const res = await axios.get(`${API_URL}/articles`)
    articulos.value = res.data
  } catch (err) {
    console.error('Error al cargar artículos:', err)
  }
}

onMounted(fetchArticulos)

const uniqueYears = computed(() => {
  const years = articulos.value.map((a) => a.fechaPublicacion)
  return [...new Set(years)].sort((a, b) => b - a)
})

const articlesByYear = (year) => {
  return articulos.value.filter((a) => a.fechaPublicacion === year)
}

const toggleYear = (year) => {
  openYear.value = openYear.value === year ? null : year
}

const selectArticle = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/articles/${id}`)
    articuloSeleccionado.value = res.data
  } catch (error) {
    console.error('Error al obtener artículo:', error)
  }
}
</script>

<style scoped>
.layout {
   display: flex;
  max-width: 950px;
  margin: 0 auto;
  height: 100%;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background-color: #f5f9ff;
}

.articles-container {
 width: 150px;
  min-width: 120px;
  background-color: #b3ccff;
  border-right: 4px solid #0040dd;
  padding: 1rem 0.5rem;
  font-family: 'Tahoma', sans-serif;

}

.year-card {
    margin-bottom: 0.5rem;
  background: #e7f0ff;
 border-top-right-radius:8px ;
  border-top-left-radius:8px ;
  border: 2px solid #a0c0f0;
  padding: 0.3rem;
  box-shadow: inset -1px -1px 2px #fff, inset 1px 1px 2px #6789c1;
}

.year-header {
  background-color: #c9ddff;
  border: 2px solid #b0c7f7;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  color: #114ad9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

}

.toggle-btn {
  background: none;
  border: none;
  color: #1154bd;
  font-size: 1rem;
  cursor: pointer;
}

.article-list {
  list-style: none;
  padding: 0.5px 1rem;
  background-color: #c5d1e9;
;
}

.article-list a {
  text-decoration: underline;
  color: #0050ee;
  font-size: 12px;
  cursor: pointer;
}

.CDicon{
  width: 14px;
  height: auto;
  vertical-align: middle;
  margin-right: 5px;
}

.article-list a:hover {
  text-decoration: underline;
  color: red;
}

.article-view {
   flex: 1;
  padding: 1.5rem;
  font-size: 1rem;
  background-image: url('@/assets/hojadelibreta.jpeg');
  background-size: 70rem 44rem;
  background-repeat: no-repeat;
  background-color: #f5f9ff;
  background-position: center center;
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.8;
  color: #0c1b36;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
  border: 3px double #ccc;
  border-radius: 10px;
  min-height: 500px;
}
.article-view h2 {
  font-size: 2.2rem;
  color: #002b6c;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 700;
}

.article-view p {
  margin-bottom: 1rem;
  white-space: pre-wrap; /* mantiene saltos de línea */
}
</style>
