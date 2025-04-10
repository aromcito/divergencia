<template>
    <div class="main-wrapper">
      <layoutheader></layoutheader>
      
      <div class="content">
        <div class="container">
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Inicio</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/blogs">Blogs</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ blog.titulo }}</li>
            </ol>
          </nav>
  
          <!-- Contenido principal del blog -->
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <article class="blog-detail-card card shadow-sm mb-5">
                <!-- Imagen destacada -->
                <img v-if="blog.imagen" 
                     :src="imagenUrl" 
                     class="card-img-top blog-featured-image"
                     :alt="blog.titulo"
                     @error="handleImageError">
                
                <div class="card-body">
                  <!-- Encabezado -->
                  <div class="blog-header mb-4">
                    <h1 class="blog-title">{{ blog.titulo }}</h1>
                    <div class="blog-meta d-flex align-items-center text-muted">
                      <span class="me-3">
                        <i class="far fa-calendar-alt me-1"></i>
                        {{ formatFecha(blog.fecha_publicacion) }}
                      </span>
                      <span v-if="blog.autor">
                        <i class="fas fa-user me-1"></i>
                        {{ blog.autor.nombre }}
                      </span>
                    </div>
                  </div>
  
                  <!-- Contenido seguro -->
                  <safe-html :content="blog.contenido" class="blog-content" />
  
                  <!-- Tags/Categorías -->
                  <div v-if="blog.tags && blog.tags.length" class="blog-tags mt-4">
                    <span class="badge bg-secondary me-2" v-for="tag in blog.tags" :key="tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </article>
  
              <!-- Sección de comentarios -->
              <div class="comments-section card shadow-sm mb-5" v-if="showComments">
                <div class="card-body">
                  <h3 class="mb-4">Comentarios</h3>
                  <div v-if="comments.length">
                    <div class="comment mb-3" v-for="comment in comments" :key="comment.id">
                      <div class="comment-header d-flex justify-content-between">
                        <strong>{{ comment.autor }}</strong>
                        <small class="text-muted">{{ formatFecha(comment.fecha) }}</small>
                      </div>
                      <div class="comment-body mt-2">
                        {{ comment.contenido }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-muted">
                    No hay comentarios aún. Sé el primero en comentar.
                  </div>
  
                  <!-- Formulario de comentario -->
                  <form @submit.prevent="submitComment" class="mt-4">
                    <div class="mb-3">
                      <label for="commentContent" class="form-label">Deja tu comentario</label>
                      <textarea v-model="newComment" class="form-control" id="commentContent" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar comentario</button>
                  </form>
                </div>
              </div>
  
              <!-- Blog relacionados -->
              <div class="related-blogs" v-if="relatedBlogs.length">
                <h3 class="mb-4">Artículos relacionados</h3>
                <div class="row">
                  <div class="col-md-4 mb-3" v-for="related in relatedBlogs" :key="related.id">
                    <div class="card h-100">
                      <router-link :to="'/blogs/' + related.id">
                        <img v-if="related.imagen" 
                             :src="getImageUrl(related.imagen)" 
                             class="card-img-top"
                             :alt="related.titulo"
                             @error="handleRelatedImageError">
                        <div class="card-body">
                          <h5 class="card-title">{{ related.titulo }}</h5>
                          <p class="card-text text-muted small">
                            {{ formatFecha(related.fecha_publicacion) }}
                          </p>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <indexfooter></indexfooter>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import SafeHtml from '@/components/SafeHtml.vue';
  
  export default {
    name: 'BlogDetail',
    components: {
      SafeHtml
    },
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        blog: {
          titulo: '',
          contenido: '',
          fecha_publicacion: '',
          imagen: null,
          autor: null,
          tags: []
        },
        relatedBlogs: [],
        comments: [],
        newComment: '',
        showComments: true,
        isLoading: true,
        defaultImage: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a5c4b8b6b%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a5c4b8b6b%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9140625%22%20y%3D%22218.1%22%3EImagen%20no%20disponible%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
      };
    },
    computed: {
      imagenUrl() {
        return this.blog.imagen 
          ? `http://localhost:4000/uploads/blogs/${this.blog.imagen}`
          : this.defaultImage;
      }
    },
    methods: {
      async fetchBlog() {
        try {
          const response = await axios.get(`http://localhost:4000/api/blogs/${this.id}`);
          this.blog = response.data;
          
          await this.fetchRelatedBlogs();
          
          if (this.showComments) {
            await this.fetchComments();
          }
        } catch (error) {
          console.error('Error cargando blog:', error);
          this.$router.push('/not-found');
        } finally {
          this.isLoading = false;
        }
      },
      async fetchRelatedBlogs() {
        try {
          const response = await axios.get(`http://localhost:4000/api/blogs/related/${this.id}`);
          this.relatedBlogs = response.data;
        } catch (error) {
          console.error('Error cargando blogs relacionados:', error);
        }
      },
      async fetchComments() {
        try {
          const response = await axios.get(`http://localhost:4000/api/comments?blog_id=${this.id}`);
          this.comments = response.data;
        } catch (error) {
          console.error('Error cargando comentarios:', error);
        }
      },
      async submitComment() {
        if (!this.newComment.trim()) return;
        
        try {
          await axios.post('http://localhost:4000/api/comments', {
            blog_id: this.id,
            contenido: this.newComment,
            autor: 'Usuario Anónimo'
          });
          
          await this.fetchComments();
          this.newComment = '';
          Swal.fire({
            title: 'Éxito',
            text: 'Tu comentario ha sido publicado',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo publicar el comentario',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      formatFecha(fecha) {
        return new Date(fecha).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      getImageUrl(imageName) {
        return `http://localhost:4000/uploads/blogs/${imageName}`;
      },
      handleImageError(event) {
        event.target.src = this.defaultImage;
      },
      handleRelatedImageError(event) {
        event.target.src = this.defaultImage;
      }
    },
    created() {
      this.fetchBlog();
    }
  };
  </script>
  
  <style scoped>
  .blog-detail-card {
    border: none;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .blog-featured-image {
    max-height: 400px;
    object-fit: cover;
  }
  
  .blog-title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .blog-meta {
    font-size: 0.9rem;
  }
  
  .blog-content {
    line-height: 1.8;
    font-size: 1.1rem;
  }
  
  .blog-content >>> img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
  }
  
  .comments-section {
    border-radius: 10px;
  }
  
  .comment {
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .related-blogs .card {
    transition: transform 0.3s ease;
    border-radius: 8px;
  }
  
  .related-blogs .card:hover {
    transform: translateY(-5px);
  }
  
  .related-blogs .card-img-top {
    height: 150px;
    object-fit: cover;
  }
  </style>