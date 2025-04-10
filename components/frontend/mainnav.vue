<template>
  <ul class="main-nav" :class="$route.meta.headerMainNavClass">

    <!-- Menú de Doctores -->
    <li class="has-submenu" :class="doctorMenu ? 'active' : 'notactive'">
      <a @click="toggleVisibility('doctor')">Doctors <i class="fas fa-chevron-down"></i></a>
      <ul class="submenu" :style="{ display: isVisible.doctor ? 'block' : 'none' }">
        <li v-for="(item, index) in doctorMenuItems" :key="index" :class="currentPath === item.path ? 'active' : 'notactive'">
          <router-link :to="item.path">{{ item.label }}</router-link>
        </li>
      </ul>
    </li>

    <!-- Menú de Pacientes -->
    <li class="has-submenu" :class="patientsMenu ? 'active' : 'notactive'">
      <a @click="toggleVisibility('patients')">Patients <i class="fas fa-chevron-down"></i></a>
      <ul class="submenu" :style="{ display: isVisible.patients ? 'block' : 'none' }">
        <li v-for="(item, index) in patientsMenuItems" :key="index" :class="currentPath === item.path ? 'active' : 'notactive'">
          <router-link :to="item.path">{{ item.label }}</router-link>
        </li>
      </ul>
    </li>

    <!-- Menú de Farmacia -->
    <li class="has-submenu" :class="pharmacyMenu ? 'active' : 'notactive'">
      <a @click="toggleVisibility('pharmacy')">Pharmacy <i class="fas fa-chevron-down"></i></a>
      <ul class="submenu" :style="{ display: isVisible.pharmacy ? 'block' : 'none' }">
        <li v-for="(item, index) in pharmacyMenuItems" :key="index" :class="currentPath === item.path ? 'active' : 'notactive'">
          <router-link :to="item.path">{{ item.label }}</router-link>
        </li>
      </ul>
    </li>

    <!-- Menú de Páginas -->
<li class="has-submenu" :class="pagesMenu ? 'active' : 'notactive'">
  <a @click="toggleVisibility('pages')">Pages <i class="fas fa-chevron-down"></i></a>
  <ul class="submenu" :style="{ display: isVisible.pages ? 'block' : 'none' }">
    <li v-for="(item, index) in pagesMenuItems" :key="index" :class="currentPath === item.path ? 'active' : 'notactive'">
      <router-link :to="item.path">{{ item.label }}</router-link>
    </li>
  </ul>
</li>

<!-- Menú de Blog -->
<li class="has-submenu" :class="blogMenu ? 'active' : 'notactive'">
  <a @click="toggleVisibility('blog')">Blog <i class="fas fa-chevron-down"></i></a>
  <ul class="submenu" :style="{ display: isVisible.blog ? 'block' : 'none' }">
    <li 
      v-for="(item, index) in blogMenuItems" 
      :key="index" 
      :class="currentPath === item.path ? 'active' : 'notactive'"
    >
      <router-link :to="item.path">{{ item.label }}</router-link>
    </li>
  </ul>
</li>

<!-- Menú de Administración -->
<li class="has-submenu" :class="adminMenu ? 'active' : 'notactive'">
  <a @click="toggleVisibility('admin')">AdminPrueba 1 <i class="fas fa-chevron-down"></i></a>
  <ul class="submenu" :style="{ display: isVisible.admin ? 'block' : 'none' }">
    <li :class="currentPath === '/admin/especialidadeslist' ? 'active' : 'notactive'">
      <router-link to="/admin/especialidadeslist">Mantenedor Especialidades</router-link>
    </li>

    <li :class="currentPath === '/prefesional/profesionaleslist' ? 'active' : 'notactive'">
      <router-link to="/prefesional/profesionaleslist">Mantenedor Especialistas</router-link>
    </li>
  </ul>
</li>

    <!-- Enlace de Login/Logout -->
    <li class="login-link">
      <router-link v-if="!isLoggedIn" to="/login">Login / Signup</router-link>
      <a v-else @click="logout">Cerrar Sesión</a>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isVisible: {
        home: false,
        doctor: false,
        patients: false,
        pharmacy: false,
        pages: false,
        blog: false,
        admin: false,
      },
      isAdmin: false,
      isLoggedIn: false,
      homeMenuItems: [
        { path: "/", label: "General Home", image: "@/assets/img/home-11.jpg" },
        { path: "/index-2", label: "General Home 2", image: "@/assets/img/home-10.jpg" },
      ],
      doctorMenuItems: [
        { path: "/doctor-dashboard", label: "Doctor Dashboard" },
        { path: "/appointments", label: "Appointments" },
      ],
      patientsMenuItems: [
        { path: "/map-grid", label: "Map Grid" },
        { path: "/map-list", label: "Map List" },
      ],
      pharmacyMenuItems: [
        { path: "/pharmacy-index", label: "Pharmacy" },
        { path: "/pharmacy-details", label: "Pharmacy Details" },
      ],
      pagesMenuItems: [
        { path: "/about-us", label: "About Us" },
        { path: "/contact-us", label: "Contact Us" },
      ],
      blogMenuItems: [
        { path: "/blogs/BlogList", label: "Lista Blog" },
        { path: "/blogs/BlogDetail", label: "Detalle Blog" },
      ],
      adminMenuItems: [
        { path: "/admin/index", label: "Panel de Admin" },
      ],
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    homeMenu() {
      return this.homeMenuItems.some((item) => item.path === this.currentPath);
    },
    doctorMenu() {
      return this.doctorMenuItems.some((item) => item.path === this.currentPath);
    },
    patientsMenu() {
      return this.patientsMenuItems.some((item) => item.path === this.currentPath);
    },
    pharmacyMenu() {
      return this.pharmacyMenuItems.some((item) => item.path === this.currentPath);
    },
    pagesMenu() {
      return this.pagesMenuItems.some((item) => item.path === this.currentPath);
    },
    blogMenu() {
      return this.blogMenuItems.some((item) => item.path === this.currentPath);
    },
    adminMenu() {
      return this.adminMenuItems.some((item) => item.path === this.currentPath);
    },
  },
  methods: {
    toggleVisibility(menu) {
      this.isVisible[menu] = !this.isVisible[menu];
    },
    async checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/check', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.isLoggedIn = true;
          this.isAdmin = response.data.role === 'admin';
        } catch (error) {
          this.logout();
        }
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  created() {
    this.checkAuth();
  }
};
</script>

<style scoped>
.main-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.has-submenu {
  position: relative;
  margin: 0 15px;
}

.has-submenu > a {
  color: #333;
  text-decoration: none;
  padding: 10px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.has-submenu > a:hover {
  color: #2c7be5;
}

.submenu {
  display: none;
  position: absolute;
  background: white;
  min-width: 200px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 10px 0;
  z-index: 1000;
}

.submenu li {
  padding: 8px 20px;
}

.submenu li:hover {
  background-color: #f8f9fa;
}

.submenu a {
  color: #333;
  text-decoration: none;
  display: block;
}

.mega-submenu {
  width: 800px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
}

.megamenu-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.single-demo {
  margin-bottom: 15px;
  text-align: center;
}

.demo-img img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.active > a {
  color: #2c7be5;
  font-weight: 600;
}

.login-link {
  margin-left: auto;
}

.login-link a {
  color: #2c7be5;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 20px;
  border: 1px solid #2c7be5;
  border-radius: 4px;
}

.login-link a:hover {
  background-color: #2c7be5;
  color: white;
}
</style>