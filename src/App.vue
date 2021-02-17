<template>
    <div id="app">
      <nav class="navbar navbar-dark bg-primary justify-content-between">
        <router-link :to="{name: 'home'}" class="navbar-brand"> Cloud_sistema </router-link>
     
            <ul class="navbar-nav">
              <li class="nav-item">
                <facebook-login class="btn navbar-nav mr-aut"
                  appId="1945277575615018"
                  @login="onLogin"
                  @logout="onLogout"
                  @get-initial-status="getUserData"
                  @sdk-loaded="sdkLoaded">
                </facebook-login>
              </li>
            </ul>
        
      </nav>
      
      <div class="container">
        
        <div v-if="isConnected" class="information">
          <br>
          <div class="row">
            <div class="col-sm-4">
                <h3>Información de la cuenta:</h3>
                <div class="well">
                  <div class="list-item">
                    <img :src="picture" width="100px" height="100px">
                  </div>
                  <div class="list-item">
                    <i>{{name}}</i>
                  </div>
                  <div class="list-item">
                    <i>{{email}}</i>
                  </div>
                  <div class="list-item">
                    <i id="id_usuario_actual">{{personalID}}</i>
                  </div>
                </div>
                <br><br>
                <ul>
                  <li> <v-btn v-on:click="view_home" class="bg-warning"> Inicio </v-btn> </li>
                  <li> <v-btn v-on:click="view_mouse"> Mouse </v-btn> </li>
                  <li> <v-btn v-on:click="view_teclado"> Teclados </v-btn> </li>
                  <li> <v-btn v-on:click="view_catalogo"> Catalogo </v-btn> </li>
                </ul>
            </div>

            <div class="col-sm-8">
                
                <h3>Bienvenido {{name}}, esta pagina esta en creación.</h3>
                <br>
                <component v-bind:is="component" />
                <br><br><br>
                

              </div>
            </div>
          </div>   

        <div v-else>
          <br>
          <div class="row justify-content-center h-100">
            <div class="card shadow" style="width: 20rem;">
              <h1>Bienvenido al sistema de login del aplicativo</h1>
            </div>
          </div>
        </div>

      </div>
    </div>

</template>

<script>
import facebookLogin from 'facebook-login-vuejs'
import Dashboard from "./components/Dashboard.vue";
import Mouse from './components/Mouse';
import Teclado from './components/Teclado';
import Catalogo from './components/Catalogo';
import FileSaver from 'file-saver';
import 'firebase/storage';
import firebase from './firebase';
import 'firebase/firestore';


export default {
  name: 'App', 
  data() {
    return {
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      picture: '',
      FB: undefined,
      component:"Dashboard",
    }
  },

  components: {
    facebookLogin,
    Dashboard,
    Mouse,
    Teclado,
    Catalogo
  },

  methods: {
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
        user => {
          this.personalID = user.id;
          this.email = user.email;
          this.name = user.name;
          this.picture = user.picture.data.url;
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.$data_interacciones = [];
      this.getUserData()
    },
    onLogout() {
      
      this.datos_send();
      this.isConnected = false;
      
      
    },

    datos_send()
    {
      let extra = this.$data_interacciones;
      const archivo = document.getElementById('id_usuario_actual').textContent + "_"+Date.now()+ ".txt";
      console.log(extra);
      var blob = new Blob([extra], {type: "text/plain;charset=utf-8"});
      firebase.storage().ref(archivo).put(blob).then(function(snapshot) {
        console.log(snapshot);
      });
      FileSaver.saveAs(blob, archivo);
    },

    view_mouse()
    {
      this.component = "Mouse"
    },

    view_teclado()
    {
      this.component = "Teclado"
    },

    view_home()
    {
      this.component = "Dashboard"
    },

    view_catalogo()
    {
      const usuario = document.getElementById('id_usuario_actual').textContent;
      const fecha = Date.now();
      const action = "Ver Mouses";
      const data_save = usuario+ ";" + action + ";" + " " +";"+ fecha+"\n";
      
      this.component = "Catalogo"
      this.$data_interacciones.push(data_save);
    },


  }

}
</script>

<style>


</style>
