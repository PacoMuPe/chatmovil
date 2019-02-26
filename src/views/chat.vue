<template>
    <div class="chat fixed pin">
        <div class="contacto">
            <div class="contacto-img"></div>
            <div class="contacto-info">
                <h4>{{ receptorUsername }}</h4>
                <router-link :to="{ name: 'list' }"><img src="/flecha.png" alt="" class="flecha-chat"></router-link>
            </div>
        </div>
        <div v-for="mensaje in mensajes" :key="mensaje.id" class="conversacion">
            <p class="p-4 border-b-2 border-white" :class="{ 'text-right' : mensaje.fields.emisor == $route.params.emisor }">{{ mensaje.fields.texto }}</p>
        </div>
        <div class="input-texto">
            <input type="text" v-model="textoNuevoMensaje">
            <button @click.prevent="nuevoMensaje"><i class="far fa-comment-alt"></i></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'chat',
  props: ['emisor', 'receptor'],
  components: {
  },
  data: function () {
            return {
            loading: true,
            receptorUsername: '',
            mensajes: [],
            textoNuevoMensaje: '',
            tiempoRefresco: 1000,
        }
      
  },
  mounted: function () {
    let that = this;
    axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios/${that.$route.params.receptor}`)
        .then(function (response) {
             //obtenemos el nombre del receptor
            axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios/${that.$route.params.receptor}`)
            .then(function (response) {
                that.receptorUsername = response.data.fields.username;
                //con el resultado, obtenemos los mensajes del receptor
                that.cargarMensaje();
                //refrescamos mensajes
                setInterval(that.cargarMensaje, that.tiempoRefresco)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    },
    methods: {
        cargarMensaje: function () {
            let that = this;
            // con el resultado, obtenemos los mensajes del receptor y del emisor
            axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/mensajes?view=Grid%20view&filterByFormula=OR(AND({Emisor}="${that.$route.params.emisor}", {Receptor}="${that.receptorUsername}"), AND({Emisor}="${that.receptorUsername}", {Receptor}="${that.$route.params.emisor}"))`)
                .then(function (response) {
                    // handle success
                    that.mensajes = response.data.records;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        nuevoMensaje: function () {
            let that = this;
            // enviamos al API el mensaje
            axios.post('https://api.airtable.com/v0/appKu3WYsSg5zDj92/mensajes', {
                "fields": {
                    "texto": that.textoNuevoMensaje,
                    "emisor": [
                        that.$route.params.emisor
                    ],
                    "receptor": [
                        that.$route.params.receptor
                    ]
                }
            })
                .then(function (response) {
                    that.cargarMensaje();
                    that.textoNuevoMensaje = '';
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
            
            // refrescamos los mensajes
        }
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.contacto-info h4 {
    padding: 1rem 0rem;
    font-size: 1.3rem;
}

.contacto-info img {
    height: 22px;
    padding: 0 1rem;
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
    margin-right: none;
    margin-left: 2.5rem;
}

.mensaje-enviado img {
    width: 95%;
    margin-top: -35px;
    position: absolute;
    right: 0;
}

.conversacion {
    overflow: scroll;
}

.input-texto {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 70px;
    background-color: darkslategrey;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.input-texto input {
    background-color: gainsboro;
    border-radius: 10px;
    padding: 0.5rem;
    width: 75%;
}

.input-texto input:focus {
    outline: 0px;
}

.input-texto i {
    font-size: 2rem;
    color: white;
}

.input-texto button:focus {
    outline: 0px;
}
</style>


