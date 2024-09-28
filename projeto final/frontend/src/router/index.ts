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
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '@/stores/userStore'
import AccountDetail from '@/views/AccountDetail.vue'
import { useAuthStore } from '@/stores/authStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  
  routes: [
    {path: '/', name: 'Repositório', component: HomeView},
    {path: '/login', component: LoginView},
    {path: '/cadastro', component: RegisterView},
    {path: '/usuarios', component: UsersView },
    {path: '/usuarios/novo', component: UserDetail, props: { showAdmin: false } },
    {path: '/usuarios/:id', component: UserDetail },
    {path: '/administradores', component: UsersView, props: { showAdmin:true } },
    {path: '/administradores/novo', component: AdminDetail },
    {path: '/administradores/:id', component: AdminDetail },
    {path: '/fichamentos', component: AnnotationsView },
    {path: '/fichamentos/novo', component: AnnotationDetail },
    {path: '/fichamentos/:id/citacoes', component: AnnotationView },
    {path: '/fichamentos/:id/editar', component: AnnotationDetail },
    {path: '/citacoes', component: QuotesView },
    {path: '/fichamentos/:id/citacoes/:quoteId', component: QuoteDetail },
    {path: '/fichamentos/:id/citacoes/nova', component: QuoteDetail },
    {path: '/conta/:id', component: AccountDetail },
    {path: '/notfound', component: NotFound},
    {path: '/:pathMatch(.*)*', component: NotFound}
  ]
})

router.beforeEach(async(to, from) => {
  const publicPages = [ '/', '/login', '/cadastro']
  const authRequired = !publicPages.includes(to.path)
  const auth = useUserStore()

  if (authRequired && !auth.user) {
    return '/login'
  }
})

export default router
