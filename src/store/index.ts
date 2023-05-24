
import { createStore, Store ,useStore as useVueStore} from "vuex";
import { InjectionKey } from "vue";
import {  ADICIONAR_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA,  DEFINIR_TAREFAS,  NOTIFICAR } from "./mutacoes";
import { INotificacao } from "@/interfaces/INotificaco";
import {   ALTERAR_TAREFA,  CADASTRAR_TAREFA,  OBTER_TAREFAS, } from "./acoes";
import http from '@/http'
import ITarefa from "@/interfaces/ITarefa";
import { EstadoDoProjeto, projeto } from "./modulo/projetos";

export interface Estado {
    notificacaes: INotificacao[],
    tarefas: ITarefa[],
    projeto: EstadoDoProjeto
}
export const key: InjectionKey<Store<Estado>> = Symbol()


export const store = createStore<Estado>({
    state: {
        notificacaes:[],
        tarefas:[],
        projeto: {
            projetos:[]
        } 
    },
    mutations:{
        [DEFINIR_TAREFAS](state , tarefas: ITarefa[]){
            state.tarefas = tarefas
        },
        [NOTIFICAR] (state, novaNotificacao : INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacaes.push(novaNotificacao)
            setTimeout(()=>{
                state.notificacaes = state.notificacaes.filter(Notificacao =>
                    Notificacao.id != novaNotificacao.id)
            }, 3000)
        },
        [ADICIONAR_TAREFA](state,tarefa: ITarefa){
            
            state.tarefas.push(tarefa)
        },
        [ALTERA_PROJETO](state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        
    },
    actions: {
        
        [OBTER_TAREFAS]({commit}, filtro: string){
            let URL = 'tarefas'

            if(filtro){
                URL += '?descricao='+ filtro
            }

            http.get(URL)
                .then( resposta => commit(DEFINIR_TAREFAS ,resposta.data))     
                .catch()
        },
        async [CADASTRAR_TAREFA]({commit}, tarefa : ITarefa){
            return await http.post('/tarefas', tarefa)
            .then(resposta=> commit(ADICIONAR_TAREFA, resposta.data))
            
          },
          [ALTERAR_TAREFA]({commit}, tarefa: ITarefa){
            return  http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(()=> commit(ALTERA_TAREFA, tarefa))
        },
    },
    modules:{
        projeto
    }
})
export function useStore(): Store<Estado>{
    return useVueStore(key)
}