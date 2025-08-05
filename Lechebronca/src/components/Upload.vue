<template>
  <div class="upload-container">
    <h2 class="retro-title">Subir Imagen</h2>

    <label class="retro-label">
      <span>Archivo:</span>
      <input type="file" @change="onFileChange" class="retro-input" />
    </label>

    <label class="retro-label">
      <span>Nombre:</span>
      <input type="text" v-model="filename" placeholder="Nombre de la imagen" class="retro-input" />
    </label>

    <label class="retro-label">
      <span>Año:</span>
      <input type="number" v-model.number="fechaPublicacion" placeholder="Año de publicación" class="retro-input" />
    </label>

    <label class="retro-label">
      <span>Mes:</span>
      <select v-model="mesPublicacion" class="retro-input">
        <option disabled value="">Selecciona el mes</option>
        <option>Enero</option>
        <option>Febrero</option>
        <option>Marzo</option>
        <option>Abril</option>
        <option>Mayo</option>
        <option>Junio</option>
        <option>Julio</option>
        <option>Agosto</option>
        <option>Septiembre</option>
        <option>Octubre</option>
        <option>Noviembre</option>
        <option>Diciembre</option>
      </select>
    </label>

    <button @click="uploadImage" class="retro-button">⬆ Subir</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      filename: '',
      fechaPublicacion: '',
      mesPublicacion: '',
      images: [],
      backendUrl: 'https://lechebronca-backend-production-b77f.up.railway.app'
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedFile || !this.filename || !this.fechaPublicacion || !this.mesPublicacion) {
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
      formData.append('mesPublicacion', this.mesPublicacion);

      try {
        await axios.post(this.backendUrl + '/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert('Imagen subida correctamente');
        this.filename = '';
        this.fechaPublicacion = '';
        this.mesPublicacion = '';
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

<style scoped>
.upload-container {
  font-family: 'Courier New', monospace;
  background-color: #ece9d8;
  border: 4px solid #0050ee;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 0 12px black;
  border-radius: 10px;
}

.retro-title {
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
  color: #000080;
  text-shadow: 1px 1px white;
}

.retro-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 14px;
  color: #000;
}

.retro-input {
  padding: 6px;
  border: 2px solid #7f7f7f;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  font-size: 14px;
}

.retro-button {
  width: 100%;
  background-color: #c0c0c0;
  border: 2px outset #fff;
  padding: 10px;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  cursor: pointer;
  box-shadow: inset -2px -2px 0px #ffffff, inset 2px 2px 0px #808080;
  transition: all 0.2s ease;
}

.retro-button:hover {
  background-color: #a8a8a8;
}
@media (max-width: 880px) {
  .upload-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 95%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .retro-title {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 22px;
  }

  .retro-label {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .retro-label span {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .retro-input {
    font-size: 14px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .retro-button {
    grid-column: 1 / -1;
    padding: 10px;
    font-size: 16px;
    width: 100%;
  }
}


</style>
