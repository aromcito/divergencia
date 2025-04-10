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
                <h2 class="text-primary">Gestión de especialistas</h2>
              </div>

              <!-- Barra de búsqueda -->
              <div class="mb-3">
                <input v-model="filtroNombre" class="form-control" placeholder="Buscar especialista...">
              </div>

              <!-- Tabla de especialistas -->
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Título Profesional</th>
                      <th>Estado</th>
                      <th>Imagen</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="especialista in especialistasFiltrados" :key="especialista.usuario_id">
                      <td>{{ especialista.nombre }} {{ especialista.apellido }}</td>
                      <td>{{ especialista.email }}</td>
                      <td>{{ especialista.titulo_profesional || 'No especificado' }}</td>
                      <td>
                        <span :class="['badge', especialista.estado === 'activo' ? 'bg-success' : 'bg-danger']">
                          {{ especialista.estado }}
                        </span>
                      </td>
                      <td>
                        <img v-if="especialista.imagen_perfil" 
                             :src="`http://localhost:8000/src/assets/img/especialistas/${especialista.imagen_perfil}`" 
                             class="img-thumbnail" width="60" height="60">
                      </td>
                      <td>
                        <button @click="editarEspecialista(especialista)" class="btn btn-warning btn-sm me-2">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button @click="eliminarEspecialista(especialista.usuario_id)" class="btn btn-danger btn-sm">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p v-if="especialistasFiltrados.length === 0" class="text-muted text-center mt-3">No hay especialistas registrados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Crear/Editar Especialista -->
    <EspecialistaForm 
      v-if="modalVisible" 
      :especialista="especialistaSeleccionado" 
      @saved="fetchEspecialistas" 
      @close="modalVisible = false" 
    />

    <indexfooter></indexfooter>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import EspecialistaForm from './profesionalform.vue';

export default {
  components: { EspecialistaForm },
  data() {
    return {
      especialistas: [],
      modalVisible: false,
      especialistaSeleccionado: null,
      filtroNombre: ""
    };
  },
  computed: {
    especialistasFiltrados() {
      return this.especialistas.filter(e =>
        e.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) ||
        e.apellido.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  },
  methods: {
    async fetchEspecialistas() {
      try {
        const res = await axios.get('http://localhost:4000/api/especialistas');
        this.especialistas = res.data;
      } catch (error) {
        console.error('Error obteniendo especialistas:', error);
      }
    },
    nuevoEspecialista() {
      this.especialistaSeleccionado = { nombre: '', email: '', titulo_profesional: '', estado: 'activo' };
      this.modalVisible = true;
    },
    editarEspecialista(especialista) {
      this.especialistaSeleccionado = { ...especialista };
      this.modalVisible = true;
    },
    async eliminarEspecialista(id) {
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
            await axios.delete(`http://localhost:4000/api/especialistas/${id}`);
            Swal.fire('Eliminado', 'El especialista ha sido eliminado.', 'success');
            this.fetchEspecialistas();
          } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar el especialista.', 'error');
          }
        }
      });
    }
  },
  mounted() {
    this.fetchEspecialistas();
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
