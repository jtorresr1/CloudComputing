<template>
    <div>
        <div class="btn-group btn-group-lg" role="group" aria-label="Catalogo_usuario">
            <button class="btn btn-dark" @click="MouseComponente">Mouse</button>
            <button class="btn btn-dark" @click="TecladoComponente">Teclado</button>
        </div>

        <component v-bind:is="component" />
    </div>
    
    
</template>

<script>

import MouseCatalog from './MouseCatalog';
import KeyboardCatalog from './KeyboardCatalog';


export default {
    name : "Catalogo",
    data() {
        return {
            component:"MouseCatalog",
        }
    },
    components: {
        MouseCatalog,
        KeyboardCatalog
    },

    methods:{
        MouseComponente()
        {            
            const usuario = document.getElementById('id_usuario_actual').textContent;
            const fecha = Date.now();
            const action = "Ver Mouses";
            const data_save = usuario+ ";" + action + ";" + " " +";"+ fecha + "\n";
            this.$data_interacciones.push(data_save);
            this.component = "MouseCatalog";
        },
        TecladoComponente()
        {
            this.component = "MouseCatalog";
            const usuario = document.getElementById('id_usuario_actual').textContent;
            const fecha = Date.now();
            const action = "Ver Teclados";
            const data_save = usuario+ ";" + action + ";" + " " +";"+ fecha + "\n";
            this.$data_interacciones.push(data_save);
            this.component = "KeyboardCatalog";
        }
    }
}
</script>


<style>


</style>