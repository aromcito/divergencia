<template>
  <div class="account-page">
    <div class="main-wrapper">
      <!-- Page Content -->
      <div class="content top-space">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <!-- Login Tab Content -->
              <div class="account-content">
                <div class="row align-items-center justify-content-center">
                  <div class="col-md-12 col-lg-6 login-right">
                    <div class="login-header">
                      <h3>Iniciar Sesión <span>NeuroPlataforma</span></h3>
                    </div>
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
                        <label>Correo Electrónico</label>
                      </div>
                      <!-- Password Input -->
                      <div class="mb-3 form-focus">
                        <input
                          type="password"
                       
                          v-model="form.password"
                          required
                          placeholder=" "
                        />
                        <label>Contraseña</label>
                      </div>
                      <!-- Forgot Password Link -->
                      <div class="text-end">
                        <router-link class="forgot-link" to="forgot-password"
                          >¿Olvidaste tu contraseña?</router-link
                        >
                      </div>
                      <!-- Submit Button -->
                      <b-button
                        class="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                        :disabled="loading"
                      >
                        {{ loading ? "Iniciando sesión..." : "Iniciar Sesión" }}
                      </b-button>
                      <!-- Register Link -->
                      <div class="text-center dont-have">
                        ¿No tienes una cuenta?
                        <router-link to="register">Regístrate</router-link>
                      </div>
                    </form>
                    <div class="btn-secondary">
                      <b-button @click="goBack" class="btn w-100">Volver</b-button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Login Tab Content -->
            </div>
          </div>
        </div>
      </div>
      <!-- /Page Content -->
      <indexfooter />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loading: false,
      showAlert: false,
      alertMessage: "",
      alertVariant: "danger"
    };
  },
  methods: {
    async submitForm() {
      // Validación básica del formulario
      if (!this.form.email || !this.form.password) {
        this.showError("Por favor, completa todos los campos");
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.showError("Por favor ingresa un correo electrónico válido");
        return;
      }

      this.loading = true;

      try {
        const response = await axios.post("http://localhost:4000/login", this.form);

        if (response.data.token) {
          // Guardar el token y datos del usuario
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          
          // Mostrar notificación de éxito
          toast.success("¡Inicio de sesión exitoso!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              // Redirigir a la página principal después del toast
              this.$router.push("/");
            }
          });
        } else {
          this.showError("Error: No se recibió token de autenticación");
        }
      } catch (error) {
        this.handleLoginError(error);
      } finally {
        this.loading = false;
      }
    },

    handleLoginError(error) {
      let errorMessage = "Ocurrió un error durante el inicio de sesión";
      let variant = "danger";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Datos de inicio de sesión inválidos";
            break;
          case 401:
            errorMessage = "Credenciales incorrectas. Por favor, verifica tu email y contraseña";
            variant = "warning";
            break;
          case 403:
            errorMessage = "Acceso denegado. Tu cuenta puede estar inactiva";
            break;
          case 404:
            errorMessage = "El servicio de autenticación no está disponible";
            break;
          case 500:
            errorMessage = "Error interno del servidor. Por favor, inténtalo más tarde";
            break;
          default:
            errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "No se pudo conectar al servidor. Verifica tu conexión a internet";
      }

      this.showError(errorMessage, variant);
    },

    showError(message, variant = "danger") {
      this.alertMessage = message;
      this.alertVariant = variant;
      this.showAlert = true;
      
      // Ocultar automáticamente después de 5 segundos
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
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
  padding-top: 20px;
}

.login-right {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.login-header h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}

.login-header h3 span {
  color: #007bff;
}

.form-focus {
  position: relative;
  margin-bottom: 25px;
}

.form-focus input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-focus input:focus {
  border-color: #007bff;
  outline: none;
}

.form-focus label {
  position: absolute;
  top: 12px;
  left: 15px;
  color: #777;
  transition: all 0.3s;
  pointer-events: none;
}

.form-focus input:focus + label,
.form-focus input:not(:placeholder-shown) + label {
  top: -10px;
  left: 10px;
  font-size: 12px;
  background-color: white;
  padding: 0 5px;
  color: #007bff;
}

.login-btn {
  margin-top: 20px;
  padding: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.forgot-link {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-link:hover {
  text-decoration: underline;
}

.dont-have {
  margin-top: 20px;
  color: #666;
  font-size: 15px;
}

.dont-have a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.dont-have a:hover {
  text-decoration: underline;
}

.btn-secondary .btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px;
}

.btn-secondary .btn:hover {
  background-color: #5a6268;
}

/* Alert styles */
.alert {
  z-index: 1000;
  text-align: center;
  padding: 15px;
  font-size: 15px;
}
</style>