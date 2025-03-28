<template>
  <!-- Clinic and Specialities -->
  <section class="section section-specialities">
    <div class="container-fluid">
      <div class="section-header text-center aos" data-aos="fade-up">
        <h2>Especialidades</h2>
        <p class="sub-title">
          Descubre las especialidades que ofrecemos para la comunidad neurodivergente.
        </p>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-9 aos" data-aos="fade-up">
          <!-- Carousel -->
          <div class="specialities-slider slider">
            <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
              <Slide v-for="item in especialidades" :key="item.id">
                <div class="speicality-item text-center mb-3">
                  <div class="speicality-img">
                    <img
                      :src="getImageUrl(item.Image)"
                      class="img-fluid"
                      alt="Speciality"
                      loading="lazy"
                    />
                    <span><i class="fa fa-circle" aria-hidden="true"></i></span>
                  </div>
                  <p>{{ item.Title }}</p>
                </div>
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Clinic and Specialities -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import especialidades from "@/assets/json/especialidades.json"; // Importar el archivo JSON

export default {
  name: "SpecialitiesSection", // Nombre del componente
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      especialidades: especialidades, // Asignar los datos importados
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        375: { itemsToShow: 1, snapAlign: "center" }, // Para móviles pequeños
        575: { itemsToShow: 3, snapAlign: "center" }, // Para móviles grandes
        767: { itemsToShow: 3, snapAlign: "center" }, // Para tablets
        1024: { itemsToShow: 5, snapAlign: "start" }, // Para escritorios
      },
    };
  },
  mounted() {
    console.log("Componente montado");
    this.$nextTick(() => {
      console.log("DOM actualizado");
      AOS.init(); // Inicializar animaciones después de que el DOM se haya actualizado
    });
  },
  methods: {
    getImageUrl(imagen) {
      // Construye la URL de la imagen
      return require(`@/assets/img/especialidades/${imagen}`);
    },
  },
};
</script>
<style scoped>
/* Estilos personalizados */
.section-specialities {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.section-header .sub-title {
  font-size: 1rem;
  color: #666;
  margin-top: 0;
}

.speicality-item {
  background: #fff;
  border-radius: 8px; /* Reducir el radio de borde */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra más ligera */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  border: 1px solid #e0e0e0; /* Borde sutil */
}

.speicality-item:hover {
  transform: translateY(-5px); /* Efecto de elevación más sutil */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada al hacer hover */
}

.speicality-img img {
  width: 80px; /* Reducir el tamaño de la imagen */
  height: 80px;
  border-radius: 20%; /* Hacer las imágenes menos circulares */
  margin-bottom: 15px;
  object-fit: cover; /* Asegurar que la imagen se ajuste correctamente */
}

.speicality-item p {
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
  font-weight: 500; /* Texto un poco más destacado */
}
</style>