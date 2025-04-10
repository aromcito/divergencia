<template>
  <!-- Banner Principal -->
  <section class="section section-search">
    <div class="container-fluid">
      <div class="banner-wrapper">
        <div class="banner-header text-center aos" data-aos="fade-up">
          <h1>Bienvenido a NeuroConecta</h1>
          <p>Descubre los mejores servicios, profesionales y recursos para la comunidad neurodivergente.</p>
        </div>

        <!-- Barra de búsqueda -->
        <div class="search-box-12">
          <form @submit.prevent="submitForm">
            <div class="form-group search-info aos" data-aos="fade-up">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar servicios, profesionales, charlas, etc."
                v-model="searchQuery"
              />
              <span class="form-text">Ej: Terapia, Taller, Restaurante, etc.</span>
            </div>
            <b-button
              type="submit"
              class="btn btn-primary search-btn mt-0 aos"
              data-aos="fade-up"
            >
              <i class="fas fa-search"></i> <span>Buscar</span>
            </b-button>
          </form>
        </div>
        <!-- /Barra de búsqueda -->
      </div>
    </div>
  </section>
  <!-- /Banner Principal -->

  <!-- Sección de Servicios -->
  <section class="section home-tile-section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9 m-auto">
          <div class="section-header text-center aos" data-aos="fade-up">
            <h2>¿Qué estás buscando?</h2>
          </div>
          <div class="row">
            <!-- Tarjeta 1: Profesionales -->
            <div class="col-lg-4 mb-3 aos" data-aos="fade-up">
              <div class="card text-center doctor-book-card">
                <img
                  src="@/assets/img/profesionales/ejecutivo.jpg"
                  alt="Profesionales"
                  class="img-fluid"
                />
                <div class="doctor-book-card-content tile-card-content-1">
                  <div>
                    <h3 class="card-title mb-0">Profesionales</h3>
                    <router-link
                      to="/buscar-profesionales"
                      class="btn book-btn1 px-3 py-2 mt-3"
                      tabindex="0"
                      >Buscar Ahora</router-link
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjeta 2: Charlas y Talleres -->
            <div class="col-lg-4 mb-3 aos" data-aos="fade-up">
              <div class="card text-center doctor-book-card">
                <img
                  src="@/assets/img/charlas/junta.jpg"
                  alt="Charlas y Talleres"
                  class="img-fluid"
                />
                <div class="doctor-book-card-content tile-card-content-1">
                  <div>
                    <h3 class="card-title mb-0">Charlas y Talleres</h3>
                    <router-link
                      to="/buscar-charlas"
                      class="btn book-btn1 px-3 py-2 mt-3"
                      tabindex="0"
                      >Explorar</router-link
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Tarjeta 3: Restaurantes Amigables -->
            <div class="col-lg-4 mb-3 aos" data-aos="fade-up">
              <div class="card text-center doctor-book-card">
                <img
                  src="@/assets/img/restaurantes/restauran.jpg"
                  alt="Restaurantes Amigables"
                  class="img-fluid"
                />
                <div class="doctor-book-card-content tile-card-content-1">
                  <div>
                    <h3 class="card-title mb-0">Restaurantes Amigables</h3>
                    <router-link
                      to="/buscar-restaurantes"
                      class="btn book-btn1 px-3 py-2 mt-3"
                      tabindex="0"
                      >Descubrir</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Sección de Servicios -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      searchQuery: "", // Variable para almacenar la consulta de búsqueda
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
  methods: {
    submitForm() {
      // Redirige a la página de búsqueda con la consulta
      this.$router.push({ path: "/buscar", query: { q: this.searchQuery } });
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

.card img {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.book-btn1 {
  background-color: #28a745;
  color: #fff;
  border: none;
  font-size: 1rem;
}
</style>