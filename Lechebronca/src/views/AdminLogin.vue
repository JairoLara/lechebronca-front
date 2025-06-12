<template>
  <div class="admin-login">
    <p>Código para acceder</p>

    <form @submit.prevent="entrar">
      <input v-model="codigo" type="password" placeholder="Código" required />
      <button type="submit">Entrar</button>
    </form>

    <p>{{ mensaje }}</p>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      codigo: '',
      mensaje: '',
      backendUrl: 'https://lechebronca-backend-production-b77f.up.railway.app'
      // 'http://localhost:3000'
      //  https://lechebronca-backend-production-b77f.up.railway.app
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
.admin-login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
