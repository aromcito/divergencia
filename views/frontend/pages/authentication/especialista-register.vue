<template>
  <!-- Main Wrapper -->
  <div class="main-wrapper">
    <layoutheader></layoutheader>
    <!-- Page Content -->
    <div class="content top-space">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <!-- Account Content -->
            <div class="account-content">
              <div class="row align-items-center justify-content-center">
                <div class="col-md-12 col-lg-6 login-right">
                  <div class="login-header">
                    <h3>Registro para Especialistas <span>NeuroPlataforma</span></h3>
                    <router-link to="register">¿No eres especialista?</router-link>
                  </div>

                  <!-- Register Form -->
                  <form @submit.prevent="submitForm">
                    <!-- Nombre Input -->
                    <div class="mb-3 form-focus">
                      <input
                        type="text"
                        class="form-control floating"
                        v-model="form.nombre"
                        required
                        placeholder=" "
                      />
                      <label class="focus-label">Nombre Completo</label>
                    </div>
                    <!-- Email Input -->
                    <div class="mb-3 form-focus">
                      <input
                        type="email"
                        class="form-control floating"
                        v-model="form.email"
                        required
                        placeholder=" "
                      />
                      <label class="focus-label">Correo Electrónico</label>
                    </div>
                    <!-- Contraseña Input -->
                    <div class="mb-3 form-focus">
                      <input
                        type="password"
                        class="form-control floating"
                        v-model="form.password"
                        required
                        placeholder=" "
                      />
                      <label class="focus-label">Crear una Contraseña</label>
                    </div>
                    <!-- Login Link -->
                    <div class="text-end">
                      <router-link class="forgot-link" to="login"
                        >¿Ya tienes una cuenta? Inicia Sesión</router-link
                      >
                    </div>
                    <!-- Submit Button -->
                    <b-button
                      class="btn btn-primary w-100 btn-lg login-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      {{ loading ? "Registrando..." : "Registrarse" }}
                    </b-button>
                  </form>
                  <!-- /Register Form -->
                </div>
              </div>
            </div>
            <!-- /Account Content -->
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->
    <indexfooter />
  </div>
  <!-- /Main Wrapper -->
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      form: {
        nombre: "",
        email: "",
        password: "",
      },
      loading: false, // Estado para manejar el loading del botón
    };
  },
  methods: {
    async submitForm() {
      // Validar campos
      if (!this.form.nombre || !this.form.email || !this.form.password) {
        toast.error("Por favor, completa todos los campos.");
        return;
      }

      this.loading = true; // Activar loading

      try {
        // Enviar datos al backend
        const response = await axios.post("http://localhost:5000/register", this.form);

        // Si la respuesta es exitosa
        if (response.data.message) {
          toast.success("Registro exitoso!");
          this.$router.push("/login"); // Redirigir al login
        } else {
          toast.error("Error en el registro.");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        toast.error("Error en el servidor. Inténtalo de nuevo.");
      } finally {
        this.loading = false; // Desactivar loading
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.main-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.login-right {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-header h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-header h3 span {
  color: #007bff;
}

.login-header h3 a {
  color: #007bff;
  text-decoration: none;
}

.login-header h3 a:hover {
  text-decoration: underline;
}

.form-focus {
  position: relative;
  margin-bottom: 20px;
}

.form-focus input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}


.login-btn {
  margin-top: 20px;
}

.forgot-link {
  color: #007bff;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}
</style>