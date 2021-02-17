<template>
        <div class="row">

            <div class="col-sm-5">          
              <div class="card">

                <div class="card-header">
                  <p class="h3 text-danger text-center"> Teclados </p>
                </div>  

                <div class="card-body">
                
                  <form @submit.prevent="addKeyboard">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="newKeyboard.Marca" placeholder="Marca">
                        <input type="text" class="form-control" v-model="newKeyboard.Modelo" placeholder="Modelo">
                        <input type="text" class="form-control" v-model="newKeyboard.Tipo" placeholder="Tipo">
                        <input type="number" class="form-control" v-model="newKeyboard.Precio" placeholder="Precio">
                        <br>
                        <div >
                            <v-btn @click="click1">Imagen del producto</v-btn>
                            <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*" >                
                        </div>
                        <br>
                        <div v-if="imageData!=null">                     
                            <img class="preview" height="150" width="150" :src="img1">
                        </div>  
                        <br> 
                        <button type="submit" class="btn btn-primary"> Guardar </button>
                    
                    </div>
                  </form>
                </div>
              </div>
            </div>


            <div class="col-sm-1">
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
                        <tr v-for="data in data_teclado" :key="data.id">
                            <td style="display:none;">{{data.id}}</td>
                            <td>{{data.Marca}}</td>
                            <td>{{data.Modelo}}</td>
                            <td>{{data.Tipo}}</td>
                            <td>{{data.Precio}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>            

        </div>
</template>

<script>

import firebase from '../firebase'
import 'firebase/firestore'


let db = firebase.firestore();
const KeyboardCollection = db.collection('teclado');

export default {
    name : "Teclado",
    data() {
        return {
            newKeyboard:
            {
                Marca:'',
                Modelo:'',
                Tipo:'',
                Precio:'',
            },

            data_teclado : [],
            caption : '',
            img1: '',
            imageData: null,
        }
    },
    methods:
    {
        addKeyboard()
        {
        KeyboardCollection.add({
            text:this.newKeyboard}).then(function(dato)
            {
            console.log(dato)
            });
        this.newKeyboard.Marca = '';
        this.newKeyboard.Modelo = '';
        this.newKeyboard.Tipo = '';
        this.newKeyboard.Precio = '';
        this.readTeclados();
        },

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
                });
                console.log(doc.id, " => ", doc.data());
                               
            });
            this.data_teclado = TecladoData;
            })
            .catch((error) => {
            console.log("Error getting documents: ", error);
            })
            
        },
        click1() {
            this.$refs.input1.click()   
        },

        previewImage(event) {
            this.uploadValue=0;
            this.img1=null;
            this.imageData = event.target.files[0];
            this.onUpload()
        },

        onUpload(){
            this.img1=null;
            const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.img1 =url;
                    console.log(this.img1)
                    });
                }      
                );
        },
    },

    mounted() {
        this.readTeclados();
    },
}


</script>

<style scoped>

</style>