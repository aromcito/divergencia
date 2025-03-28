<template>
  <!-- Sección de Blog -->
  <section class="section section-blogs">
    <div class="container-fluid">
      <!-- Encabezado de la Sección -->
      <div class="section-header text-center aos" data-aos="fade-up">
        <h2>Blog y Noticias</h2>
        <p class="sub-title">
          Mantente informado con las últimas noticias, artículos y recursos sobre neurodivergencia.
        </p>
      </div>
      <!-- /Encabezado de la Sección -->

      <!-- Grid de Blogs -->
      <div class="row blog-grid-row">
        <div
          class="col-md-6 col-lg-3 col-sm-12 aos"
          v-for="item in blogs"
          :key="item.id"
          data-aos="fade-up"
        >
          <div class="blog grid-blog">
            <div class="blog-image">
              <router-link to="/blog-details">
                <img
                  class="img-fluid"
                  :src="require(`@/assets/img/blog/${item.imagen}`)"
                  alt="Imagen del Blog"
                />
              </router-link>
            </div>
            <div class="blog-content">
              <ul class="entry-meta meta-item">
                <li>
                  <div class="post-author">
                    <router-link to="/doctor-profile">
                      <img
                        :src="require(`@/assets/img/autores/${item.autorImagen}`)"
                        alt="Autor del Blog"
                      />
                      <span>{{ item.autorNombre }}</span>
                    </router-link>
                  </div>
                </li>
                <li><i class="far fa-clock me-1"></i>{{ item.fecha }}</li>
              </ul>
              <h3 class="blog-title">
                <router-link to="/blog-details">{{ item.titulo }}</router-link>
              </h3>
              <p class="mb-0">
                {{ item.descripcionCorta }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- /Grid de Blogs -->

      <!-- Botón "Ver Todos" -->
      <div class="view-all text-center aos" data-aos="fade-up">
        <router-link to="/blog-list" class="btn btn-primary">Ver Todos</router-link>
      </div>
    </div>
  </section>
  <!-- /Sección de Blog -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import blogs from "@/assets/json/blogs.json"; // Asegúrate de tener este archivo JSON

export default {
  data() {
    return {
      blogs: blogs, // Datos de los blogs cargados desde el JSON
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.section-blogs {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.section-header .sub-title {
  font-size: 1rem;
  color: #666;
  margin-top: 10px;
}

.blog-grid-row {
  margin-top: 30px;
}

.blog {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.blog:hover {
  transform: translateY(-10px);
}

.blog-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 20px;
}

.entry-meta {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.post-author img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.blog-title a {
  color: inherit;
  text-decoration: none;
}

.blog-title a:hover {
  color: #007bff;
}

.view-all .btn {
  margin-top: 30px;
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
}
</style>