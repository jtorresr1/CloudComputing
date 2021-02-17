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
                    <i>{{personalID}}</i>
                  </div>
                </div>
                <br><br>
                <ul>
                  <li> <button v-on:click="view_home"> Inicio </button> </li>
                  <li> <button v-on:click="view_mouse"> Mouse </button> </li>
                  <li> <button v-on:click="view_teclado"> Teclados </button> </li>
                  <li> <a href=""> Catalogo </a> </li>
                </ul>
            </div>

            <div class="col-sm-8">
                
                <h3>Bienvenido {{name}}, esta pagina esta en creación.</h3>
                <br>
                <component v-bind:is="component" />
                <br><br><br>
                <div class="row">
                  

                  <div class="col-sm-2">

                  </div>
                  
                  <!--<div class="col-sm-6">
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
                          <tr v-for="(m, index) in data_mouse" :key="index">
                              <td>{{m.Marca}}</td>
                              <td>{{m.Modelo}}</td>
                              <td>{{m.Sensibilidad}}</td>
                              <td>{{m.Precio}}</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>-->

                </div> 

                
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
    Teclado
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
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
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


  }

}
</script>

<style>


</style>
