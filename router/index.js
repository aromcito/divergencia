import { createRouter, createWebHistory } from 'vue-router';

// Importaciones de vistas de búsqueda
import BuscarProfesionales from "@/views/frontend/pages/busqueda/BuscarProfesionales.vue";
import BuscarCharlas from "@/views/frontend/pages/busqueda/BuscarCharlas.vue";
import BuscarRestaurantes from "@/views/frontend/pages/busqueda/BuscarRestaurantes.vue";
import Buscar from "@/views/frontend/pages/busqueda/Buscar.vue";

// Importaciones de vistas principales
import Index from '@/views/frontend/pages/home/index.vue';

// Importaciones de páginas adicionales
import LoginPage from '@/views/frontend/pages/authentication/login.vue';
import ForgotPassword from '@/views/frontend/pages/authentication/forgot-password.vue';

// Importaciones de páginas de pacientes
import Change_Password from '@/views/frontend/pages/authentication/changepassword.vue';
import Register from '@/views/frontend/pages/authentication/register.vue';

import EspecialidadForm from '@/views/frontend/pages/admin/especialidadform.vue';
import EspecialidadesList from '@/views/frontend/pages/admin/especialidadeslist.vue';

import ProfesionalForm from '@/views/frontend/pages/prefesional/profesionalform.vue';
import ProfesionalesList from '@/views/frontend/pages/prefesional/profesionaleslist.vue';

import BlogForm from '@/views/frontend/pages/blogs/BlogForm.vue';
import BlogList from '@/views/frontend/pages/blogs/BlogList.vue';
import BlogDetail from '@/views/frontend/pages/blogs/BlogDetail.vue';


// Definición de rutas
const routes = [
    // Rutas principales
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/change-password',
        name: 'change-password',
        component: Change_Password,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: { guestOnly: true }
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: { guestOnly: true }
    },
    {
        path: '/buscar-profesionales',
        name: 'BuscarProfesionales',
        component: BuscarProfesionales,
    },
    {
        path: '/buscar-charlas',
        name: 'BuscarCharlas',
        component: BuscarCharlas,
    },
    {
        path: '/buscar-restaurantes',
        name: 'BuscarRestaurantes',
        component: BuscarRestaurantes,
    },
    {
        path: '/buscar',
        name: 'Buscar',
        component: Buscar,
    },
    // Ruta de administración
    {
        path: '/admin/especialidades',
        name: 'especialidadform',
        component: EspecialidadForm,
    },
    {
        path: '/admin/especialidadeslist',
        name: 'especialidadeslist',
        component: EspecialidadesList,
    },
    {
        path: '/prefesional/profesionaleslist',
        name: 'profesionaleslist',
        component: ProfesionalesList,
    },
    {
        path: '/prefesional/profesionalform',
        name: 'profesionalform',
        component: ProfesionalForm,
    },
    {
        path: '/blogs/BlogDetail',
        name: 'BlogDetail',
        component: BlogDetail,
    },
    {
        path: '/blogs/BlogList',
        name: 'BlogList',
        component: BlogList,
    },
    {
        path: '/blogs/BlogForm',
        name: 'BlogForm',
        component: BlogForm,
    },
];

// Crear el router
export const router = createRouter({
    history: createWebHistory('vuejs/template/'),
    linkActiveClass: 'active',
    routes,
});
