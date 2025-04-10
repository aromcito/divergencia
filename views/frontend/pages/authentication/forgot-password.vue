<template>
  <!-- Main Wrapper -->
  <div class="main-wrapper">
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
                    <h3>Recuperar Contraseña <span>NeuroPlataforma</span></h3>
                    <p class="small text-muted">
                      Ingresa tu correo electrónico para recibir un enlace de recuperación
                    </p>
                  </div>

                  <!-- Forgot Password Form -->
                  <form @submit.prevent="submitForm">
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
                    
                    <!-- Login Link -->
                    <div class="text-end">
                      <router-link class="forgot-link" to="/login"
                        >¿Recuerdas tu contraseña?</router-link
                      >
                    </div>
                    
                    <!-- Submit Button -->
                    <b-button
                      class="btn btn-primary w-100 btn-lg login-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      {{ loading ? "Enviando..." : "Enviar Enlace" }}
                    </b-button>
                  </form>
                  
                  <div class="btn-secondary mt-3">
                    <b-button @click="goBack" class="btn w-100">Volver</b-button>
                  </div>
                  <!-- /Forgot Password Form -->
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
        email: ""
      },
      loading: false
    };
  },
  methods: {
    async submitForm() {
      // Validar campo de email
      if (!this.form.email) {
        toast.error("Por favor ingresa tu correo electrónico", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      }

      this.loading = true;

      try {
        // Simulación de envío (reemplazar con tu endpoint real)
        const response = await axios.post("http://localhost:4000/forgot-password", this.form);

        if (response.data.message) {
          toast.success("¡Enlace enviado! Revisa tu correo electrónico", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
              color: "#ffffff",
              fontWeight: "bold",
            },
            onClose: () => {
              this.$router.push("/login");
            }
          });
        }
      } catch (error) {
        console.error("Error al enviar enlace:", error);
        
        let errorMessage = "Error en el servidor. Inténtalo de nuevo.";
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Este correo no está registrado";
          }
        }
        
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.go(-1);
    }
  }
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
  margin-bottom: 10px;
}

.login-header h3 span {
  color: #007bff;
}

.login-header p {
  margin-bottom: 20px;
  color: #6c757d;
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
  font-size: 14px;
}

.forgot-link:hover {
  text-decoration: underline;
}

.btn-secondary {
  margin-top: 15px;
}

.btn-secondary .btn {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary .btn:hover {
  background-color: #5a6268;
}
</style>