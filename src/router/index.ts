import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import Form from '../views/Projetos/Form.vue';
import Lista from '../views/Projetos/Lista.vue'
const rotas: RouteRecordRaw [] = [
    {
        path:'/',
        name: 'tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path:'',
                name:'projetos',
                component: Lista
            },
            {
                path:'novo',
                name:'Novo projetos',
                component: Form
            },
            {
                path:':id',
                name:'Editar projetos',
                component: Form,
                props: true
            }
        ] 
    }
]

const roteador = createRouter({
      history: createWebHashHistory(),
      routes: rotas
    })

export default roteador;