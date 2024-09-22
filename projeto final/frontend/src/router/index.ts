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
import axios from 'axios'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  
  routes: [
    {path: '/', component: AnnotationsView},
    {path: '/repositorio', component: AnnotationsView, meta: {title: 'Repositório', personal: false}},
    {path: '/login', component: LoginView, meta: {title: 'Cita - Login'}},
    {path: '/cadastro', component: RegisterView, meta: {title: 'Cadastro'}},
    {path: '/usuarios', component: UsersView, meta: {title: 'Usuários'}},
    {path: '/usuarios/novo', component: UserDetail},
    {path: '/usuarios/:id', component: UserDetail},
    {path: '/administradores', component: UsersView, meta: {title: 'Administradores'}},
    {path: '/administradores/novo', component: UserDetail},
    {path: '/administradores/:od', component: UserDetail},
    {path: '/fichamentos', component: AnnotationsView, meta: {title: 'Meus fichamentos', personal: true}},
    {path: '/fichamentos/novo', component: AnnotationDetail},
    {path: '/fichamentos/:id', component: AnnotationView},
    {path: '/citacoes', component: QuotesView, meta: {title: 'Citações'}},
    {path: '/citacoes/nova', component: QuoteDetail},
    {path: '/citacoes/:id', component: QuoteDetail},
    {path: '/:pathMatch(.*)*', component: NotFound, meta: {title: 'Não encontrado'}}
  ]
})
// router.beforeEach(async(to, from, next) => {
//   document.title = `${to.meta.title}`;
//   next(); 
// })

export default router
