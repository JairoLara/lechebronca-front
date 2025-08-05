<template>
  <div class="desktop-navbar">
    <RouterLink
      v-for="(tab, index) in tabs"
      :key="index"
      :to="tab.route"
      class="desktop-icon"
      :class="{ active: activeTab === index }"
      @click="activeTab = index"
    >
      <img :src="tab.icon" alt="icono" />
      <span>{{ tab.label }}</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Ruta a tu imagen de carpeta
import folderIcon from '@/assets/carpeta.png'

const activeTab = ref(0)

const tabs = [
  { label: 'Bienvenida', route: '/', icon: folderIcon },
  { label: 'Videos', route: '/admin', icon: folderIcon },
  { label: 'F.A.Q.', route: '/admin', icon: folderIcon },
  { label: 'Blog', route: '/blog', icon: folderIcon },
  { label: 'Proyectos', route: '/projects', icon: folderIcon }
]
</script>

<style scoped>
.desktop-navbar {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
  width: fit-content;
  background: transparent;
  position: fixed;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
  width: 72px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.desktop-icon img {
  width: 38px;
  height: auto;
}

.desktop-icon span {
  margin-top: 5px;
  font-size: 13px;
  text-shadow: 1px 1px 2px black;
}

.desktop-icon.active span,
.desktop-icon:hover span {
  background-color: rgba(0, 120, 215, 0.5); /* Estilo de selección tipo Windows */
  border-radius: 3px;
  padding: 2px 4px;
}

@media (max-width: 880px) {
  .desktop-navbar{
    visibility: hidden;
  }
}
</style>
