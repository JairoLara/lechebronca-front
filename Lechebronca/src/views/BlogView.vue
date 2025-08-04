<template>
   <FoldersNavbar/>
  <RetroWindow>
    <div class="blog-window">
        <div class="contenido" style="padding: 20px;">
          <PruebaW></PruebaW>
          <div class="gifs">
            <a href="/videos" style="text-decoration: underline; color: #0050EE; text-shadow: black;">> Sección dedicada a videos <</a>
          </div>
        </div>
      </div>
    </RetroWindow>
</template>

<script setup>

import RetroWindow from '@/components/RetroWindow.vue'
import PruebaW from '../components/ArticulosComp.vue'
import FoldersNavbar from '@/components/FoldersNavbar.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

function irAHome() {
  router.push('/')
}

</script>

<style scoped>
.blog-window {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  border-top: 7px solid #0050EE;
  background-position: center center;
  background-size: cover;
  font-family: 'agency fb', sans-serif;
  box-shadow: 0 0 12px black;
  background-image: url('@/assets/paper-texture.gif');
  display: flex;
  flex-direction: column;
  position: relative;
}

.gifs {
  display: flex;
  gap: 3px;
  justify-content: end;
  padding: 10px;
}

.gifs img {
  width: 88px;
  height: 31px;
  padding: 2px;
  background-color: rgb(126, 126, 126);
  border: 1px dashed black;
  box-shadow: inset 0 0 0 1px rgb(190, 190, 190), 0 0 3px rgba(0, 0, 0, 0.5);
  clip-path: polygon(
    5% 0%, 10% 5%, 15% 0%, 20% 5%, 25% 0%,
    30% 5%, 35% 0%, 40% 5%, 45% 0%, 50% 5%,
    55% 0%, 60% 5%, 65% 0%, 70% 5%, 75% 0%,
    80% 5%, 85% 0%, 90% 5%, 95% 0%, 100% 5%,
    100% 95%, 95% 100%, 90% 95%, 85% 100%, 80% 95%,
    75% 100%, 70% 95%, 65% 100%, 60% 95%, 55% 100%,
    50% 95%, 45% 100%, 40% 95%, 35% 100%, 30% 95%,
    25% 100%, 20% 95%, 15% 100%, 10% 95%, 5% 100%,
    0% 95%, 0% 5%
  );
  image-rendering: pixelated;
}

.window-title-bar {
  background-color: #0050EE;
  color: white;
  font-size: 24px;
}

.window-controls {
  float: right;
  display: flex;

}

.window-controls button.cerrar {
  display: flex;
  justify-content: center;
  border-radius: 3px;
  align-items: center;
  background: linear-gradient(to bottom, #cca8a8, #ff0000, #a52121);
  color: white;
  border: white 2px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 18px;
  width: 30px;
  height: 30px;
}

.window-controls button.minimizar,button.maximizar {
  display: flex;
  justify-content: center;
  border-radius: 3px;
  align-items: center;
  background: linear-gradient(to bottom, #a8b4cc, #0050EE, #214da5);
  color: white;
  border: white 2px solid;
  padding: 0.5rem;
  margin: 2px;
  cursor: pointer;
  font-size: 18px;
  width: 30px;
  height: 30px;
}
.window-controls button.minimizar:hover, button.maximizar:hover {
  background: linear-gradient(to bottom, #0050EE, #214da5, #a8b4cc);
}

.window-controls button.cerrar:hover {
  background: linear-gradient(to bottom, #ff0000, #a52121, #cca8a8);
}

.contenido{
    font-size: 25px;
}
</style>
