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
                  <h2 class="text-primary">Gestión de Blogs</h2>
                  <button @click="nuevoBlog" class="btn btn-success">
                    <i class="fas fa-plus"></i> Nuevo Blog
                  </button>
                </div>
                <!-- Barra de búsqueda -->
                <div class="mb-3">
                  <input v-model="filtroTitulo" class="form-control" placeholder="Buscar blog por título...">
                </div>
  
                <!-- Tabla de blogs -->
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="table-dark">
                      <tr>
                        <th>Título</th>
                        <th>Contenido (resumen)</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="blog in blogsFiltrados" :key="blog.id">
                        <td>{{ blog.titulo }}</td>
                        <td>{{ blog.contenido.substring(0, 50) }}...</td>
                        <td>{{ formatFecha(blog.fecha_publicacion) }}</td>
                        <td>
                          <span :class="['badge', blog.estado === 'activo' ? 'bg-success' : 'bg-danger']">
                            {{ blog.estado }}
                          </span>
                        </td>
                        <td>
                          <img v-if="blog.imagen" :src="getImagenUrl(blog.imagen)" class="img-thumbnail" width="60" height="60" @error="onImageError">
                        </td>
                        <td>
                          <button @click="editarBlog(blog)" class="btn btn-warning btn-sm me-2">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button @click="eliminarBlog(blog.id)" class="btn btn-danger btn-sm">
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
  
                <p v-if="blogsFiltrados.length === 0" class="text-muted text-center mt-3">No hay blogs registrados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Crear/Editar Blog -->
      <BlogForm 
        v-if="modalVisible" 
        :blog="blogSeleccionado" 
        @saved="fetchBlogs" 
        @close="modalVisible = false" 
      />
  
      <indexfooter></indexfooter>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import BlogForm from './BlogForm.vue';
  
  export default {
    components: { BlogForm },
    data() {
      return {
        blogs: [],
        modalVisible: false,
        blogSeleccionado: null,
        filtroTitulo: ""
      };
    },
    computed: {
      blogsFiltrados() {
        return this.blogs.filter(blog =>
          blog.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase())
        );
      }
    },
    methods: {
      async fetchBlogs() {
        try {
          const res = await axios.get('http://localhost:4000/api/blogs');
          this.blogs = res.data;
        } catch (error) {
          console.error('Error obteniendo blogs:', error);
          Swal.fire('Error', 'No se pudieron cargar los blogs', 'error');
        }
      },
      getImagenUrl(imagen) {
        return `http://localhost:4000/uploads/blogs/${imagen}`;
      },
      onImageError(event) {
        event.target.src = 'http://localhost:4000/uploads/default-blog.jpg';
      },
      formatFecha(fecha) {
        return new Date(fecha).toLocaleDateString();
      },
      nuevoBlog() {
        this.blogSeleccionado = { 
          titulo: '', 
          contenido: '', 
          imagen: null,
          estado: 'activo' 
        };
        this.modalVisible = true;
      },
      editarBlog(blog) {
        this.blogSeleccionado = { ...blog };
        this.modalVisible = true;
      },
      async eliminarBlog(id) {
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
              await axios.delete(`http://localhost:4000/api/blogs/${id}`);
              Swal.fire('Eliminado', 'El blog ha sido eliminado.', 'success');
              this.fetchBlogs();
            } catch (error) {
              Swal.fire('Error', 'No se pudo eliminar el blog.', 'error');
            }
          }
        });
      }
    },
    mounted() {
      this.fetchBlogs();
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