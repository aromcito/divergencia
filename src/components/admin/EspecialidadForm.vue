<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>{{ especialidad.id ? 'Editar' : 'Nueva' }} Especialidad</h3>
        
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input v-model="form.nombre" class="form-control" required>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea v-model="form.descripcion" class="form-control" rows="3"></textarea>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Imagen</label>
            <input type="file" @change="handleImageUpload" class="form-control">
            <small class="text-muted">Tamaño máximo: 2MB</small>
          </div>
          
          <div class="mb-3" v-if="especialidad.id">
            <label class="form-label">Estado</label>
            <select v-model="form.estado" class="form-select">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          
          <div class="d-flex justify-content-end">
            <button type="button" @click="$emit('close')" class="btn btn-secondary me-2">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Agrega esta línea
  
  export default {
    props: {
      especialidad: {
        type: Object,
        default: () => ({ nombre: '', descripcion: '', estado: 'activo' })
      }
    },
    data() {
      return {
        form: { ...this.especialidad },
        imageFile: null
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const formData = new FormData();
          formData.append('nombre', this.form.nombre);
          formData.append('descripcion', this.form.descripcion);
          formData.append('estado', this.form.estado);
          
          if (this.imageFile) {
            formData.append('imagen', this.imageFile);
          }
  
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          };
  
          if (this.form.id) {
            await axios.put(`/api/especialidades/${this.form.id}`, formData, config);
          } else {
            await axios.post('/api/especialidades', formData, config);
          }
  
          this.$emit('saved');
          this.$emit('close');
        } catch (error) {
          console.error('Error guardando especialidad:', error);
        }
      },
      handleImageUpload(event) {
        this.imageFile = event.target.files[0];
      }
    }
  };
  </script>
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
  }
  </style>