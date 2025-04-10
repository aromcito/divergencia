<template>
  <div class="col-md-12 col-lg-8 col-xl-9">
<!-- Filtros -->
<div class="mb-3 d-flex gap-3">
  <input
    type="text"
    v-model="filtro.nombre"
    class="form-control form-control-lg"
    placeholder="Buscar por nombre"
  />
  <input
    type="text"
    v-model="filtro.titulo"
    class="form-control form-control-lg"
    placeholder="Título profesional"
  />
  <input
    type="text"
    v-model="filtro.ubicacion"
    class="form-control form-control-lg"
    placeholder="Ubicación"
  />
  <button class="btn btn-gradient-primary btn-lg" @click="buscar">Filtrar</button>
</div>


    <!-- Resultados -->
    <div class="card mb-3 shadow-lg" v-for="item in paginatedResults" :key="item.especialista_id">
      <div class="card-body">
        <div class="doctor-widget d-flex">
          <div class="doc-info-left d-flex align-items-center">
            <div class="doctor-img">
              <router-link to="doctor-profile">
                <img
                  :src="`/src/assets/img/especialistas/${item.imagen_perfil}`"
                  class="img-fluid rounded-circle border shadow-sm"
                  alt="Imagen"
                />
              </router-link>
            </div>
            <div class="doc-info-cont ms-3">
              <h4 class="doc-name text-primary">
                <router-link to="doctor-profile">{{ item.nombre }} {{ item.apellido }}</router-link>
              </h4>
              <p class="doc-speciality text-muted">{{ item.titulo_profesional }}</p>
              <h5 class="doc-department text-info">
                {{ item.formacion }}
              </h5>
              <div class="rating text-warning">
                <i class="fas fa-star filled" v-for="i in Math.round(item.porcentaje_aprobacion / 20)" :key="i"></i>
                <i class="fas fa-star" v-for="i in 5 - Math.round(item.porcentaje_aprobacion / 20)" :key="i"></i>
                <span class="d-inline-block average-rating ms-1">{{ item.total_valoraciones }}</span>
              </div>
              <div class="clinic-details mt-2">
                <p class="doc-location text-secondary">
                  <i class="fas fa-map-marker-alt"></i> {{ item.ubicacion }}
                </p>
              </div>
            </div>
          </div>
          <div class="doc-info-right ms-auto">
            <div class="clini-infos">
              <ul class="list-unstyled">
                <li><i class="far fa-thumbs-up"></i> {{ item.porcentaje_aprobacion }}%</li>
                <li><i class="far fa-comment"></i> {{ item.total_valoraciones }}</li>
                <li><i class="fas fa-map-marker-alt"></i> {{ item.ubicacion }}</li>
                <li>
                  <i class="far fa-money-bill-alt"></i> {{ item.precio_consulta }} {{ item.moneda }}
                  <i class="fas fa-info-circle" data-bs-toggle="tooltip" title="Consulta presencial"></i>
                </li>
              </ul>
            </div>
            <div class="clinic-booking mt-3">
              <router-link class="btn btn-outline-primary" to="doctor-profile">Ver Perfil</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="load-more text-center mt-4" v-if="searchFiltered.length > perPage * currentPage">
      <button class="btn btn-gradient-primary btn-sm" @click="loadMore">Cargar más</button>
    </div>

    <vue-easy-lightbox
      :visible="visible"
      :index="index"
      :imgs="galleryImages.map((image) => ({ src: require(`@/assets/img/features/${image.src}`) }))"
      @hide="visible = false"
      @on-prev="handlePrev"
      @on-next="handleNext"
    />
  </div>
</template>

<script>
import axios from 'axios';
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      search: [],
      filtro: {
        nombre: '',
        titulo: '',
        ubicacion: '',
      },
      visible: false,
      index: 0,
      currentPage: 1,
      perPage: 6,
      galleryImages: [
        { src: 'feature-01.jpg' },
        { src: 'feature-02.jpg' },
        { src: 'feature-03.jpg' },
        { src: 'feature-04.jpg' },
      ],
    };
  },
  computed: {
    searchFiltered() {
      return this.search.filter((item) => {
        const nombreCompleto = `${item.nombre} ${item.apellido}`.toLowerCase();
        return (
          (!this.filtro.nombre || nombreCompleto.includes(this.filtro.nombre.toLowerCase())) &&
          (!this.filtro.titulo || item.titulo_profesional.toLowerCase().includes(this.filtro.titulo.toLowerCase())) &&
          (!this.filtro.ubicacion || item.ubicacion.toLowerCase().includes(this.filtro.ubicacion.toLowerCase()))
        );
      });
    },
    paginatedResults() {
      return this.searchFiltered.slice(0, this.currentPage * this.perPage);
    },
  },
  methods: {
    show(index) {
      this.index = index;
      this.visible = true;
    },
    handlePrev() {
      if (this.index > 0) this.index--;
    },
    handleNext() {
      if (this.index < this.galleryImages.length - 1) this.index++;
    },
    async fetchEspecialistas() {
      try {
        const response = await axios.get('http://localhost:4000/api/especialistas');
        this.search = response.data;
      } catch (error) {
        console.error('Error al obtener especialistas:', error);
      }
    },
    buscar() {
      this.currentPage = 1;
    },
    loadMore() {
      this.currentPage++;
    },
  },
  mounted() {
    this.fetchEspecialistas();
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
}
.card-body {
  padding: 1.5rem;
}
.btn-gradient-primary {
  background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
}
.btn-gradient-primary:hover {
  background: linear-gradient(to right, #6a11cb 0%, #00c6ff 100%);
}
.btn-outline-primary {
  border-color: #00c6ff;
  color: #00c6ff;
}
.btn-outline-primary:hover {
  background-color: #00c6ff;
  color: white;
}
.doctor-img img {
  border-radius: 50%;
  border: 3px solid #ddd;
}
.rating i.filled {
  color: gold;
}
.clinic-services span {
  display: inline-block;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 14px;
}
</style>
