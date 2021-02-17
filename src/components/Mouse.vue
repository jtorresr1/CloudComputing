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
                        <br>
                        <div >
                            <v-btn @click="click1">Imagen del producto</v-btn>
                            <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*" >                
                        </div>
                        <br>

                        <div v-if="imageData!=null">
                            <img class="preview" width="150px" height="150px" :src="img1">
                            <br>
                            <v-btn @click="onUpload">Upload</v-btn>
                        </div>
                        <br> 
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
        </div>
</template>

<script>

import firebase from '../firebase'
import 'firebase/firestore'
import 'firebase/storage';


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
                Imagen:'',
            },
            caption : '',
            img1: '',
            imageData: null,
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
        this.newMouse.Imagen = '';

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

        click1() {
            this.$refs.input1.click()   
        },

        previewImage(event) {
            this.uploadValue=0;
            this.img1=null;
            this.imageData = event.target.files[0];
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
                    this.newMouse.Imagen = url;
                    console.log(this.img1)
                    });
                }      
                );

        },

       
    }, 
    mounted() {
        this.readMouses();
    },
}


</script>

<style scoped>

</style>