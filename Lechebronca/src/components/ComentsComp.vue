<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const comments = ref([])
const newComment = ref('')
const route = useRoute()
const backendUrl = 'https://lechebronca-backend-production-b77f.up.railway.app'

const fetchComments = async () => {
  try {
    const res = await axios.get(`${backendUrl}/images/${route.params.id}/comments`)
    comments.value = res.data
  } catch (error) {
    console.error('Error al obtener comentarios:', error)
  }
}

const enviarComentario = async () => {
  if (!newComment.value.trim()) return

  try {
    await axios.post(`${backendUrl}/images/${route.params.id}/comments`, {
      content: newComment.value.trim()
    })
    newComment.value = ''
    fetchComments()
  } catch (error) {
    console.error('Error al enviar comentario:', error)
  }
}

onMounted(fetchComments)
</script>

<template>
  <div class="comentarios">

      <p v-if="comments.length === 0">No hay comentarios aún.</p>
      <ul v-else>
          <p class="com" v-for="(c, i) in comments" :key="i">{{ c.content }}</p>
        </ul>
        <form @submit.prevent="enviarComentario">
          <input
            v-model="newComment"
            type="text"
            placeholder="Comentario:"
            class="input"
          />
          <button type="submit" class="btn">Enviar</button>
        </form>
  </div>
</template>

<style scoped>
.comentarios {
  background: none;
  font-family: 'agency fb', sans-serif;
}

.com{
  background-color: #ECE9D8;
  padding: 5px;
  border: 2px solid #0050EE;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  width: 90%;
  margin-left: 10%;}

form {
  display: flex;
  flex-direction: column;
}

.input {
  font-family: inherit;
  border: 2px solid #0050EE;
  outline: none;
  height: 100px;
}

.btn {
  padding: 0.4rem;
  font-family: inherit;
  background-color: #0050EE;
  color: white;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #003bb5;
}

ul {
  padding-left: 0;
}

@media (max-width: 680px) {
  .comentarios {
    display: flex;
    padding: 1px;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    max-width: none;
    flex-wrap: wrap;
  }

  .com{
    background-color: bisque;
    padding: 10px;
    width: 7rem;
    border: 4px solid #0050EE;
  }

  ul {
  display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

  form {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-direction: column;
    align-items: center;
  }
  .btn{
    width: 160px;
  }

  .input {
    width: 160px;
  }
}
</style>
