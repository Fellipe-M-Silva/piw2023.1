import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import AnnotationsView from '../views/AnnotationsView.vue'
import QuotesView from '../views/QuotesView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AnnotationView from '../views/AnnotationView.vue'
import AnnotationDetail from '../views/AnnotationDetail.vue'
import QuoteDetail from '../views/QuoteDetail.vue'
import UsersView from '../views/UsersView.vue'
import UserDetail from '../views/UserDetail.vue'
import AdminsView from '@/views/AdminsView.vue'
import AdminDetail from '@/views/AdminDetail.vue'
import NotFound from '@/views/NotFound.vue'
import axios from 'axios'
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '@/stores/userStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  
  routes: [
    {path: '/repositorio', component: HomeView},
    {path: '/repositorio', component: HomeView},
    {path: '/login', component: LoginView},
    {path: '/cadastro', component: RegisterView},
    {path: '/usuarios', component: UsersView, meta: { requitesAuth: true}},
    {path: '/usuarios/novo', component: UserDetail, meta: { requitesAuth: true}},
    {path: '/usuarios/:id', component: UserDetail, meta: { requitesAuth: true}},
    {path: '/administradores', component: AdminsView, meta: { requitesAuth: true}},
    {path: '/administradores/novo', component: AdminDetail, meta: { requitesAuth: true}},
    {path: '/administradores/:id', component: AdminDetail, meta: { requitesAuth: true}},
    {path: '/fichamentos', component: AnnotationsView, meta: { requitesAuth: true}},
    {path: '/fichamentos/novo', component: AnnotationDetail, meta: { requitesAuth: true}},
    {path: '/fichamentos/:id/citacoes', component: AnnotationView, meta: { requitesAuth: true}},
    {path: '/fichamentos/:id/editar', component: AnnotationDetail, meta: { requitesAuth: true}},
    {path: '/citacoes', component: QuotesView, meta: { requitesAuth: true}},
    {path: '/fichamentos/:id/citacoes/:quoteId', component: QuoteDetail, meta: { requitesAuth: true}},
    {path: '/fichamentos/:id/citacoes/nova', component: QuoteDetail, meta: { requitesAuth: true}},
    {path: '/:pathMatch(.*)*', component: NotFound}
  ]
})

router.beforeEach(async(to, from) => {
  const userStore = useUserStore()
  if(to.meta.requitesAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})

export default router
