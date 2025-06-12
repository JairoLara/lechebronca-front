<template>
  <div class="retro-window">
    <div class="window-title-bar">
      WINDOW
    </div>

    <div class="window-header">
      <span class="window-title">Yisus.site</span>
    </div>

    <nav class="nav-bar">
      <button>HOME</button>
      <button>ABOUT</button>
      <button>PROJECTS</button>
      <button>BLOG</button>
    </nav>

    <div class="window-body">
      <slot />
    </div>

    <footer class="window-footer">
      <div class="contact">
        <p>Contacto:</p>
        <div class="icons">
          <i class="fab fa-facebook-square"></i> XXXXX<br />
          <i class="fab fa-instagram"></i> XXXXX<br />
          <i class="fab fa-whatsapp"></i> +52 811-222-2222<br />
          <i class="fas fa-envelope"></i> example.19@gmail.com
        </div>
      </div>
      <div class="penguin">
        🐧
      </div>
    </footer>
  </div>
</template>

<script setup>
// No script needed unless vas a usar props o slots con nombre
</script>

<style scoped>
.retro-window {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  /*background: #c0c0c0 url('/fondo-estrellas.png');*/
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
}

.nav-bar button {
  background: white;
  border: 2px outset #aaa;
  padding: 0.3rem 0.7rem;
  font-weight: bold;
  cursor: pointer;
}

.window-body {
  flex: 1;
  padding: 1rem;
  background-color: rgba(200, 200, 200, 0.6);
  color: black;
  overflow-y: auto;
}

.window-footer {
  background-color: #0066ff;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact {
  font-size: 12px;
}

.icons i {
  margin-right: 5px;
}

.penguin {
  font-size: 2rem;
}
</style>
