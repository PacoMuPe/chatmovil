<template>
    <div class="chat">
        <div class="contacto fixed">
            <div class="contacto-img"></div>
            <div class="contacto-info">
                <h4>{{ receptorUsername }}</h4>
                <router-link :to="{ name: 'list' }"><img src="/flecha-gris.svg" alt="" class="flecha-chat"></router-link>
            </div>
        </div>
        <div class="conversacion">
            <loading v-if="loading" class="flex justify-center items-center mt-12"></loading>
            <div v-else v-for="mensaje in mensajes" :key="mensaje.id" class="mensaje-recibido" :class="{ 'mensaje-enviado' : mensaje.fields.emisor == $route.params.emisor }">
                <p>{{ mensaje.fields.texto }}</p>
            </div>
        </div>
        
        <div class="input-texto">
            <input type="text" v-model="textoNuevoMensaje" @keyup.enter="nuevoMensaje">
            <button @click.prevent="nuevoMensaje"><i class="far fa-comment-alt"></i></button>
        </div>
    </div>
</template>

<script>

import loading from '@/components/loading.vue'

export default {
  name: 'chat',
  props: ['emisor', 'receptor'],
  components: {
      loading
  },
  data: function () {
            return {
            loading: true,
            receptorUsername: '',
            emisorUsername: '',
            mensajes: [],
            textoNuevoMensaje: '',
            tiempoRefresco: 1000,
        }
      
  },
  mounted: function () {
    let that = this;
    axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios/${that.$route.params.emisor}`)
        .then(function (response) {
            that.emisorUsername = response.data.fields.username;
             //obtenemos el nombre del receptor
            axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios/${that.$route.params.receptor}`)
            .then(function (response) {
                that.receptorUsername = response.data.fields.username;
                //con el resultado, obtenemos los mensajes del receptor
                that.cargarMensaje();
                //refrescamos mensajes
                setInterval(that.cargarMensaje, that.tiempoRefresco);
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
            axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/mensajes?view=Grid%20view&filterByFormula=OR(AND({Emisor}="${that.emisorUsername}", {Receptor}="${that.receptorUsername}"), AND({Emisor}="${that.receptorUsername}", {Receptor}="${that.emisorUsername}"))`)
                .then(function (response) {
                    // handle success
                    if (response.data.records.length != that.mensajes.length) {
                        that.mensajes = response.data.records;
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                                            that.loading = false;

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
        },
        updated: function() {
            let conversacion = document.querySelector('.conversacion');
            conversacion.scrollTo(0, conversacion.scrollHeight);
        }
        
    }
}
</script>

<style lang="postcss" scoped>
.chat {
    font-family: 'Lato', sans-serif;
    background-color: rgb(238, 125, 80);
    height: 100vh;
    overflow: scroll;
}

.contacto {
    position: relative;
    display: flex;
    align-items: center;
    height: 20%;
    position: fixed;
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

.conversacion {
    margin-top: 8rem;
    margin-bottom: 5rem;
}

.mensaje-recibido {
    @apply p-4 bg-grey-light my-2 w-4/5 rounded-lg ml-2
}

.mensaje-enviado {
    background-color: rgb(238, 169, 80);
    @apply text-right mr-2 ml-auto p-4 my-2 w-4/5 rounded-lg
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


