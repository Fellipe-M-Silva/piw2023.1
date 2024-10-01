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
    {path: '/', alias: '/repositorio', component: AnnotationsView, props: { showOptions: false, name: "Repositório", link: 'repositorio', showCardOptions: false, home: true }},
    {path: '/repositorio/:id/citacoes', component: AnnotationView},
    {path: '/login', component: LoginView},
    {path: '/cadastro', component: RegisterView},

    {path: '/fichamentos', component: AnnotationsView, props: { showOptions: true, name: "Fichamentos", link: 'fichamentos', showCardOptions: true, home: false}, meta: { requiresAuth: true }},
    {path: '/fichamentos/novo', component: AnnotationDetail, meta: { requiresAuth: true }},
    {path: '/fichamentos/:id/citacoes', component: AnnotationView, meta: { requiresAuth: true }},
    {path: '/fichamentos/:id/editar', component: AnnotationDetail, meta: { requiresAuth: true }},
    
    {path: '/citacoes', component: QuotesView, meta: { requiresAuth: true }},
    {path: '/fichamentos/:id/citacoes/:quoteId', component: QuoteDetail, meta: { requiresAuth: true }},
    {path: '/fichamentos/:id/citacoes/nova', component: QuoteDetail, meta: { requiresAuth: true }},

    {path: '/usuarios', component: UsersView, props: { name: 'Usuários', admin: false, buttonLabel: 'Novo usuário', buttonLink: 'usuarios' }, meta: { requiresAuth: true }},
    {path: '/usuarios/novo', component: UserDetail, props: { name: 'Usuário', showAdmin: false, hideEditSelf: false, link: 'usuarios'}, meta: { requiresAuth: true }},
    {path: '/usuarios/:id', component: UserDetail, props:{ name: 'Usuário', hideEditSelf : false }, meta: { requiresAuth: true }},

    {path: '/administradores', component: UsersView, props: { name: 'Administradores', admin :true, buttonLabel: 'Novo administrador', buttonLink: 'administradores' }, meta: { requiresAuth: true }},
    {path: '/administradores/novo', component: UserDetail, props: { name: 'Administrador', link: 'administradores' }, meta: { requiresAuth: true }},
    {path: '/administradores/:id', component: UserDetail, props: { name: 'Administrador' }, meta: { requiresAuth: true }},

    {path: '/conta/:id', component: UserDetail, props:{name: 'Conta', hideEditSelf: true}, meta: { requiresAuth: true }},

    {path: '/notfound', component: NotFound},
    {path: '/:pathMatch(.*)*', component: NotFound}
  ]
})

router.beforeEach(async(to, from) => {
  const adminPages = [ '/usuarios' ]
  const superAdminPages = [ '/administradores' ]
  const adminRequired = adminPages.includes(to.path)
  const superAdminRequired = superAdminPages.includes(to.path)

  const auth = useUserStore()

  if (to.meta.requiresAuth && !auth.user?.id) {
    alert('Não autenticado. faça login para continuar.')
    return '/login'
  }
  else if (adminRequired && !auth.user?.isAdmin) {
    alert('Acesso negado. Área de administradores.')
    return '/'
  }
  else if (superAdminRequired && !auth.user?.isSuperAdmin) {
    alert('Acesso negado. Área de super administradores.')
    return '/'
  }

})

export default router
