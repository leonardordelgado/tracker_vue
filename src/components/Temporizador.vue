<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <cronometro :tempoEmSegundos="tempoEmSegundos" />
                    <button class="button" @click="inicio" :disabled="cronometroIniciado">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button" @click="finalizar" :disabled="!cronometroIniciado" >
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue'
export default defineComponent({
    name:"temporizador-header",
    emits:[
        'aoteporizadorFinalizado'
    ],
    components:{
        Cronometro
    },
    data(){
        return {
            tempoEmSegundos: 0,
            cronometro : 0,
            cronometroIniciado: false
        }
    },
    methods:{
        inicio(){
         this.cronometroIniciado = true
         this.cronometro =  setInterval(()=>{
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar(){
            this.cronometroIniciado = false
            clearInterval(this.cronometro)
            this.$emit('aoteporizadorFinalizado',this.tempoEmSegundos)
           this.tempoEmSegundos = 0
        }
    }
    
})
</script>