<template>
        <div class="row">
            <div class="col-sm-4">          
              <div class="card"> 
                <div class="card-header">
                  <p class="h3 text-danger text-center"> Mouse </p>
                </div>           
                <div class="card-body">
                
                  <form @submit.prevent="addMouse">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="newMouse.Marca" placeholder="Marca">
                        <input type="text" class="form-control" v-model="newMouse.Modelo" placeholder="Modelo">
                        <input type="number" class="form-control" v-model="newMouse.Sensibilidad" placeholder="Sensibilidad">
                        <input type="number" class="form-control" v-model="newMouse.Precio" placeholder="Precio">
                        <button type="submit" class="btn btn-primary"> Guardar </button>
                    
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
            </div>
            <div class="col-sm-6">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Sensibilidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in data_mouse" :key="data.id">
                            <td style="display:none;">{{data.id}}</td>
                            <td>{{data.Marca}}</td>
                            <td>{{data.Modelo}}</td>
                            <td>{{data.Sensibilidad}}</td>
                            <td>{{data.Precio}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>         
            <button v-on:click="check">check</button>
        </div>
</template>

<script>

import firebase from '../firebase'
import 'firebase/firestore'


let db = firebase.firestore();
const MouseCollection = db.collection('mouse');

export default {
    name : "Mouse",
    data() {
        return {
            newMouse:
            {
                Marca:'',
                Modelo:'',
                Sensibilidad:'',
                Precio:'',
            },

            data_mouse : [],
        }
    },
    methods:
    {
        addMouse()
        {
        MouseCollection.add({
            text:this.newMouse}).then(function(dato)
            {
            console.log(dato)
            });
        this.newMouse.Marca = '';
        this.newMouse.Modelo = '';
        this.newMouse.Sensibilidad = '';
        this.newMouse.Precio = '';

        this.readMouses();
        },

        readMouses() {
            let mousesData = [];
            MouseCollection.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    mousesData.push({
                    id: doc.id,
                    Marca: doc.data().text.Marca,
                    Modelo: doc.data().text.Modelo,
                    Precio: doc.data().text.Precio,
                    Sensibilidad: doc.data().text.Sensibilidad,
                });
                console.log(doc.id, " => ", doc.data());
                               
            });
            this.data_mouse = mousesData;
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            })
            
        },

        check(){
            console.log(this.data_mouse);
        }

       
    }, 
    mounted() {
        this.readMouses();
    },
}


</script>

<style scoped>

</style>