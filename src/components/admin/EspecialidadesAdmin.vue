<template>
    <div class="admin-container">
      <h2>Mantenedor de Especialidades</h2>
      
      <div v-if="!isAdmin" class="alert alert-warning">
        No tienes permisos para acceder a esta sección
      </div>
  
      <div v-else>
        <button @click="showForm = true" class="btn btn-primary mb-3">
          <i class="fas fa-plus"></i> Nueva Especialidad
        </button>
  
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in especialidades" :key="item.id">
                <td>
                  <img :src="getImageUrl(item.imagen)" width="50" class="img-thumbnail">
                </td>
                <td>{{ item.nombre }}</td>
                <td>
                  <span :class="`badge bg-${item.estado === 'activo' ? 'success' : 'danger'}`">
                    {{ item.estado }}
                  </span>
                </td>
                <td>
                  <button @click="editItem(item)" class="btn btn-sm btn-warning me-2">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="confirmDelete(item.id)" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <EspecialidadForm 
          v-if="showForm"
          :especialidad="currentItem"
          @close="closeForm"
          @saved="loadEspecialidades"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import EspecialidadForm from './EspecialidadForm.vue';
  
  export default {
    components: { EspecialidadForm },
    data() {
      return {
        especialidades: [],
        showForm: false,
        currentItem: null,
        isAdmin: false
      };
    },
    async mounted() {
      await this.checkAdmin();
      this.loadEspecialidades();
    },
    methods: {
      async checkAdmin() {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await axios.get('/api/auth/check-admin', {
              headers: { Authorization: `Bearer ${token}` }
            });
            this.isAdmin = response.data.isAdmin;
          } catch (error) {
            console.error('Error verificando rol:', error);
          }
        }
      },
      async loadEspecialidades() {
        try {
          const response = await axios.get('/api/especialidades');
          this.especialidades = response.data;
        } catch (error) {
          console.error('Error cargando especialidades:', error);
        }
      },
      editItem(item) {
        this.currentItem = { ...item };
        this.showForm = true;
      },
      async confirmDelete(id) {
        if (confirm('¿Estás seguro de desactivar esta especialidad?')) {
          try {
            await axios.delete(`/api/especialidades/${id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            this.loadEspecialidades();
          } catch (error) {
            console.error('Error eliminando especialidad:', error);
          }
        }
      },
      closeForm() {
        this.showForm = false;
        this.currentItem = null;
      },
      getImageUrl(image) {
        return image ? `/uploads/especialidades/${image}` : '/img/placeholder.png';
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin: 20px;
  }
  </style>