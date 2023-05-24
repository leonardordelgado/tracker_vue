<template>
    <section >
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>
                Novo Projeto
            </span>
        </RouterLink>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <RouterLink :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/acoes';
import { computed, defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from '@/interfaces/INotificaco';
    export default defineComponent({
        name: 'listas-projetos',
        
        methods: {
            excluir (id: string) {
                this.store.dispatch(REMOVER_PROJETO, id)
                this.notificar(TipoNotificacao.SUCESSO, 'Tudo certo', 'Seu projeto foi eliminido ;0 Espero que tenha concluido ')
            }
        
        },
        setup() {
            const store = useStore()
            store.dispatch(OBTER_PROJETOS)
            const {notificar} = useNotificador()
            return{
                projetos: computed(()=> store.state.projeto.projetos),
                store, 
                notificar
            }
        }
    })
</script>
