import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router'
import { useMainStore } from '@/store'

const routes = [
  {
    path: '/',
    component: () => import('@/views/LayoutComponent.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Home' },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/Products.vue'),
        meta: { title: 'Products' },
      },
      {
        path: '/details/:id',
        name: 'ProductDetails',
        component: () => import('@/views/Details/[id].vue'),
        props: true,
        meta: { title: 'Product PDP' },
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          const productId = parseInt(to.params.id as string, 10)

          if (isNaN(productId) || productId < 0) {
            // Redirect to 404 if the ID is not a valid number or out of range
            next({ name: 'NotFound' })
          } else {
            next() // Continue to the product details page
          }
        },
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/Contact.vue'),
        meta: { title: 'Contact Us' },
      },
      {
        path: '/thank-you',
        name: 'ThankYou',
        component: () => import('@/views/ThankYou.vue'),
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          const store = useMainStore()

          // Safely retrieve purchasedItems from the store or localStorage
          const purchasedItems = store.purchasedItems || []
          const localStorageItems = JSON.parse(
            localStorage.getItem('purchasedItems') || '[]'
          )

          // Check if purchasedItems exist in either the store or localStorage
          if (purchasedItems.length === 0 && localStorageItems.length === 0) {
            // Redirect to the home page or cart if there are no purchased items
            next({ name: 'Home' })
          } else {
            // Proceed to Thank You page if purchasedItems exist
            next()
          }
        },
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/components/404.vue'),
    meta: { title: '404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
