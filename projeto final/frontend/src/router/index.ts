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
import NotFound from '@/views/NotFound.vue'
import { useUserStore } from '@/stores/userStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  
  routes: [
    {path: '/', name: 'Repositório', component: AnnotationsView, props: {showOptions: false, name: "Repositório", showCardOptions: false, isPublic: true},},
    {path: '/login', component: LoginView},
    {path: '/cadastro', component: RegisterView},

    {path: '/usuarios', component: UsersView},
    {path: '/usuarios/novo', component: UserDetail, props: { showAdmin: false, hideEditSelf: false }},
    {path: '/usuarios/:id', component: UserDetail, props:{ hideEditSelf: false} },

    {path: '/administradores', component: UsersView, props: { showAdmin:true } },
    {path: '/administradores/novo', component: UsersView },
    {path: '/administradores/:id', component: UsersView },
    
    {path: '/fichamentos', component: AnnotationsView, props: {showOptions: true, name: "Fichamentos", showCardOptions: true, isPublic: false} },
    {path: '/fichamentos/novo', component: AnnotationDetail },
    {path: '/fichamentos/:id/citacoes', component: AnnotationView},
    {path: '/fichamentos/:id/editar', component: AnnotationDetail },
    
    {path: '/citacoes', component: QuotesView },
    {path: '/fichamentos/:id/citacoes/:quoteId', component: QuoteDetail },
    {path: '/fichamentos/:id/citacoes/nova', component: QuoteDetail },

    {path: '/conta/:id', component: UserDetail, props:{hideEditSelf: true}},

    {path: '/notfound', component: NotFound},
    {path: '/:pathMatch(.*)*', component: NotFound}
  ]
})

router.beforeEach(async(to, from) => {
  const publicPages = [ '/', '/login', '/cadastro']
  const authRequired = !publicPages.includes(to.path)
  const auth = useUserStore()

  if (authRequired && !auth.user?.id) {
    return '/login'
  }
})

export default router
