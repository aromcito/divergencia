<template>
  <section class="section section-specialities" :class="{ 'low-stimulus-mode': lowStimulusMode }">
    <div class="container">
      <!-- Controles de accesibilidad -->
      <div class="accessibility-controls mb-4">
        <button @click="toggleLowStimulusMode" class="btn btn-sm" :class="lowStimulusMode ? 'btn-secondary' : 'btn-outline-secondary'">
          <i class="fas" :class="lowStimulusMode ? 'fa-eye' : 'fa-eye-slash'"></i>
          {{ lowStimulusMode ? 'Modo estándar' : 'Modo bajo estímulo' }}
        </button>
        <div class="text-size-controls btn-group btn-group-sm ms-2">
          <button @click="increaseFontSize" class="btn btn-outline-secondary">A+</button>
          <button @click="resetFontSize" class="btn btn-outline-secondary">A</button>
        </div>
      </div>

      <div class="section-header text-center mb-5 aos" data-aos="fade-up">
        <h2 class="display-5 fw-bold mb-3">Nuestras Especialidades</h2>
        <p class="lead mx-auto" style="max-width: 700px;">
          Servicios especializados diseñados para las necesidades únicas de la comunidad neurodivergente
        </p>
      </div>
      
      <div class="row justify-content-center">
        <div class="col-12 aos" data-aos="fade-up">
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border" role="status" :style="{ color: lowStimulusMode ? 'var(--color-secondary)' : 'var(--color-primary)' }">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
          
          <div v-else-if="error" class="alert text-center" :class="lowStimulusMode ? 'alert-secondary' : 'alert-danger'">
            <i class="fas fa-exclamation-triangle me-2"></i>
            No pudimos cargar las especialidades. Por favor intenta nuevamente.
            <button class="btn btn-sm ms-3" :class="lowStimulusMode ? 'btn-outline-secondary' : 'btn-outline-danger'" @click="fetchEspecialidades">
              Reintentar
            </button>
          </div>
          
          <div v-else class="specialities-slider">
            <Carousel 
              :wrap-around="true" 
              :autoplay="lowStimulusMode ? false : 4000"
              :pause-autoplay-on-hover="!lowStimulusMode"
              :settings="settings" 
              :breakpoints="breakpoints"
            >
              <Slide v-for="item in especialidades" :key="item.id">
                <div class="speicality-item text-center mx-2">
                  <div class="speicality-img position-relative mb-3">
                    <img
                      :src="getImageUrl(item.image)"
                      class="img-fluid rounded-3"
                      :alt="`Icono de ${item.nombre}`"
                      loading="lazy"
                      @error="handleImageError"
                      :style="lowStimulusMode ? { filter: 'saturate(0.5)' } : {}"
                    />
                  </div>
                  <h3 class="h5 fw-bold mb-2">{{ item.nombre }}</h3>
                  <p class="small mb-0" :class="lowStimulusMode ? 'text-muted' : ''">{{ item.descripcion }}</p>
                  <router-link 
                    :to="`/especialidades/${item.id}`" 
                    class="btn btn-link text-decoration-none mt-2"
                    :class="lowStimulusMode ? 'text-secondary' : 'text-primary'"
                  >
                    Ver más <i class="fas fa-arrow-right ms-1"></i>
                  </router-link>
                </div>
              </Slide>
              
              <template #addons>
                <Pagination v-if="!lowStimulusMode" />
                <Navigation v-if="especialidades.length > 3 && !lowStimulusMode" />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-5">
        <router-link to="/especialidades" class="btn btn-lg px-4" :class="lowStimulusMode ? 'btn-secondary' : 'btn-primary'">
          Ver todas las especialidades
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import axios from "axios";
import defaultImage from '@/assets/img/default-specialty.jpg';

export default {
  name: "SpecialitiesSection",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      especialidades: [],
      loading: true,
      error: false,
      lowStimulusMode: false,
      baseFontSize: 16,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        320: { itemsToShow: 1 },
        576: { itemsToShow: 2 },
        768: { itemsToShow: 3 },
        992: { itemsToShow: 4 },
        1200: { itemsToShow: 5 }
      },
    };
  },
  mounted() {
    AOS.init();
    this.fetchEspecialidades();
    this.checkPrefersReducedMotion();
  },
  methods: {
    async fetchEspecialidades() {
      this.loading = true;
      this.error = false;
      try {
        const response = await axios.get("http://localhost:4000/api/especialidades");
        this.especialidades = response.data.map(item => ({
          ...item,
          image: item.image ? `${item.image.split('.')[0]}.jpg` : null
        }));
      } catch (error) {
        console.error("Error al obtener especialidades:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    getImageUrl(image) {
      try {
        if (!image) return defaultImage;
        return require(`@/assets/img/especialidades/${image}`);
      } catch (e) {
        console.warn(`Error cargando imagen ${image}:`, e);
        return defaultImage;
      }
    },
    handleImageError(event) {
      event.target.src = defaultImage;
      event.target.onerror = null;
    },
    toggleLowStimulusMode() {
      this.lowStimulusMode = !this.lowStimulusMode;
      document.documentElement.classList.toggle('low-stimulus-mode', this.lowStimulusMode);
    },
    increaseFontSize() {
      this.baseFontSize += 2;
      document.documentElement.style.fontSize = `${this.baseFontSize}px`;
    },
    resetFontSize() {
      this.baseFontSize = 16;
      document.documentElement.style.fontSize = `${this.baseFontSize}px`;
    },
    getConditionIcon(condition) {
      const icons = {
        'TEA': 'fa-puzzle-piece',
        'Asperger': 'fa-brain',
        'TDAH': 'fa-bolt',
        'PAS': 'fa-feather',
        'default': 'fa-check'
      };
      return `fas ${icons[condition] || icons.default}`;
    },
    checkPrefersReducedMotion() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        this.lowStimulusMode = true;
        document.documentElement.classList.add('low-stimulus-mode');
      }
    }
  },
};
</script>

<style scoped>
:root {
  --color-primary: #E2725B;  /* Rojo dorado */
  --color-secondary: #6B9080; /* Verde calmante */
  --color-accent: #A4C3B2;    /* Verde pastel */
  --color-text: #2E3A3D;      /* Gris oscuro suave */
  --color-bg: #F6FFF8;        /* Blanco con tono verde muy claro */
}

.section-specialities {
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 3rem 0;
  transition: all 0.3s ease;
}

.low-stimulus-mode .section-specialities {
  --color-primary: #6B9080;
  --color-bg: #FFFFFF;
  background-color: var(--color-bg);
}

.speicality-item {
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid rgba(0,0,0,0.05);
}

.low-stimulus-mode .speicality-item {
  border: 1px solid #eee;
}

.speicality-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.low-stimulus-mode .speicality-item:hover {
  transform: none;
  box-shadow: none;
}

.speicality-img {
  padding: 1rem;
  margin-bottom: 1rem;
}

.speicality-img img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.speicality-item:hover .speicality-img img {
  transform: scale(1.05);
}

.low-stimulus-mode .speicality-item:hover .speicality-img img {
  transform: none;
}

.condition-badge {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: white;
}

.low-stimulus-mode .condition-badge {
  background-color: var(--color-secondary);
}

/* Carousel adaptado */
:deep(.carousel__pagination-button) {
  background-color: #dee2e6;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
}

:deep(.carousel__pagination-button--active) {
  background-color: var(--color-primary);
}

.low-stimulus-mode :deep(.carousel__pagination-button--active) {
  background-color: var(--color-secondary);
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: white;
  color: var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  border: none;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: var(--color-primary);
  color: white;
}

.low-stimulus-mode :deep(.carousel__prev),
.low-stimulus-mode :deep(.carousel__next) {
  color: var(--color-secondary);
  box-shadow: none;
}

.low-stimulus-mode :deep(.carousel__prev:hover),
.low-stimulus-mode :deep(.carousel__next:hover) {
  background-color: var(--color-secondary);
  color: white;
}

.accessibility-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text-size-controls {
  margin-left: 10px;
}

/* Animaciones reducidas */
.low-stimulus-mode [data-aos] {
  transition: none !important;
  transform: none !important;
  opacity: 1 !important;
}
</style>