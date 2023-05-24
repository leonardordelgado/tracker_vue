<template>
    <section >
        
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeProjeto" class="label">Nome do projeto</label>
                <input 
                    type="text" 
                    class="input" 
                    v-model="nomeProjeto" 
                    id="nomeProjeto" 
                />
            </div>
            <div class="field">
                <button class="buttton" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificaco';
import { notificacaoMixin } from '@/minixs/notificar';
import { useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/acoes';
import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'Form-projetos',
        props:{
            id:{
                type: String
            }
        },
        mixins: [notificacaoMixin],
        setup(props) {

            const router = useRouter()
            const store = useStore()
            const {notificar} = useNotificador()
            const nomeProjeto = ref("")

            if(props.id){
                const projeto = store.state.projeto.projetos.find(
                    (proj)=> proj.id == props.id
                )
                nomeProjeto.value = projeto?.nome ||""
            }

            const sucesso = (TipoNotificacao: TipoNotificacao , titulo: string, texto: string)=>{
                nomeProjeto.value= ''
                notificar(TipoNotificacao, titulo, texto )
                router.push('/projetos')
            }

            const salvar = ()=>{
                if(props.id){
                    store.dispatch(ALTERAR_PROJETO,{
                        id: props.id,
                        nome: nomeProjeto.value
                    }).then(()=>sucesso(TipoNotificacao.SUCESSO, 'Alteração concluida', `Legal ;) Alteração feita com sucesso`))
                }else{
                    store.dispatch(CADASTRAR_PROJETO, nomeProjeto.value)
                    .then(()=> sucesso(TipoNotificacao.SUCESSO, 'Adicionado com sucesso', `Legal ;) Agora você tem um novo projeto`))
                    .catch(()=>{
                        sucesso(TipoNotificacao.FALHA, 'Algo de errado', 'Ops acredito que tenha um erro :(' )
                    })
                }
            }
               
            return{
                nomeProjeto,
                salvar
            }
        },
    })
</script>
