<template>
  <FoldersNavbar/>
  <RetroWindow>
    <div class="home-info">
      <img src="@/assets/homeyisus.jpeg" alt="" draggable="false">
    </div>
  </RetroWindow>

</template>

<script setup>

import RetroWindow from '@/components/RetroWindow.vue';
import FoldersNavbar from '@/components/FoldersNavbar.vue';

 document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
</script>

<style scoped>

.home-info {
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}


.home-info img {

   pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

</style>
