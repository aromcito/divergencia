<template>
    <div ref="htmlContainer"></div>
  </template>
  
  <script>
  import DOMPurify from 'dompurify';
  
  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.sanitizeAndRender();
    },
    methods: {
      sanitizeAndRender() {
        const clean = DOMPurify.sanitize(this.content);
        this.$refs.htmlContainer.innerHTML = clean;
      }
    },
    watch: {
      content() {
        this.sanitizeAndRender();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>