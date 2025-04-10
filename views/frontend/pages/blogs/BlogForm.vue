<template>
    <div class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ localBlog.id ? 'Editar Blog' : 'Nuevo Blog' }}</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarBlog">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input v-model="localBlog.titulo" type="text" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Contenido</label>
                <textarea v-model="localBlog.contenido" class="form-control" rows="8" required></textarea>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Estado</label>
                <select v-model="localBlog.estado" class="form-select">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Imagen</label>
                <input type="file" class="form-control" @change="handleFileUpload">
                <small class="text-muted">Tamaño máximo: 2MB. Formatos: JPG, PNG.</small>
                <div v-if="localBlog.imagen" class="mt-2">
                  <img :src="getImagenUrl()" class="img-thumbnail" width="150">
                </div>
              </div>
              
              <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary me-2" @click="$emit('close')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  emits: ['close', 'saved'],
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localBlog: {...this.blog},
      usuario_id: null
    };
  },
  created() {
    this.obtenerUsuarioId();
  },
  methods: {
    obtenerUsuarioId() {
      // Opción 1: Desde localStorage (si guardas el usuario al hacer login)
      const usuarioData = localStorage.getItem('usuario');
      if (usuarioData) {
        try {
          const usuario = JSON.parse(usuarioData);
          this.usuario_id = usuario.id;
        } catch (error) {
          console.error('Error al parsear datos del usuario:', error);
        }
      }
      
      // Opción 2: Desde sessionStorage
      if (!this.usuario_id) {
        const sessionUser = sessionStorage.getItem('usuario');
        if (sessionUser) {
          try {
            this.usuario_id = JSON.parse(sessionUser).id;
          } catch (error) {
            console.error('Error al parsear datos de sesión:', error);
          }
        }
      }

      // Opción 3: Si usas JWT, extraer del token
      if (!this.usuario_id) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.usuario_id = payload.userId || payload.sub;
          } catch (error) {
            console.error('Error al decodificar token:', error);
          }
        }
      }

      if (!this.usuario_id) {
        console.error('No se pudo obtener el ID del usuario');
        alert('Debes iniciar sesión para crear un blog');
        this.$emit('close');
      }
    },
    getImagenUrl() {
      if (typeof this.localBlog.imagen === 'object') {
        return URL.createObjectURL(this.localBlog.imagen);
      }
      return `http://localhost:4000/uploads/blogs/${this.localBlog.imagen}`;
    },
    handleFileUpload(event) {
      this.localBlog.imagen = event.target.files[0];
    },
    async guardarBlog() {
      try {
        if (!this.usuario_id) {
          throw new Error('No se ha identificado al usuario');
        }

        const formData = new FormData();
        formData.append('titulo', this.localBlog.titulo);
        formData.append('contenido', this.localBlog.contenido);
        formData.append('estado', this.localBlog.estado || 'activo');
        formData.append('usuario_id', this.usuario_id);
        
        if (typeof this.localBlog.imagen === 'object') {
          formData.append('imagen', this.localBlog.imagen);
        } else if (this.localBlog.imagen) {
          formData.append('imagen', this.localBlog.imagen);
        }

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };

        if (this.localBlog.id) {
          await axios.put(`http://localhost:4000/api/blogs/${this.localBlog.id}`, formData, config);
        } else {
          await axios.post('http://localhost:4000/api/blogs', formData, config);
        }

        this.$emit('saved');
        this.$emit('close');
      } catch (error) {
        console.error('Error guardando blog:', error);
        
        let mensajeError = 'Error al guardar el blog';
        if (error.response) {
          if (error.response.status === 401) {
            mensajeError = 'Debes iniciar sesión para realizar esta acción';
            this.$router.push('/login?redirect=' + encodeURIComponent(this.$route.path));
          } else if (error.response.data?.error) {
            mensajeError = error.response.data.error;
          }
        } else if (error.message) {
          mensajeError = error.message;
        }
        
        alert(mensajeError);
      }
    }
  }
};
</script>
  <style scoped>
  .modal {
    z-index: 1050;
  }
  </style>