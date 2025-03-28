<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { loadStyles } from "@/loadStyles";
export default {
  name: 'App',
  setup() {
    loadStyles();
    return {};
  },
};
</script>
