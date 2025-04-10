<template>
    <div class="main-wrapper">
      <layoutheader></layoutheader>
     <br>
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="card shadow-sm p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h2 class="text-primary">Gestión de Especialidades</h2>
                  <button @click="nuevaEspecialidad" class="btn btn-success">
                    <i class="fas fa-plus"></i> Nueva Especialidad
                  </button>
                </div>
  
                <!-- Barra de búsqueda -->
                <div class="mb-3">
                  <input v-model="filtroNombre" class="form-control" placeholder="Buscar especialidad...">
                </div>
  
                <!-- Tabla de especialidades -->
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="especialidad in especialidadesFiltradas" :key="especialidad.id">
                        <td>{{ especialidad.nombre }}</td>
                        <td>{{ especialidad.descripcion }}</td>
                        <td>
                          <span :class="['badge', especialidad.estado === 'activo' ? 'bg-success' : 'bg-danger']">
                            {{ especialidad.estado }}
                          </span>
                        </td>
                        <td>
  <img v-if="especialidad.imagen" :src="`http://localhost:8000/src/assets/img/especialidades/${especialidad.imagen}`" class="img-thumbnail" width="60" height="60">
</td>
                        <td>
                          <button @click="editarEspecialidad(especialidad)" class="btn btn-warning btn-sm me-2">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button @click="eliminarEspecialidad(especialidad.id)" class="btn btn-danger btn-sm">
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <p v-if="especialidadesFiltradas.length === 0" class="text-muted text-center mt-3">No hay especialidades registradas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Crear/Editar Especialidad -->
      <EspecialidadForm 
        v-if="modalVisible" 
        :especialidad="especialidadSeleccionada" 
        @saved="fetchEspecialidades" 
        @close="modalVisible = false" 
      />
  
      <indexfooter></indexfooter>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import EspecialidadForm from './especialidadform.vue';
  
  export default {
    components: { EspecialidadForm },
    data() {
      return {
        especialidades: [],
        modalVisible: false,
        especialidadSeleccionada: null,
        filtroNombre: ""
      };
    },
    computed: {
      especialidadesFiltradas() {
        return this.especialidades.filter(e =>
          e.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
        );
      }
    },
    methods: {
      async fetchEspecialidades() {
        try {
          const res = await axios.get('http://localhost:4000/api/especialidades');
          this.especialidades = res.data;
        } catch (error) {
          console.error('Error obteniendo especialidades:', error);
        }
      },
      onImageError(event) {
    event.target.src = 'ruta/a/imagen/default.jpg';  // Ruta de la imagen de reemplazo
    },
      nuevaEspecialidad() {
        this.especialidadSeleccionada = { nombre: '', descripcion: '', estado: 'activo' };
        this.modalVisible = true;
      },
      editarEspecialidad(especialidad) {
        this.especialidadSeleccionada = { ...especialidad };
        this.modalVisible = true;
      },
      async eliminarEspecialidad(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/especialidades/${id}`);
        Swal.fire('Eliminado', 'La especialidad ha sido eliminada.', 'success');
        this.fetchEspecialidades();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la especialidad.', 'error');
      }
    }
  });
}

    },
    mounted() {
      this.fetchEspecialidades();
    }
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 10px;
  }
  
  .img-thumbnail {
    border-radius: 8px;
    object-fit: cover;
  }
  
  .table-responsive {
    max-height: 500px;
    overflow-y: auto;
  }
  </style>
  