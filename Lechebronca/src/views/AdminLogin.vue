<template>
  <div class="contenedor-prin">
    <div class="admin-login">
      <p class="texto">El siguiente destino esta protegido por un código, ingresa el código correcto.</p>

      <form class="campos" @submit.prevent="entrar">
        <input class="codigo" v-model="codigo" type="password" placeholder="Código" required />
        <button class="boton" type="submit">Entrar</button>
      </form>

      <p class="mensaje">{{ mensaje }}</p>
    </div>
  </div>
  <button class="regresar" @click="$router.go(-1)">Volver</button>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      codigo: '',
      mensaje: '',
      backendUrl: 'https://lechebronca-backend-production-b77f.up.railway.app'
    };
  },
  methods: {
    async entrar() {
      try {
        const res = await fetch(`${this.backendUrl}/admin/entrar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigo: this.codigo })
        });

        const data = await res.json();
        this.mensaje = data.mensaje;

        if (data.acceso) {
  const expiracion = Date.now() + 5 * 60 * 1000; // 5 minutos en ms
  localStorage.setItem('adminCodigoValido', this.codigo);
  localStorage.setItem('adminCodigoExpira', expiracion.toString());
  this.$router.push('/admin/panel');
}
      } catch (error) {
        this.mensaje = 'Ocurrió un error al verificar el código';
      }
    }
  }
};
</script>

<style scoped>
.regresar{
  position: fixed;
  top: 1%;
  right: 3%;
  background: linear-gradient(to bottom, #ffffff, #121416);
border: 1px solid #123a96;
border-radius: 2px;
color: white;
padding: 10px;
box-shadow: inset 1px 1px 1px #ffffff88, inset -1px -1px 1px #0004;
cursor: pointer;
}

.contenedor-prin {
  height: 100vh;
  background-image: url('@/assets/pass_img.png');
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mensaje{
  color: darkred;
}

.codigo{
  font-size: 1.2rem;
  outline: none;
  padding: 12px 16px;
  width: 50%;
  border: none;
  font-family: 'agency fb', sans-serif;
}
.boton{
  background-image: url('@/assets/OK_btn.png');
  background-repeat: no-repeat;
  background-position: center center;
  text-indent: -9999px;
  background-size: 100px 50px;
  width: 100px;
  height: 50px;
  font-size: 1.2rem; 
  padding: 12px 16px;
  cursor: pointer;
}
.boton:hover {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
}

.admin-login {
  padding: 30px;
  text-align: center;
  width: 90%;
  color: black;
  font-size: 35px;
  font-family: 'agency fb', sans-serif;
  max-width: 400px;
  
}

@media (max-width: 480px) {
.contenedor-prin {
  height: 100vh;
  background-image: url('@/assets/pass_img.png');
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

  .texto{
  font-size: 25px;
}
  .admin-login {
    font-size: 1rem;
    padding: 20px;
  }

  .campos {
    flex-direction: column;
    align-items: center;
    gap: 2rem; 
  }
  .codigo {
    outline: none;
    text-align: center;
    font-size: 1rem;
    max-width: 300px;
    width: 100%;
    padding: 10px 14px;
  }

  .boton {
    background-size: 80px 40px;
    left: 50%;
    
    width: 80px;
    height: 40px;
  }
}
</style>