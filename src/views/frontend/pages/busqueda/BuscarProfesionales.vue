<template>
  <div class="main-wrapper">
    <layoutheader></layoutheader>
    <breadcrumb :title="title" :text="text" :text1="text1" />

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
            <!-- Filtro de Búsqueda -->
            <div class="stickysidebar">
              <div class="card search-filter">
                <div class="card-header">
                  <h4 class="card-title mb-0">Filtros de Búsqueda</h4>
                </div>
                <div class="card-body">
                  <!-- Filtro por Fecha -->
                  <div class="filter-widget">
                    <div class="cal-icon">
                      <datepicker
                        v-model="startdate"
                        placeholder="Seleccionar Fecha"
                        class="form-control datetimepicker"
                        :editable="true"
                        :clearable="false"
                        :input-format="dateFormat"
                      />
                    </div>
                  </div>

                  <!-- Filtro por Género -->
                  <div class="filter-widget">
                    <h4>Género</h4>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" checked />
                        <span class="checkmark"></span> Masculino
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Femenino
                      </label>
                    </div>
                  </div>

                  <!-- Filtro por Especialización -->
                  <div class="filter-widget">
                    <h4>Especialización</h4>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" checked />
                        <span class="checkmark"></span> Psicología
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Terapia Ocupacional
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Neurología
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Educación Especial
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Logopedia
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Psiquiatría
                      </label>
                    </div>
                  </div>

                  <!-- Botón de Búsqueda -->
                  <div class="btn-search">
                    <b-button type="button" class="btn w-100">Buscar</b-button>
                  </div>

                  <div class="btn-secondary">
                    <b-button @click="goBack" class="btn w-100">Volver</b-button>
                  </div>
                  
                </div>
              </div>
            </div>
            <!-- /Filtro de Búsqueda -->
          </div>

          <!-- Lista de Resultados -->
          <div class="col-md-12 col-lg-8 col-xl-9">
            <searchlist></searchlist>
          </div>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
</template>

<script>
import { ref } from "vue";
import Datepicker from "vue3-datepicker"; // Asegúrate de tener instalada esta dependencia

const currentDate = ref(new Date());

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      title: "Buscar Profesionales",
      text: "Inicio",
      text1: "Buscar Profesionales",
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Regresa a la página anterior
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados */
.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #20c0f3;
  color: #fff;
  border-radius: 10px 10px 0 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.filter-widget {
  margin-bottom: 20px;
}

.filter-widget h4 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.custom_check {
  display: block;
  margin-bottom: 10px;
}

.btn-search .btn {
  background-color: #20c0f3;
  color: #fff;
  border: none;
  font-weight: bold;
}

.btn-search .btn:hover {
  background-color: #20c0f3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>