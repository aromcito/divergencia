<template>
  <div class="main-wrapper bg-light min-h-screen flex flex-col">
    <layoutheader />

    <breadcrumb :title="title" :text="text" :text1="text1" />

    <div class="content py-6">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Lista de Resultados -->
          <div class="col-md-12 col-lg-10 col-xl-9">
            <div class="card shadow-sm rounded-3 border-0">
              <div class="card-body p-4">
                <searchlist />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <indexfooter />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      title: "Buscar Profesionales",
      text: "Inicio",
      text1: "Buscar Profesionales",
      startdate: ref(new Date()),
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  background-color: #f9fafb;
}
.card {
  background-color: #ffffff;
}
</style>
