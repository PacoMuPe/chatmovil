<template>
  <div class="list fixed pin">
    <div class="bg-grey-dark">
      <h3 class="h3">Chats activos</h3>
    </div>
    <div class="bg-white">
      <div class="buscador">
        <div class="buscador-interior">
          <i class="fas fa-search"></i>
          <input type="text">
        </div>
      </div>
    </div>
    <div class="listado-chats">
      <div class="chat" v-for="usuario in usuarios" :key="usuario.id">
        <div class="chat__imagen"></div>
        <div class="chat__info">
          <h4 class="chat__info__contacto">{{ usuario.fields.username }}</h4>
          <p class="chat__info__conversacion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quo...</p>
        </div>
        <router-link :to="{ name: 'chat', params: { emisor: $route.params.emisor, receptor: usuario.id } }"><img src="/flecha.png" alt="" class="flecha-chat"></router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'list',
  components: {
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
    background: linear-gradient(to right, rgba(76,173,200,1) 0%, rgba(81,172,195,1) 9%, rgba(99,169,175,1) 45%, rgba(128,163,144,1) 100%);
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
  .flecha-chat {
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


