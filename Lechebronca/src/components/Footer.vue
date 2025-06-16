<template>
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
</template>

<style>
.window-footer {
  background-color: #0066ff;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 850px;
  left: 50%;
  transform: translateX(-50%);
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
