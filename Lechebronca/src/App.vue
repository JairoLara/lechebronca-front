<template>
  <div id="app">
    <router-view />
  </div>
  <audio ref="bgMusic" src="/music.mp3" loop></audio>
</template>

<script>
export default {
  name: 'App'
  ,
  mounted() {
    this.$refs.bgMusic.play().catch(error => {
      console.error('Error al reproducir la música de fondo:', error);
    });
}
}


</script>
