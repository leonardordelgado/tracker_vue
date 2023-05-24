<template>
 <main class="columns is-gapless is-multiline " :class="{'modo-dark' : modeDarkAtivo}">
  <div class="column is-2">
      <BarraLateral @aoModeDark="trocarTema"/>
  </div>
  <div class="column is-10 conteudo">
    <Notificacoes />
    <RouterView>
      
    </RouterView>
  </div>
 </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';


export default defineComponent({
    name: "App",
    components: {
    BarraLateral,
    Notificacoes
},
    data(){
      return{
        modeDarkAtivo: false
      }
    },
    methods:{
      trocarTema( modeDarkAtivo:boolean){
        this.modeDarkAtivo = modeDarkAtivo
      }
    }
});
</script>

<style>
.lista{
  padding: 1.25rem;
}
main{
  --bg-inicio: #fff;
  --texto-inicio: #000;
}
main.modo-dark {
  --bg-inicio: #2b2d42;
  --texto-inicio: #ddd;
}
.conteudo {
  background-color: var(--bg-inicio);
}
</style>
