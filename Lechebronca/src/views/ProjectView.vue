<template>
    <FoldersNavbar/>
  <RetroWindow>
    <div class="contenedor">
      <!-- Imagen del proyecto -->
      <div class="ventana">
        <div v-if="proyecto">
          <h2>{{ proyecto.filename }}</h2>
          <img class="imagen-proyecto" :src="backendUrl + proyecto.filepath" alt="Imagen del proyecto" />
        </div>
      </div>

      <!-- Comentarios al lado derecho -->
      <div class="comentarios">
        <div class="comentarios-header">
          <span>Comentarios</span>
          <span class="flecha">👈</span>
        </div>
        <Comentarios />
      </div>
    </div>
  </RetroWindow>
</template>

<script setup>
import RetroWindow from '@/components/RetroWindow.vue'
import Comentarios from '@/components/ComentsComp.vue'
import FoldersNavbar from '@/components/FoldersNavbar.vue'
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
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  flex-wrap: nowrap; /* 🔧 Esto evita que salte a otra línea */
}

/* Sección de la imagen */
.ventana {
  flex: 1;
  min-width: 370px;
  max-width: 600px;
  border: 3px solid #0050EE;
  padding: 10px;
  font-family: 'agency fb', sans-serif;
  box-shadow: 0 0 12px black;
  background-color: #ffffff;
}

/* Sección de comentarios */
.comentarios {
  flex: 1;
  min-width: 190px;
  max-width: 600px;
  border: 2px dashed #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  /* 🧩 Prevención de overflow horizontal */
  overflow-x: hidden;

  /* 📜 Si hay muchos comentarios, scroll vertical */
  overflow-y: auto;

  /* 📐 Control de tamaño */
  max-height: 80vh;

  /* 🧵 Control de texto */
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Flechita con texto arriba */
.comentarios-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1.1rem;
}

.flecha {
  font-size: 1.5rem;
  margin-left: 8px;
}

/* Título */
.ventana h2 {
  font-size: 2.3rem;
  margin-bottom: 10px;
}

/* Imagen */
.ventana img {
  width: 100%;
  height: auto;
  display: block;
}

/* RESPONSIVO */
@media (max-width: 880px) {
  .contenedor {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap; /* Permite el salto en pantallas pequeñas */
  }

  .comentarios {
    max-width: 100%;
  }

  .flecha {
    display: none;
  }

 .imagen-proyecto {
    width: 100%;
    display: block;
    max-width: 300px;
    height: auto;
    margin: 0 auto;
  }
}
</style>
