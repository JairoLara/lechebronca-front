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
  gap: 2rem;
  padding: 1rem;
}

.articles-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.year-card {
  background: linear-gradient(to bottom, #d4e5ff, #a9c8ff);
  border: 2px solid #d4e5ff;
  border-top-right-radius: 16px;
  box-shadow:
    inset -2px -2px 4px #ffffff,
    inset 2px 2px 4px #5a91e2;
  overflow: hidden;
}

.year-header {
  background: linear-gradient(to bottom, #d4e5ff, #92baff);
  color: #1154bd;
  padding: 0.5rem 14px;
  font-weight: bold;
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
  padding: 0.5rem 1rem;
  background-color: #c5d1e9;
}

.article-list li {
  margin-bottom: 0.5rem;
}

.article-list a {
  text-decoration: underline;
  color: #0050ee;
  cursor: pointer;
}

.CDicon{
  width: 20px;
  height: auto;
}

.article-list a:hover {
  text-decoration: underline;
  color: red;
}

.article-view {
  flex: 1;
  background-color: #d3d3d3;
  border: 2px dashed #ccc;
  padding: 1rem;
  border-radius: 10px;
  min-width: 0;
}
</style>
