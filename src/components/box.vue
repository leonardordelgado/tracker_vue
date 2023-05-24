<template>
    <div class="box has-text-wweight-bold">
        <slot>
            
        </slot>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'box-padrao'
    })
</script>

<style scoped>
    .box{
        background: #FAF0CA;
    }
</style>