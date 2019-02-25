<template>
    <div class="chat fixed pin">
        <div class="contacto">
            <div class="contacto-img">
            </div>
            <div class="contacto-info">
                <h4>Paco</h4>
            </div>
        </div>
        <div class="mensaje-recibido">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro distinctio harum nemo consequatur ipsam delectus non aperiam eaque, eos officia provident alias cumque voluptatum quod ab qui, vitae voluptatem molestias?</p>
            <img src="/barrachat.svg" alt="">
        </div>
        <div class="mensaje-enviado">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro distinctio harum nemo consequatur ipsam delectus non aperiam eaque, eos officia provident alias cumque voluptatum quod ab qui, vitae voluptatem molestias?</p>
            <img src="/barrachat.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: 'chat',
  props: ['emisor', 'receptor'],
  components: {
  },
  mounted: function () {
    let that = this;
    axios.get('https://api.airtable.com/v0/appKu3WYsSg5zDj92/mensajes?view=Grid%20view')
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
.chat {
    font-family: 'Lato', sans-serif;
    background-color: rgb(184, 204, 194);
}

.contacto {
    position: relative;
    display: flex;
    align-items: center;
    height: 20%;
}

.contacto-img {
    width: 100px;
    height: 100px;
    background-color: white;
    border: 3px solid rgb(150, 150, 150);
    border-radius: 100%;
    margin-left: 1rem;
    z-index: 999;
    position: absolute;
}

.contacto-info {
    position: absolute;
    background-color: white;
    width: 100vw;
}

.contacto-info h4 {
    padding: 1rem 0;
    padding-left: 8rem;
}

.mensaje-recibido {

}

.mensaje-recibido p {
    width: 85%;
    margin-left: 1rem;
}

.mensaje-recibido img {
    transform: scaleX(-1);
    width: 95%;
    margin-top: -35px;
}

.mensaje-enviado {
    margin-top: 2rem;
}

.mensaje-enviado p {
    width: 85%;
    margin-right: 0.5rem;
}

.mensaje-enviado img {
    width: 95%;
    margin-top: -35px;
}
</style>


