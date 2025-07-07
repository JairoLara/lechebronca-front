<template>
  <RetroWindow>
    <div class="contenedor">
      <div class="ventana">
        <div v-if="proyecto">
          <h2>{{ proyecto.title }}</h2>
          <img :src="backendUrl + proyecto.filepath" alt="Imagen del proyecto" width="300" />
        </div>
      </div>
      <Comentarios />
    </div>
  </RetroWindow>
</template>

<script setup>
import RetroWindow from '@/components/RetroWindow.vue'
import Comentarios from '@/components/ComentsComp.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const backendUrl = 'https://lechebronca-backend-production-b77f.up.railway.app'
const proyecto = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await axios.get(`${backendUrl}/images/${id}`)
    proyecto.value = res.data
  } catch (error) {
    console.error('Error al cargar el proyecto', error)
  }
})
</script>

<style scoped>
.contenedor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 1rem;
}

.comentarios {
  max-width: 300px;
}
.ventana{
  display: flex;
  border: 7px solid #0050EE;
  width: 50vh;
  margin: 1rem;
  padding: 20px;
  border-radius: 10px;
  font-family: 'agency fb', sans-serif;
  box-shadow: 0 0 12px black;
  background-color: #ECE9D8;
  justify-content: center;
}

@media (max-width: 680px) {
  .contenedor {
    flex-direction: column;
    align-items: center;
  }
}
</style>