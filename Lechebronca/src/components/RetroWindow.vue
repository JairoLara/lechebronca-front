<template>
  <div class="retro-window">

    <div class="window-title-bar">
      WINDOW
      <div class="window-controls">
        <button class="minimizar">_</button>
        <button class="maximizar">☐</button>
        <button class="cerrar">✕</button>
      </div>
    </div>

    <div class="window-header">
      <span class="window-title">LECHEBRONCA</span>
    </div>
    <RouterLink to="/admin">h</RouterLink>
    <nav class="nav-bar">
      <button @click="irAHome">HOME</button>
      <button>ABOUT</button>
      <button @click="irAProjects">PROJECTS</button>
      <button @click="irABlog">BLOG</button>
    </nav>

    <div class="window-body">
      <slot />
    </div>
  </div>
</template>

<script setup>

import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();

function irAProjects() {
  router.push('/projects');
}
function irAHome() {
  router.push('/');
}
function irABlog() {
  router.push('/blog');
}
</script>

<style scoped>
.retro-window {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  border: 7px solid #0050EE;
  border-radius: 10px;
  font-family: 'agency fb', sans-serif;
  box-shadow: 0 0 12px black;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

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

.window-header {
 /* background-color: #0000aa;*/
  color: rgb(0, 0, 0);
  padding: 0.1rem;
  font-weight: bold;
  background-color: rgba(200, 200, 200, 0.6);
  font-size: 58px;
}

.nav-bar {
  display: flex;
  justify-content: space-around;
  background: #0050EE;
  padding: 0.5rem;
  box-shadow: 0 -7px 6px rgba(0, 0, 0, 0.2);
}

.nav-bar button {
  display: flex;
  justify-content: center;
  background: white;
  border: 5px outset #8d8d8d;
  border-radius: 9px;
  padding: 0.3rem 0.7rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 24px;
  width: 145px;
  font-family: 'agency fb', sans-serif;
}
.nav-bar button:hover {
  background: #c0c0c0;
  border: 5px inset #8d8d8d;
}

.window-body {
  flex: 1;
  padding: 1rem;
  background-color: rgba(200, 200, 200, 0.6);
  color: black;
  overflow-y: auto;
}

</style>
