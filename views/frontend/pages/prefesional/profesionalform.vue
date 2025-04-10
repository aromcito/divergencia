<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3 class="modal-title">{{ form.id ? 'Editar' : 'Nuevo' }} Profesional</h3>

      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        
        <div class="form-grid">

          <div class="mb-3">
  <label class="form-label">Especialista</label>
  <select v-model="form.usuario_id" class="form-select" required>
    <option value="" disabled>Seleccione un especialista</option>
    <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
      {{ usuario.nombre }} {{ usuario.apellido }} - {{ usuario.email }}
    </option>
  </select>
</div>


          <div class="mb-3">
            <label class="form-label">Título Profesional</label>
            <input v-model="form.titulo_profesional" class="form-control" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Ubicación</label>
            <input v-model="form.ubicacion" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Precio Consulta</label>
            <input v-model="form.precio_consulta" type="number" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Precio Consulta Online</label>
            <input v-model="form.precio_consulta_online" type="number" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Moneda</label>
            <input v-model="form.moneda" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Verificado</label>
            <select v-model="form.verificado" class="form-select">
              <option value="1">Sí</option>
              <option value="0">No</option>
            </select>
          </div>

          <div class="mb-3" v-if="form.id">
            <label class="form-label">Estado</label>
            <select v-model="form.estado" class="form-select">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <textarea v-model="form.descripcion" class="form-control" rows="3"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Experiencia</label>
          <textarea v-model="form.experiencia" class="form-control" rows="2"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Formación</label>
          <textarea v-model="form.formacion" class="form-control" rows="2"></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Imagen de Perfil</label>
          <input type="file" @change="handleImageUpload" class="form-control">
          <small class="text-muted">Tamaño máximo: 2MB</small>
        </div>
      </form>

      <div class="modal-footer">
        <button type="button" @click="$emit('close')" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" @click="handleSubmit">
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: {
    profesional: {
      type: Object,
      default: () => ({
        id: null,
        usuario_id: null,
        titulo_profesional: '',
        descripcion: '',
        experiencia: '',
        formacion: '',
        ubicacion: '',
        precio_consulta: '',
        precio_consulta_online: '',
        moneda: '',
        porcentaje_aprobacion: 0,
        total_valoraciones: 0,
        verificado: 0,
        estado: 'activo',
        imagen_perfil: null
      })
    }
  },
  emits: ['close', 'saved'],
  data() {
    return {
      form: { ...this.profesional }, // Se clona el objeto para evitar problemas de referencia
      usuarios: [], // Lista de especialistas
      imagenSeleccionada: null
    };
  },
  async created() {
    await this.fetchUsuarios();
  },
  watch: {
    profesional: {
      handler(nuevoValor) {
        // Se actualiza el formulario cuando cambia el profesional
        this.form = { ...nuevoValor };
      },
      deep: true,
      immediate: true // Para que se ejecute al montar el componente
    }
  },
  methods: {
    async fetchUsuarios() {
      try {
        const { data } = await axios.get('http://localhost:4000/api/especialistas/usuarios-especialistas');
        this.usuarios = data;
      } catch (error) {
        console.error('Error cargando usuarios:', error);
        Swal.fire('Error', 'No se pudo cargar los usuarios.', 'error');
      }
    },

    handleImageUpload(event) {
      this.imagenSeleccionada = event.target.files[0];
    },

    async handleSubmit() {
      try {
        const formData = new FormData();
        Object.keys(this.form).forEach(key => {
          formData.append(key, this.form[key]);
        });

        if (this.imagenSeleccionada) {
          formData.append('imagen_perfil', this.imagenSeleccionada);
        }

        if (this.form.id) {
          await axios.put(`http://localhost:4000/api/especialistas/${this.form.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          await axios.post('http://localhost:4000/api/especialistas', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }

        this.$emit('saved');
        this.$emit('close');
        Swal.fire('Éxito', 'Profesional guardado correctamente.', 'success');
      } catch (error) {
        console.error('Error guardando el profesional:', error);
        Swal.fire('Error', 'No se pudo guardar el especialista.', 'error');
      }
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
  border-radius: 10px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.modal-title {
  text-align: center;
  margin-bottom: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}
</style>
