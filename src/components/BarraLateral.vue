<template>
    <header>
        <div class="title">
            <h1>
                Tracker
            </h1>
        </div>
        
        <button class="button" @click="modoDark">
             {{ textoModDark }}
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
    export default defineComponent({
    name: "BarraLateral",
    emits: ["aoModeDark"],
    data() {
        return {
            modeDarkAtivo: false
        };
    },
    computed: {
        textoModDark() {
            if (this.modeDarkAtivo) {
                return "Mod White";
            }
            return "Mod Dark";
        }
    },
    methods: {
        modoDark() {
            this.modeDarkAtivo = !this.modeDarkAtivo;
            this.$emit("aoModeDark", this.modeDarkAtivo);
        }
    },
    components: { RouterLink }
})
</script>

<style scoped>
header{
    padding: 0.8rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.panel li{
    margin: 8px 0;
}
.link{
    color: #fff;
}
.link:hover{
    color: #FAF0CA;
}
.link.RouterLink-active{
    color: #FAF0CA;
}
.title{
    width:100%;
}
h1{
    font-size: 2.8rem;
}
@media only screen and (max-width: 768px){
    header{
        padding: 2.5rem;
        height: auto;
    }
   
}
</style>