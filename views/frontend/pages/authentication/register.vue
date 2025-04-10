<template>
  <div class="main-wrapper">
    <div class="content top-space">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="account-content">
              <div class="row align-items-center justify-content-center">
                <div class="col-md-12 col-lg-6 login-right">
                  <div class="login-header">
                    <h3>Registro <span>NeuroPlataforma</span></h3>
                  </div>
                  
                  <!-- Mensaje de éxito/error -->
                  <div v-if="message.text" 
                       :class="['alert', message.type === 'success' ? 'alert-success' : 'alert-danger']">
                    {{ message.text }}
                  </div>
                  
                  <form @submit.prevent="submitForm">
                    <div class="mb-3 form-focus">
                      <input
                        type="text"
                        class="form-control floating"
                        v-model.trim="form.nombre"
                        required
                        minlength="2"
                        placeholder=" "
                      />
                      <label class="focus-label">Nombre</label>
                      <small v-if="errors.nombre" class="text-danger">{{ errors.nombre }}</small>
                    </div>
                    
                    <div class="mb-3 form-focus">
                      <input
                        type="text"
                        class="form-control floating"
                        v-model.trim="form.apellido"
                        required
                        minlength="2"
                        placeholder=" "
                      />
                      <label class="focus-label">Apellido</label>
                      <small v-if="errors.apellido" class="text-danger">{{ errors.apellido }}</small>
                    </div>
                    
                    <div class="mb-3 form-focus">
                      <input
                        type="email"
                        class="form-control floating"
                        v-model.trim="form.email"
                        required
                        placeholder=" "
                      />
                      <label class="focus-label">Correo Electrónico</label>
                      <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                    </div>
                    
                    <div class="mb-3 form-focus">
                      <input
                        type="password"
                        class="form-control floating"
                        v-model="form.password"
                        required
                        minlength="8"
                        placeholder=" "
                      />
                      <label class="focus-label">Crear una Contraseña</label>
                      <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                    </div>
                    
                    <div class="text-end">
                      <router-link class="forgot-link" to="/login">
                        ¿Ya tienes una cuenta? Inicia Sesión
                      </router-link>
                    </div>
                    
                    <button
                      class="btn btn-primary w-100 btn-lg login-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      <span v-if="loading">
                        <i class="fas fa-spinner fa-spin"></i> Registrando...
                      </span>
                      <span v-else>Registrarse</span>
                    </button>
                  </form>
                  
                  <div class="text-center dont-have"></div>
                  <div class="btn-secondary mt-3">
                    <button @click="goBack" class="btn btn-secondary w-100">Volver</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexfooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const form = ref({
  nombre: '',
  apellido: '',
  email: '',
  password: ''
})

const loading = ref(false)
const errors = ref({})
const message = ref({ text: '', type: '' })
const router = useRouter()

const validateForm = () => {
  errors.value = {}
  let isValid = true
  
  if (form.value.nombre.length < 2) {
    errors.value.nombre = 'El nombre debe tener al menos 2 caracteres'
    isValid = false
  }
  
  if (form.value.apellido.length < 2) {
    errors.value.apellido = 'El apellido debe tener al menos 2 caracteres'
    isValid = false
  }
  
  if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Ingrese un correo electrónico válido'
    isValid = false
  }
  
  if (form.value.password.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
    isValid = false
  }
  
  return isValid
}

const goBack = () => {
  router.back()
}

const submitForm = async () => {
  if (!validateForm()) return
  
  loading.value = true
  message.value = { text: '', type: '' }
  
  try {
    // Eliminamos la asignación a variable no utilizada
    await axios.post('http://localhost:4000/register', form.value)
    
    message.value = {
      text: 'Registro exitoso! Redirigiendo...',
      type: 'success'
    }
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (error) {
    console.error('Error en el registro:', error)
    
    message.value = {
      text: error.response?.data?.message || 'Error en el registro. Intente nuevamente.',
      type: 'error'
    }
  } finally {
    loading.value = false
  }
}
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