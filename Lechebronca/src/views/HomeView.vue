<template>
  <FoldersNavbar/>
  <RetroWindow>
    <div class="home-info">
      <img src="@/assets/homeyisus.jpeg" alt="">
    </div>
  </RetroWindow>

</template>

<script setup>

import RetroWindow from '@/components/RetroWindow.vue';
import FoldersNavbar from '@/components/FoldersNavbar.vue';
</script>

<style scoped>

.home-info img {
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

</style>
