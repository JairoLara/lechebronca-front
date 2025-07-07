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
  bottom: 10px;
  right: 10px;
  background: none;
  border: 4px solid #0050EE;
  padding: 1rem;
  font-family: 'agency fb', sans-serif;
  max-width: 300px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
.com{
    background-color: bisque;
    margin: 10px;
    padding: 10px;
    border: 4px solid #0050EE;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input {
  padding: 0.5rem;
  font-family: inherit;
  margin-bottom: 0.5rem;
  border: 2px solid #0050EE;
  border-radius: 5px;
  outline: none;
}

.btn {
  padding: 0.4rem;
  font-family: inherit;
  background-color: #0050EE;
  color: white;
  border: none;
  border-radius: 5px;
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
