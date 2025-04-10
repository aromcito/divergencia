<template>
  <section class="section section-doctor" :class="{ 'low-stimulus-mode': lowStimulusMode }">
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
      
      <div class="row align-items-center">
        <!-- Columna de texto -->
        <div class="col-lg-4 mb-4 mb-lg-0 aos" data-aos="fade-up">
          <div class="section-header mb-4">
            <h2 class="fw-bold" :class="lowStimulusMode ? 'text-secondary' : 'text-primary'">Conecta con Especialistas en Neurodivergencia</h2>
            <p class="lead" :class="lowStimulusMode ? 'text-muted' : ''">Profesionales altamente capacitados para brindar apoyo integral</p>
          </div>
          <div class="about-content">
            <p class="mb-3">
              Nuestro equipo multidisciplinario está formado por profesionales certificados en TEA, Asperger, TDAH, PAS y otras condiciones neurodivergentes, 
              que comprenden las necesidades únicas de cada persona.
            </p>
            <p>
              <span class="badge me-2 fw-normal" :class="lowStimulusMode ? 'bg-secondary-light text-secondary' : 'bg-primary-light text-primary'">
                <i class="fas fa-check-circle me-1"></i>90% con especialización
              </span>
              <span class="badge fw-normal" :class="lowStimulusMode ? 'bg-secondary-light text-secondary' : 'bg-primary-light text-primary'">
                <i class="fas fa-check-circle me-1"></i>Enfoque personalizado
              </span>
            </p>
            <router-link to="/especialistas" class="btn mt-3" :class="lowStimulusMode ? 'btn-outline-secondary' : 'btn-outline-primary'">
              Ver todos los especialistas <i class="fas fa-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>

        <!-- Carrusel de especialistas -->
        <div class="col-lg-8 aos" data-aos="fade-up">
          <div class="position-relative">
            <Carousel 
              :wrap-around="true" 
              :settings="settings" 
              :breakpoints="breakpoints"
              :autoplay="lowStimulusMode ? false : 3000"
            >
              <Slide v-for="item in especialistas" :key="item.especialista_id">
                <div class="profile-widget h-100" :class="{ 'low-stimulus-card': lowStimulusMode }">
                  <div class="doc-img position-relative">
                    <router-link :to="`/especialista/${item.especialista_id}`">
                      <img
                        class="img-fluid rounded-top"
                        :src="getProfileImage(item.imagen_perfil)"
                        :alt="`Foto de ${item.nombre} ${item.apellido}`"
                        loading="lazy"
                        :style="lowStimulusMode ? { filter: 'saturate(0.7)' } : {}"
                      />
                    </router-link>
                    <button class="fav-btn btn btn-icon" @click="toggleFavorito(item)" :aria-label="item.favorito ? 'Quitar de favoritos' : 'Añadir a favoritos'">
                      <i class="far fa-bookmark" :class="{'fas text-warning': item.favorito}"></i>
                    </button>
                  </div>
                  <div class="pro-content p-3">
                    <h3 class="title mb-1">
                      <router-link :to="`/especialista/${item.especialista_id}`" class="text-dark">
                        {{ item.nombre }} {{ item.apellido }}
                      </router-link>
                      <i class="fas fa-check-circle verified ms-1" :class="lowStimulusMode ? 'text-secondary' : 'text-primary'"></i>
                    </h3>
                    <p class="speciality mb-2" :class="lowStimulusMode ? 'text-muted' : ''">{{ item.titulo_profesional }}</p>
                    
                    <div class="rating mb-2">
                      <i 
                        class="fas fa-star filled me-1" 
                        :class="lowStimulusMode ? 'text-secondary' : 'text-warning'"
                        v-for="i in Math.round(item.porcentaje_aprobacion / 20)" 
                        :key="'filled-'+i"
                      ></i>
                      <i 
                        class="fas fa-star me-1" 
                        :class="lowStimulusMode ? 'text-light' : 'text-light'"
                        v-for="i in 5 - Math.round(item.porcentaje_aprobacion / 20)" 
                        :key="'empty-'+i"
                      ></i>
                      <span class="ms-1" :class="lowStimulusMode ? 'text-muted' : ''">({{ item.total_valoraciones }})</span>
                    </div>
                    
                    <ul class="available-info list-unstyled mb-3">
                      <li class="mb-1">
                        <i class="fas fa-map-marker-alt me-2" :class="lowStimulusMode ? 'text-secondary' : 'text-primary'"></i> 
                        {{ item.ubicacion }}
                      </li>
                      <li>
                        <i class="far fa-money-bill-alt me-2" :class="lowStimulusMode ? 'text-secondary' : 'text-primary'"></i> 
                        {{ item.precio_consulta }} {{ item.moneda }}
                        <i 
                          class="fas fa-info-circle ms-1" 
                          :class="lowStimulusMode ? 'text-muted' : ''"
                          v-tooltip="'Precio por consulta presencial'"
                          aria-label="Información de precio"
                        ></i>
                      </li>
                    </ul>
                    
                    <div class="d-grid">
                      <router-link 
                        :to="`/especialista/${item.especialista_id}`" 
                        class="btn"
                        :class="lowStimulusMode ? 'btn-secondary' : 'btn-primary'"
                      >
                        Ver Perfil Completo
                      </router-link>
                    </div>
                  </div>
                </div>
              </Slide>
              
              <template #addons>
                <Navigation v-if="!lowStimulusMode" />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import axios from 'axios';
import defaultProfile from '@/assets/img/default-profile.jpg';

export default {
  name: 'EspecialistasSection',
  data() {
    return {
      especialistas: [],
      lowStimulusMode: false,
      baseFontSize: 16,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        320: { itemsToShow: 1 },
        576: { itemsToShow: 1 },
        768: { itemsToShow: 2 },
        992: { itemsToShow: 3 },
        1200: { itemsToShow: 3 }
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  mounted() {
    AOS.init();
    this.fetchEspecialistas();
    this.checkPrefersReducedMotion();
  },
  methods: {
    async fetchEspecialistas() {
      try {
        const { data } = await axios.get('http://localhost:4000/api/especialistas');
        this.especialistas = data.map(esp => ({
          ...esp,
          favorito: false,
          condiciones: esp.condiciones || []
        }));
      } catch (err) {
        console.error('Error al cargar especialistas:', err);
      }
    },
    toggleFavorito(especialista) {
      especialista.favorito = !especialista.favorito;
    },
    getProfileImage(image) {
      try {
        if (!image) return defaultProfile;
        return require(`@/assets/img/especialistas/${image}`);
      } catch (e) {
        console.warn('Error cargando imagen de perfil:', e);
        return defaultProfile;
      }
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
  --color-primary-light: #F8E9E6;
  --color-secondary: #6B9080; /* Verde calmante */
  --color-secondary-light: #E8F0ED;
  --color-text: #2E3A3D;      /* Gris oscuro suave */
  --color-bg: #F6FFF8;        /* Blanco con tono verde muy claro */
}

.section-doctor {
  background-color: var(--color-bg);
  padding: 3rem 0;
  transition: all 0.3s ease;
}

.low-stimulus-mode .section-doctor {
  --color-primary: #6B9080;
  --color-primary-light: #E8F0ED;
  --color-bg: #FFFFFF;
  background-color: var(--color-bg);
}

.profile-widget {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
  margin: 0 0.5rem;
}

.low-stimulus-mode .profile-widget {
  border: 1px solid #eee;
}

.profile-widget:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.low-stimulus-mode .profile-widget:hover {
  transform: none;
  box-shadow: none;
}

.doc-img {
  height: 200px;
  overflow: hidden;
}

.doc-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.profile-widget:hover .doc-img img {
  transform: scale(1.05);
}

.low-stimulus-mode .profile-widget:hover .doc-img img {
  transform: none;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--color-text);
}

.pro-content {
  background: white;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
}

.speciality {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
}

.available-info {
  font-size: 0.85rem;
}

.available-info li {
  margin-bottom: 0.3rem;
}

/* Carousel adaptado */
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

/* Badges */
.badge {
  padding: 0.5em 0.8em;
  font-weight: 400;
}

.bg-primary-light {
  background-color: var(--color-primary-light);
}

.bg-secondary-light {
  background-color: var(--color-secondary-light);
}
</style>