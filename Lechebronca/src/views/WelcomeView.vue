<template>
  <div class="gifprin">
    <img src="@/assets/presstart.gif" class="enter" />
  </div>
</template>

<style scoped>
.gifprin {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/rainbow.gif');
  background-repeat: repeat;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.enter {
  position: absolute;
  top: 50%;
  left: 50%;
  background-image: url('@/assets/rainbow.gif');
  border: solid black 2px;
  transform: translate(-50%, -50%);
  width: 500px;
  height: auto;
  z-index: 1;
}
</style>
