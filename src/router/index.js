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
        name: 'EspecialidadesAdmin',
        component: () => import('@/components/admin/EspecialidadesAdmin.vue'),
        meta: { 
            requiresAuth: true, 
            requiresAdmin: true 
        }
    }
];

// Crear el router
export const router = createRouter({
    history: createWebHistory('vuejs/template/'),
    linkActiveClass: 'active',
    routes,
});

router.beforeEach(async (to, from, next) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Obtener token y datos de usuario
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    // Verificación de autenticación
    if (to.meta.requiresAuth && !token) {
        return next('/login');
    }
    
    // Verificación para rutas de invitados
    if (to.meta.guestOnly && token) {
        return next('/');
    }
    
    // Verificación de rol admin
    if (to.meta.requiresAdmin && userRole !== 'admin') {
        return next('/');
    }
    
    next();
});