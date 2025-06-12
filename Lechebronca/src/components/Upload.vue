<template>
  <div>
    <h2>Subir Imagen</h2>
    <input type="file" @change="onFileChange" />
    <input type="text" v-model="filename" placeholder="Nombre de la imagen" />
    <input type="number" v-model.number="fechaPublicacion" placeholder="Año de publicación" />
    <button @click="uploadImage">Subir</button>

    <h2>Imágenes subidaaaaaaas</h2>
    <ul>
      <li v-for="img in images" :key="img.id">
        <img :src="backendUrl + img.filepath" alt="Imagen" width="100" />
        {{ img.filename }} - Año: {{ img.fechaPublicacion || 'Sin año' }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      filename: '',
      fechaPublicacion: '', // bound as number below
      images: [],
      backendUrl: 'https://lechebronca-backend-production-b77f.up.railway.app'
      // http://localhost:3000 --- local
      // https://lechebronca-backend-production-b77f.up.railway.app --- web
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedFile || !this.filename || !this.fechaPublicacion) {
        alert('Debes completar todos los campos');
        return;
      }

      const parsedYear = parseInt(this.fechaPublicacion);
      const currentYear = new Date().getFullYear();

      if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > currentYear + 1) {
        alert('Año de publicación inválido');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('filename', this.filename.trim());
      formData.append('fechaPublicacion', parsedYear);

      try {
        await axios.post(this.backendUrl + '/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert('Imagen subida correctamente');
        this.filename = '';
        this.fechaPublicacion = '';
        this.selectedFile = null;
        this.fetchImages();
      } catch (error) {
        alert('Error al subir imagen');
        console.error(error);
      }
    },
    async fetchImages() {
      try {
        const res = await axios.get(this.backendUrl + '/images');
        this.images = res.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchImages();
  }
};
</script>
