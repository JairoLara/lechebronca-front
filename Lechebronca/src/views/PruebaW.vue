<template>
  <div class="container">
    <h2>Publicar nuevo artículo</h2>
    <form @submit.prevent="publicarArticulo" class="formulario">
      <input v-model="titulo" type="text" placeholder="Título del artículo" required />
      <textarea v-model="texto" placeholder="Contenido del artículo" rows="5" required></textarea>
      <input v-model.number="fechaPublicacion" type="number" placeholder="Año de publicación" required />
      <button type="submit">Publicar</button>
    </form>

    <hr />

    <h2>Artículos publicados</h2>
    <div v-if="articulos.length === 0">No hay artículos aún.</div>
    <ul>
      <li v-for="articulo in articulos" :key="articulo.id" class="articulo">
        <h3>{{ articulo.titulo }}</h3>
        <p>{{ articulo.texto }}</p>
        <small>Año: {{ articulo.fechaPublicacion }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'https://lechebronca-backend-production-b77f.up.railway.app';

export default {
  name: 'Articulos',
  data() {
    return {
      titulo: '',
      texto: '',
      fechaPublicacion: '',
      articulos: []
    };
  },
  methods: {
    async publicarArticulo() {
      try {
        const nuevo = {
          titulo: this.titulo,
          texto: this.texto,
          fechaPublicacion: this.fechaPublicacion
        };

        const res = await axios.post(`${API_URL}/articles`, nuevo);
        this.articulos.push(res.data);

        // Limpiar formulario
        this.titulo = '';
        this.texto = '';
        this.fechaPublicacion = '';
      } catch (error) {
        console.error('Error al publicar artículo:', error);
        alert('Error al publicar el artículo');
      }
    },
    async obtenerArticulos() {
      try {
        const res = await axios.get(`${API_URL}/articles`);
        this.articulos = res.data;
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      }
    }
  },
  mounted() {
    this.obtenerArticulos();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
.formulario input,
.formulario textarea {
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
}
.formulario button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.articulo {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
