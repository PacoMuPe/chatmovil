<template>
  <div class="list fixed pin">
    <div class="bg-grey-dark">
      <h3 class="h3">Chats activos</h3>
      <router-link :to="{ name: 'login' }" class="flecha-login"><img src="/flecha-blanca.svg" alt=""></router-link>
    </div>
    <div class="bg-white">
      <div class="buscador">
        <div class="buscador-interior">
          <i class="fas fa-search"></i>
          <input type="text">
        </div>
      </div>
    </div>
    <loading v-if="loading" class="flex justify-center items-center mt-12 mx-auto"></loading>
    <div v-else>
      <div class="listado-chats">
        <div class="chat" v-for="usuario in usuarios" :key="usuario.id">
          <div class="chat__imagen"></div>
          <div class="chat__info">
            <h4 class="chat__info__contacto">{{ usuario.fields.username }}</h4>
            <p class="chat__info__conversacion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quo...</p>
          </div>
          <router-link :to="{ name: 'chat', params: { emisor: $route.params.emisor, receptor: usuario.id } }" class="flecha-chat"><img src="/flecha-gris.svg" alt=""></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import loading from '@/components/loading.vue'

export default {
  name: 'list',
  components: {
    loading
  },
  data: function () {
    return {
      usuarios: [],
      loading: true,
    }
  },
  mounted: function () {
    let that = this;
    axios.get('https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios?view=Grid%20view')
      .then(function (response) {
        // handle success
        console.log(response.data);
        that.usuarios = response.data.records;
        that.loading = false;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
}
</script>

<style lang="postcss" scoped>

  .h3 {
    @apply py-4 text-center text-white font-normal;
  }

  .buscador {
    @apply py-2;
  }

  .buscador-interior {
    background-color: rgb(250, 250, 250);
    max-width: 90%;
    border-radius: 10px;
    box-shadow: inset 2px 2px 5px 0 rgb(220, 220, 220);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buscador-interior input[type="text"] {
    background-color: transparent;
    width: 95%;
    @apply py-3;
  }

  .buscador-interior input[type="text"]:focus {
    outline: initial;
  }

  .buscador-interior i {
    font-size: 1.3rem;
    padding: 0.75rem;
  }

  .list {
    font-family: 'Lato', sans-serif;
    background: rgb(238, 125, 80);
  }

  .listado-chats {
    margin-top: 2rem;
  }

  .chat {
    background-color: white;
    padding: 0.7rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0.3rem 0;
  }

  .chat__imagen {
    padding: 1rem 0;
    width: 50px;
    height: 50px;
    background-color: rgb(220, 220, 220);
    border-radius: 100%;
  }
  .flecha-login {
    transform: scaleX(-1);
    position: fixed;
    top: 0;
    padding: 1rem;
  }

  .flecha-login img {
    height: 20px;
  }

  .flecha-chat {
    
  }

  .flecha-chat img {
    height: 22px;
  }
  
  .chat__info {
    width: 80%;
    margin-left: 0.6rem;
  }

  .chat__info__conversacion {
    margin-top: 0.2rem;
    font-size: 0.7rem;
    color: rgb(150, 150, 150);
  }

</style>


