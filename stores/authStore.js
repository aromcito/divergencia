import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(credentials) {
      const router = useRouter(); // Obtener el router aquí

      try {
        const response = await axios.post('http://localhost:4000/login', credentials);
        
        if (!response.data.token || !response.data.user) {
          throw new Error('Respuesta del servidor inválida');
        }

        // Actualizar el estado
        this.token = response.data.token;
        this.user = response.data.user;

        // Guardar en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirigir al dashboard
        router.push('/');
        
      } catch (error) {
        console.error("Error en login:", error.response?.data || error.message);
        throw error; // Puedes personalizar el error aquí
      }
    },
  

    async register(data, router) {
      try {
        const response = await axios.post('http://localhost:4000/register', data)
        const { token, user } = response.data

        this.token = token
        this.user = user

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        router.push('/dashboard')
      } catch (error) {
        if (error.response) {
          // Si hay un error de respuesta, manejamos el error según el código de estado
          if (error.response.status === 409) {
            // Maneja el caso de correo electrónico duplicado
            console.error("Error: El correo electrónico ya está en uso.")
            alert("El correo electrónico ya está en uso. Por favor, elige otro.")
          } else {
            // Maneja otros errores del servidor
            console.error("Error en registro:", error.response.data)
            alert("Hubo un error al registrar el usuario. Intenta nuevamente.")
          }
        } else {
          // Error de red o fallo en la conexión
          console.error("Error de red o servidor:", error.message)
          alert("No se pudo conectar con el servidor. Intenta nuevamente más tarde.")
        }
        throw error
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
