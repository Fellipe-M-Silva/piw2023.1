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
    {path: '/repositorio', component: AnnotationsView},
    {path: '/login', component: LoginView},
    {path: '/cadastro', component: RegisterView},
    {path: '/usuarios', component: UsersView},
    {path: '/usuarios/novo', component: UserDetail},
    {path: '/usuarios/:id', component: UserDetail},
    {path: '/administradores', component: UsersView},
    {path: '/administradores/novo', component: UserDetail},
    {path: '/administradores/:id', component: UserDetail},
    {path: '/fichamentos', component: AnnotationsView},
    {path: '/fichamentos/novo', component: AnnotationDetail},
    {path: '/fichamentos/:id', component: AnnotationView},
    {path: '/citacoes', component: QuotesView},
    {path: '/citacoes/nova', component: QuoteDetail},
    {path: '/citacoes/:id', component: QuoteDetail},
    {path: '/:pathMatch(.*)*', component: NotFound}
  ]
})
// router.beforeEach(async(to, from, next) => {
//   document.title = `${to.meta.title}`;
//   next(); 
// })

export default router
