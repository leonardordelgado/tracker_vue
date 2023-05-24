<template>
    <box>
        <di class="columns">
            <div class="column is-4">
                {{tarefa.descricao || 'Tarefa não descrita'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column" >
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
            <div class="column">
                <button class="button" @click="tarefaClicada">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                </button>
            </div>
        </di>
    </box>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import box from './box.vue';

export default defineComponent({
    name: 'Tarefa-conometro',
    components:{
        Cronometro,
        box,
    },
    emits:['aoTarefaClicada'],
    props:{
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods:{
        tarefaClicada():void{
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
})
</script>

