<template>
    <section>
        <strong class="display">
            {{ tempoCorrido }}
        </strong>
    </section>
</template>


<script lang="ts">
import {defineComponent} from 'vue'


export default defineComponent({
    name: 'Cronometro-header',
    props:{
        tempoEmSegundos:{
            type: Number,
            default: 0
        }
    },
    computed:{
    tempoCorrido(): string{
        return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
    }
},
})
</script>
<style scoped>
    .display{
        color: var(--texto-inicio);
    }
</style>