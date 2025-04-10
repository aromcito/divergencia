<template>
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <!-- Logo -->
      <div class="footer-logo">
        <img src="@/assets/img/logo.png" alt="Logo de la plataforma" />
      </div>

      <!-- Texto -->
      <div class="footer-text">
        <p>
          Plataforma especializada en servicios para la comunidad neurodivergente.
        </p>
      </div>

      <!-- Íconos de redes sociales -->
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
/* Estilos básicos para el footer */
.footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo img {
  max-width: 150px;
  height: auto;
}

.footer-text {
  margin: 10px 0;
  font-size: 14px;
  color: #333;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  color: #333;
  margin: 0 10px;
  font-size: 20px;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #007bff; /* Cambia el color al pasar el mouse */
}
</style>