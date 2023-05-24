<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left ">
        <input class="input" type="texto" placeholder="Digite para filtrar" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <Modal :mostrar=" tarefaSelecionada != null ">
      <template v-slot:cabecalio>
          <p class="modal-card-title">Edição de tarefa</p>
          <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
          </div>
      </template>
      <template v-slot:rodape>
          <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </Modal>
    <box v-if="listaVazia">
      Não possui tarefas realizadas hoje :(
    </box>
    
  </div>
</template>
   
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Modal from '../components/Modal.vue'
import box from '../components/box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from '@/store/acoes';
import { computed } from '@vue/reactivity';
import ITarefa from '@/interfaces/ITarefa';
import { OBTER_PROJETOS } from '@/store/acoes';



export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    box,
    Modal
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length == 0
    }
  },
  setup() {

    
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    const filtro = ref('')
    const tarefas=computed(() => store.state.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))
    watchEffect(()=>{
      store.dispatch(OBTER_TAREFAS ,filtro.value);
      
    })
    return {
      tarefas: computed(()=> store.state.tarefas),
      store,
      filtro,
     
    }

  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }

  }
});
</script>
  
   