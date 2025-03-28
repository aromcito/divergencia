<template>
    <div>
      <h1>Resultados de Búsqueda</h1>
      <p>Mostrando resultados para: "{{ searchQuery }}"</p>
      <!-- Agrega el contenido de la búsqueda general aquí -->
    </div>
  </template>
  
  <script>
  export default {
    name: "Buscar",
    computed: {
      searchQuery() {
        return this.$route.query.q || "";
      },
    },
  };
  </script>