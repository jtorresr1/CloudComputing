<template>
    <div>
        <br>
        <div class="row" v-for="rowIdx in Math.ceil(data_teclado.length / 3)" :key="rowIdx">
            <div class="col-sm-4" v-for="item in data_teclado.slice(3 * (rowIdx - 1), 3 * rowIdx)" :key="item.id">
                <div class="card"> 
                    <div class="card-header">
                        <img :src=item.Imagen width="150px" height="100px">
                    
                    </div>           
                    <div class="card-body">
                        <span style = "display:None;" id="info_producto" class="h4 text-center"> {{item.id}}</span>

                        <span class="h4 text-center"> {{item.Marca}} {{item.Modelo}} </span>
                        <v-btn @click="SaveDataArrayInfo(item.id)"> Mas Información</v-btn>
                        <v-btn @click="SaveDataArrayCarrito(item.id)"> Agregar al carrito</v-btn>
                    </div>
                </div>

            </div>
        </div>
    </div>
    
</template>

<script>

import firebase from '../firebase';
import 'firebase/firestore';

let db = firebase.firestore();
const KeyboardCollection = db.collection('teclado');


export default {
    name: "KeyboardCatalog",
    data() {
        return {            
            data_teclado : [],
        }
    },
    methods:{
        readTeclados() {
            let TecladoData = [];
            KeyboardCollection.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    TecladoData.push({
                    id: doc.id,
                    Marca: doc.data().text.Marca,
                    Modelo: doc.data().text.Modelo,
                    Precio: doc.data().text.Precio,
                    Tipo: doc.data().text.Tipo,
                    Imagen: doc.data().text.Imagen,
                });
                console.log(doc.id, " => ", doc.data());
                               
            });
            this.data_teclado = TecladoData;
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            })
            
        },
        SaveDataArrayInfo(event)
        {   
            const usuario = document.getElementById('id_usuario_actual').textContent;
            const fecha = Date.now();
            const action = "Obtener informacion";
            const data_save = usuario+ ";" + action + ";" + event+";"+ fecha+"\n";
            this.$data_interacciones.push(data_save);
            console.log(this.$data_interacciones);
        },

        SaveDataArrayCarrito(event)
        {
            const usuario = document.getElementById('id_usuario_actual').textContent;
            const fecha = Date.now();
            const action = "Producto al carrito";
            const data_save = usuario+ ";" + action + ";" + event+";"+ fecha+"\n";
            this.$data_interacciones.push(data_save);
            console.log(this.$data_interacciones);
        },

    },

    mounted() {
        this.readTeclados();
    },
}
</script>

<style>


</style>