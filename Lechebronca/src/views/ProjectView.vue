<template>
  <div v-if="proyecto">
    <h2>{{ proyecto.title }}</h2>
    <img :src="backendUrl + proyecto.filepath" alt="Imagen del proyecto" width="300" />
    <p>{{ proyecto.description }}</p>
  </div>
</template>

<script setup>
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
