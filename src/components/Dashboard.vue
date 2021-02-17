<template>
    
    <div class="row">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-header">
                    <p class="h4 text-danger text-center"> Funciones admin</p>
                </div>
                <div class="card-body">
                    <ul>
                        <li> <router-link :to="{name:'mouse'}"> Agregar mouses </router-link> </li>
                        <li> <router-link :to="{name:'teclado'}"> Agregar Teclados </router-link> </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="card">
                <div class="card-header">
                    <p class="h4 text-danger text-center"> Funciones Usuario General</p>
                </div>
                <div class="card-body">
                    <ul>
                        <li> Visualizar Catalogo</li>
                    </ul>
                </div>
            </div>
        </div>

    </div>    
</template>


<script>


export default {
    name: "Dashboard",
    
}

</script>

<style>


</style>