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
  <li class="comentario" v-for="(c, i) in comments" :key="i">
    <span class="icono">👤</span>
    <p class="com">{{ c.content }}</p>
  </li>
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
    display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 90%;
  
  background: none;
 font-family: 'Chicago', 'Courier New', monospace;


}

.icono {
  font-size: 1.3rem;
  margin-right: 10px;
  margin-top: 3px;
}


.com{
   background-color: #ECE9D8;
  padding: 5px 10px;
  border: 2px solid #0050EE;
  border-radius: 5px;
  font-size: 0.8rem;
  flex: 1;
  word-break: break-word;
}

form {
  display: flex;
  flex-direction: column;
   position: sticky;
  bottom: 0;
  z-index: 10
}

.input {
  font-family: inherit;
  border: 2px solid #707070;
  outline: none;
  height: 70px;
}

.btn {
  padding: 0.4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    background-color: rgb(130, 79, 17);
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
}
</style>
