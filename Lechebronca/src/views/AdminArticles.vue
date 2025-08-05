<template>
<folders-navbar/>
    <retro-window>
  <div class="container">
    <h2>Agregar Nuevo Artículo</h2>
    <form @submit.prevent="enviarArticulo">
      <label for="titulo">Título:</label>
      <input type="text" id="titulo" v-model="titulo" required />

      <label for="texto">Texto:</label>
      <textarea id="texto" v-model="texto" rows="6" required></textarea>

      <label for="fecha">Año de Publicación:</label>
      <input
        type="number"
        id="fecha"
        v-model="fechaPublicacion"
        min="1900"
        :max="maxAnio"
        required
      />

      <button type="submit">Guardar Artículo</button>

      <p v-if="mensaje" class="mensaje">{{ mensaje }} <router-link to="/blog">Ir a blog</router-link></p>
    </form>
  </div>
  </retro-window>
</template>

<script setup>
import { ref } from 'vue'
import RetroWindow from '@/components/RetroWindow.vue'
import FoldersNavbar from '@/components/FoldersNavbar.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const titulo = ref('')
const texto = ref('')
const fechaPublicacion = ref('')
const mensaje = ref('')
const maxAnio = new Date().getFullYear() + 1

const enviarArticulo = async () => {
  mensaje.value = ''

  if (!titulo.value || !texto.value || !fechaPublicacion.value) {
    mensaje.value = 'Todos los campos son obligatorios.'
    return
  }

  const parsedFecha = parseInt(fechaPublicacion.value)

  if (isNaN(parsedFecha) || parsedFecha < 1900 || parsedFecha > maxAnio) {
    mensaje.value = 'Año de publicación inválido.'
    return
  }

  try {
    const res = await fetch('https://lechebronca-backend-production-b77f.up.railway.app/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: titulo.value,
        texto: texto.value,
        fechaPublicacion: parsedFecha
      })
    })

    const data = await res.json()

    if (!res.ok) {
      mensaje.value = data.message || 'Error al guardar el artículo.'
    } else {
      mensaje.value = 'Artículo guardado exitosamente.'
      titulo.value = ''
      texto.value = ''
      fechaPublicacion.value = ''
    }
  } catch (err) {
    console.error(err)
    mensaje.value = 'Error de red o del servidor.'
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  background: #c0c0c0; /* gris típico de XP */
  padding: 20px;
  border: 2px solid #000080;
  border-radius: 4px;
  box-shadow: inset -2px -2px 0 #ffffff, inset 2px 2px 0 #808080;
  font-family: "Tahoma", sans-serif;
  color: black;
}

/* Títulos estilo XP */
h2 {
  background-color: #000080;
  color: white;
  padding: 10px;
  margin: -20px -20px 20px;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px #000;
}

/* Inputs estilo XP */
input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 2px solid #808080;
  border-radius: 0;
  background-color: white;
  font-size: 14px;
  box-shadow: inset -1px -1px 0 #ffffff, inset 1px 1px 0 #c0c0c0;
  font-family: "Tahoma", sans-serif;
  color: black;
}

/* Botón estilo XP */
button {
  background: linear-gradient(to bottom, #e0e0e0, #c0c0c0);
  border: 2px outset #d4d0c8;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Tahoma", sans-serif;
  color: black;
}

button:hover {
  background: linear-gradient(to bottom, #ffffff, #dcdcdc);
}

/* Mensaje */
.mensaje {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffcc;
  border: 1px solid #cccc99;
  font-size: 14px;
  color: #333;
}

/* Responsivo */
@media (max-width: 880px) {
  .container {
    margin: 20px 10px;
    padding: 15px;
    max-width: 100%;
    font-size: 14px;
  }

  h2 {
    font-size: 16px;
    padding: 8px;
  }

  input,
  textarea {
    font-size: 13px;
    padding: 6px;
  }

  button {
    font-size: 13px;
    padding: 6px 12px;
  }

  .mensaje {
    font-size: 13px;
  }
}
</style>

