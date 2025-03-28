module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended', // Soporte para Vue 3
    ],
    parserOptions: {
      ecmaVersion: 12, // Soporte para ES6+
      sourceType: 'module', // Soporte para módulos ES6
    },
    plugins: ['vue'],
    rules: {
      'vue/multi-word-component-names': 'off', // Desactiva la regla de nombres multi-palabra
      'vue/max-attributes-per-line': 'off', // Desactiva la regla de atributos por línea
      'vue/html-self-closing': 'off', // Desactiva la regla de elementos auto-cerrados
      'vue/attributes-order': 'off', // Desactiva la regla de orden de atributos
      'vue/singleline-html-element-content-newline': 'off', // Desactiva la regla de saltos de línea
      'vue/html-indent': 'off', // Desactiva la regla de indentación
      'vue/html-closing-bracket-newline': 'off', // Desactiva la regla de saltos de línea en cierres
      'vue/v-bind-style': 'off', // Desactiva la regla de estilo para v-bind
      'vue/order-in-components': 'off', // Desactiva la regla de orden de propiedades
      'vue/multiline-html-element-content-newline': 'off', // Desactiva la regla
      'vue/component-definition-name-casing': 'off',
      'vue/no-template-shadow': 'off',
    },
    
  };