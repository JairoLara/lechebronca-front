<template>
  <div>
    <nav v-if="isVisible" class="xp-navbar">
      <div class="start-btn">
        <img src="@/assets/winxp.png" /><span>start</span>
      </div>

      <div class="tabs">
        <RouterLink to="/"><div class="tab" :class="{ active: activeTab === 0 }" @click="activeTab = 0"><img src="@/assets/carpeta.png" />Bienvenida</div></RouterLink>
        <RouterLink to="/admin"><div class="tab" :class="{ active: activeTab === 1 }" @click="activeTab = 1"><img src="@/assets/carpeta.png" />Videos</div></RouterLink>
        <RouterLink to="/admin"><div class="tab" :class="{ active: activeTab === 2 }" @click="activeTab = 2"><img src="@/assets/carpeta.png" />Recursos</div></RouterLink>
        <RouterLink to="/admin"><div class="tab" :class="{ active: activeTab === 3 }" @click="activeTab = 3"><img src="@/assets/carpeta.png" />F.A.Q.</div></RouterLink>
        <RouterLink to="/blog"><div class="tab" :class="{ active: activeTab === 4 }" @click="activeTab = 4"><img src="@/assets/carpeta.png" />Blog</div></RouterLink>
        <RouterLink to="/projects"><div class="tab" :class="{ active: activeTab === 5 }" @click="activeTab = 5"><img src="@/assets/carpeta.png" />Projectos</div></RouterLink>
        <RouterLink to="/admin"><div class="tab" :class="{ active: activeTab === 6 }" @click="activeTab = 6"><img class="admic" src="@/assets/adminic.png" />Administracion</div></RouterLink>
      </div>

      <div class="clock">
        <span>EN</span>
        <span>🖥️ {{ currentTime }}</span>
      </div>
    </nav>

    <button class="toggle-btn" @click="toggleNavbar">
      {{ isVisible ? 'Ocultar barra' : 'Mostrar barra' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: '',
      activeTab: 0,
      isVisible: true
    }
  },
  methods: {
    updateTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      this.currentTime = `${hours}:${minutesStr} ${ampm}`;
    },
    toggleNavbar() {
      this.isVisible = !this.isVisible;
      localStorage.setItem('xp-navbar-visible', this.isVisible ? '1' : '0');
    }
  },
  mounted() {
    //Relo
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);

    //se queda oculto nav
    const savedState = localStorage.getItem('xp-navbar-visible');
    if (savedState === '0') {
      this.isVisible = false;
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
.xp-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, #245edb, #486eaa);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-family: Tahoma, sans-serif;
  font-size: 13px;
  color: white;
  box-shadow: inset 1px 1px 1px #ffffff88, inset -1px -1px 1px #0004;
  z-index: 1000;
}

.start-btn {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #0e7900, #25b400);
  padding: 3px 10px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 6px;
  flex: 1;
  margin: 0 10px;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(to bottom, #5995f7, #2c5fc5);
  padding: 3px 10px;
  border: 1px solid #123a96;
  border-radius: 2px;
  color: white;
  white-space: nowrap;
  box-shadow: inset 1px 1px 1px #ffffff88, inset -1px -1px 1px #0004;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}
.tabs a {
  text-decoration: none;
}
.tab:hover {
  background: linear-gradient(to bottom, #5d90e9, #3a70d0);
}

.tab.active {
  background: linear-gradient(to bottom, #1e3a7c, #153269);
  box-shadow: inset 1px 1px 4px #0009, inset -1px -1px 6px #000c;
}

.admic {
  width: 22px;
  height: auto;
}

.clock {
  display: flex;
  background: linear-gradient(to bottom, #80b1ff, #2c5fc5);
  padding: 10px;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

/* Toggle button */
.toggle-btn {
  position: fixed;
  bottom: 70px;
  right: 20px;
  background: #245edb;
  color: white;
  border: none;
  padding: 8px 12px;
  font-family: Tahoma, sans-serif;
  font-size: 13px;
  border-radius: 4px;
  box-shadow: 1px 1px 4px #0005;
  cursor: pointer;
  z-index: 1100;
}
</style>
