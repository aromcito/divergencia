<template>
  <section class="section section-sponsors" :class="{ 'low-stimulus-mode': lowStimulusMode }">
    <div class="container">
      <!-- Controles de accesibilidad -->
      <div class="accessibility-controls mb-4">
        <button @click="toggleLowStimulusMode" class="btn btn-sm" :class="lowStimulusMode ? 'btn-secondary' : 'btn-outline-secondary'">
          <i class="fas" :class="lowStimulusMode ? 'fa-eye' : 'fa-eye-slash'"></i>
          {{ lowStimulusMode ? 'Modo estándar' : 'Modo bajo estímulo' }}
        </button>
      </div>

      <div class="section-header text-center mb-5 aos" data-aos="fade-up">
        <h2 class="fw-bold" :class="lowStimulusMode ? 'text-secondary' : 'text-primary'">Nuestros Aliados</h2>
        <p class="mx-auto" :class="lowStimulusMode ? 'text-muted' : ''" style="max-width: 700px;">
          Organizaciones y empresas que apoyan a la comunidad neurodivergente
        </p>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 aos" data-aos="fade-up">
          <div class="sponsors-slider">
            <Carousel 
              :wrap-around="true" 
              :autoplay="lowStimulusMode ? false : 3000"
              :pause-autoplay-on-hover="!lowStimulusMode"
              :settings="settings" 
              :breakpoints="breakpoints"
            >
              <Slide v-for="(sponsor, index) in sponsors" :key="index">
                <div class="sponsor-item text-center">
                  <a 
                    :href="sponsor.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    :aria-label="'Enlace a ' + sponsor.name"
                  >
                    <img
                      :src="getSponsorImage(sponsor.image)"
                      class="img-fluid sponsor-logo"
                      :alt="'Logo de ' + sponsor.name"
                      loading="lazy"
                      @error="handleImageError"
                      :style="lowStimulusMode ? { filter: 'saturate(0.7)' } : {}"
                    />
                  </a>
                  <p class="sponsor-name mt-3 small" :class="lowStimulusMode ? 'text-muted' : ''">
                    {{ sponsor.name }}
                  </p>
                </div>
              </Slide>
              
              <template #addons>
                <Pagination v-if="!lowStimulusMode" />
                <Navigation v-if="sponsors.length > 3 && !lowStimulusMode" />
              </template>
            </Carousel>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <a 
          href="/convertirse-en-aliado" 
          class="btn px-4"
          :class="lowStimulusMode ? 'btn-outline-secondary' : 'btn-outline-primary'"
        >
          ¿Quieres ser aliado? <i class="fas fa-arrow-right ms-2"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import sponsorsData from "@/assets/json/sponsors.json";

export default {
  name: "SponsorsSection",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      sponsors: sponsorsData,
      lowStimulusMode: false,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        320: { itemsToShow: 2 },
        576: { itemsToShow: 3 },
        768: { itemsToShow: 4 },
        992: { itemsToShow: 5 },
        1200: { itemsToShow: 6 }
      },
    };
  },
  mounted() {
    AOS.init();
    this.checkPrefersReducedMotion();
  },
  methods: {
    getSponsorImage(image) {
      try {
        if (!image) return this.getDefaultLogo();
        return require(`@/assets/img/sponsors/${image}`);
      } catch (e) {
        console.warn(`Error cargando imagen de sponsor: ${image}`, e);
        return this.getDefaultLogo();
      }
    },
    getDefaultLogo() {
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ij48L2NpcmNsZT48bGluZSB4MT0iMjEiIHkxPSIyMSIgeDI9IjE2LjY1IiB5Mj0iMTYuNjUiPjwvbGluZT48L3N2Zz4=';
    },
    handleImageError(event) {
      event.target.src = this.getDefaultLogo();
      event.target.onerror = null;
    },
    toggleLowStimulusMode() {
      this.lowStimulusMode = !this.lowStimulusMode;
      document.documentElement.classList.toggle('low-stimulus-mode', this.lowStimulusMode);
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
  --color-primary: #E2725B;
  --color-secondary: #6B9080;
  --color-text: #2E3A3D;
  --color-bg: #F6FFF8;
}

.section-sponsors {
  background-color: var(--color-bg);
  padding: 3rem 0;
  transition: all 0.3s ease;
}

.low-stimulus-mode .section-sponsors {
  --color-primary: #6B9080;
  --color-bg: #FFFFFF;
  background-color: var(--color-bg);
}

.sponsor-item {
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.sponsor-logo {
  max-height: 80px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(20%);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.sponsor-item:hover .sponsor-logo {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

.low-stimulus-mode .sponsor-item:hover .sponsor-logo {
  transform: none;
}

.sponsor-name {
  font-weight: 500;
  color: var(--color-text);
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
}

/* Animaciones reducidas */
.low-stimulus-mode [data-aos] {
  transition: none !important;
  transform: none !important;
  opacity: 1 !important;
}
</style>