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
                  <!-- Filtro por Ubicación -->
                  <div class="filter-widget">
                    <h4>Ubicación</h4>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ingresa una ubicación"
                      v-model="ubicacion"
                    />
                  </div>

                  <!-- Filtro por Tipo de Comida -->
                  <div class="filter-widget">
                    <h4>Tipo de Comida</h4>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="food_type" checked />
                        <span class="checkmark"></span> Vegana
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="food_type" />
                        <span class="checkmark"></span> Vegetariana
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="food_type" />
                        <span class="checkmark"></span> Sin Gluten
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="food_type" />
                        <span class="checkmark"></span> Orgánica
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="food_type" />
                        <span class="checkmark"></span> Internacional
                      </label>
                    </div>
                  </div>

                  <!-- Filtro por Servicios Especiales -->
                  <div class="filter-widget">
                    <h4>Servicios Especiales</h4>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="special_services" checked />
                        <span class="checkmark"></span> Menú Sensorial
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="special_services" />
                        <span class="checkmark"></span> Espacios Tranquilos
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="special_services" />
                        <span class="checkmark"></span> Acceso para Sillas de Ruedas
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="special_services" />
                        <span class="checkmark"></span> Personal Capacitado
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
    <FooterIndex></FooterIndex>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "Buscar Restaurantes",
      text: "Inicio",
      text1: "Buscar Restaurantes",
      ubicacion: "", // Variable para almacenar la ubicación
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
</style>