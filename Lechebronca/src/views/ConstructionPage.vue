<template>
    <div class="fondo">
        <img class="conf" src="@/assets/confused-travolta-transparent-background.gif" alt="">
    </div>
</template>

<style scoped>
.fondo {
  background-image: url('@/assets/under_construction.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 0;
}
.conf {
  width: 50%;
  max-width: 1000px; /* o el máximo que desees */
  height: auto;
  display: block;
  margin: 0 auto;
  bottom: 0%;
  z-index: 1;
}
</style>