import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import { UserDashboard, Portfolio, Orders as OrderHistory, Profile } from '../views/user/index'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AdminOrders from '../views/admin/Orders.vue'
import Portfolios from '../views/admin/Portfolios.vue'
import Users from '../views/admin/Users.vue'
import Packages from '../views/admin/Packages.vue'
import Analytics from '../views/admin/Analytics.vue'
import OrdersNew from '../views/admin/OrdersNew.vue'
import PortfolioDetail from '../views/user/PortfolioDetail.vue'
import Checkout from '../views/user/Checkout.vue'

// Fungsi untuk memeriksa autentikasi
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token')
}

// Fungsi untuk mendapatkan role user dari user_data (bukan dari token)
const getUserRole = (): string | null => {
  const userData = localStorage.getItem('user_data')
  if (!userData) return null
  try {
    const parsed = JSON.parse(userData)
    return parsed.role || null
  } catch (error) {
    console.error('Error parsing user_data:', error)
    return null
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/user/dashboard',
      name: 'UserDashboard',
      component: UserDashboard,
      meta: { requiresAuth: true, role: 'user' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
    // Admin routes
    {
      path: '/admin',
      redirect: '/admin/login',
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: LoginView,
      meta: { requiresGuest: true, admin: true },
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrders,
    },
    {
      path: '/admin/portfolios',
      name: 'admin-portfolios',
      component: Portfolios,
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: Users,
    },
    {
      path: '/admin/packages',
      name: 'admin-packages',
      component: Packages,
    },
    {
      path: '/admin/analytics',
      name: 'admin-analytics',
      component: Analytics,
    },
    {
      path: '/admin/orders/new',
      name: 'admin-orders-new',
      component: OrdersNew,
    },
    // User routes
    {
      path: '/user',
      name: 'user',
      component: UserDashboard,
      meta: { requiresAuth: true, role: 'user' },
      children: [
        {
          path: 'dashboard',
          name: 'UserDashboard',
          component: UserDashboard,
        },
        {
          path: 'portfolios',
          name: 'UserPortfolio',
          component: Portfolio,
        },
        {
          path: 'portfolio/:id',
          name: 'UserPortfolioDetail',
          component: PortfolioDetail,
        },
        {
          path: 'orders',
          name: 'UserOrders',
          component: OrderHistory,
        },
        {
          path: 'profile',
          name: 'UserProfile',
          component: Profile,
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: Checkout,
        },
      ],
    },
    {
      path: '/user/checkout/:packageId',
      name: 'UserCheckout',
      component: Checkout,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
    // Redirect /user/dashboard ke /
    {
      path: '/user/dashboard',
      redirect: '/',
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated()
  const userRole = isAuth ? getUserRole() : null

  // USER: Jika sudah login dan akses /login, redirect ke dashboard user
  if (to.path === '/login' && isAuth && userRole === 'user') {
    return next({ path: '/user/dashboard' })
  }
  // USER: Jika butuh auth dan belum login, redirect ke /login
  if (
    to.matched.some((record) => record.meta.requiresAuth && record.meta.role === 'user') &&
    (!isAuth || userRole !== 'user')
  ) {
    return next({ path: '/login' })
  }

  // ADMIN: Jika sudah login dan akses /admin/login, redirect ke dashboard admin
  if (to.path === '/admin/login' && isAuth && userRole === 'admin') {
    return next({ path: '/admin/dashboard' })
  }
  // ADMIN: Jika butuh auth dan belum login, redirect ke /admin/login
  if (
    to.matched.some((record) => record.meta.requiresAuth && record.meta.role === 'admin') &&
    (!isAuth || userRole !== 'admin')
  ) {
    return next({ path: '/admin/login' })
  }

  next()
})

export default router
