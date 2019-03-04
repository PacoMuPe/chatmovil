<template>
    <div class="login">
        <h4 v-if="errorLogin">El usuario o la contraseña son incorrectos</h4>
        <loading v-if="loading" mensaje="comprobando datos" class="flex justify-center mt-12"></loading>
        <input type="text" v-model="username" :class="{ 'errorLogin' : errorLogin }" @keyup.enter="iniciarSesion" placeholder="Usuario">
        <input type="password" v-model="password" :class="{ 'errorLogin' : errorLogin }" @keyup.enter="iniciarSesion" placeholder="Contraseña">
        <router-link :to="{ name: 'list' , params: { emisor: emisorSeleccionado }}"><button @click.prevent="iniciarSesion">log in</button></router-link>
    </div>
</template>


<script>

import loading from '@/components/loading.vue'

export default {
    name: 'login',
    components: {
        loading
    },
    data: function () {
        return {
            usuarios: [],
            emisorSeleccionado: 0,
            username: '',
            password: '',
            errorLogin: false,
            loading: false

        }
    },
    mounted: function () {
        this.autologin();
    },
    methods: {
        autologin: function () {
            // obtenemos los datos almacenados del usuario
            let usuario = JSON.parse(localStorage.getItem('usuario'));
            // comprobamos si tenemos un usuario guardado
            if(usuario != null) {
                // Redireccionamos a list
                this.$router.push({ name: 'list', params: { emisor: usuario.id }});
            }
        },

        iniciarSesion: function () {
            this.validarUsuario();
        },
        validarUsuario: function () {
            let that = this;
            this.loading = true;
            this.errorLogin = false;
            axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios?view=Grid%20view&filterByFormula=AND(UPPER({username})="${that.username.toUpperCase()}", {password}="${that.password}")`)
                .then(function (response) {
                    // handle success
                    if(response.data.records.length > 0){
                        // Guardamos el usuario
                        localStorage.setItem('usuario', JSON.stringify({
                            id: response.data.records[0].id,
                            username: that.username,
                        }));
                        // Cambiamos de pantalla a lista de usuarios
                        that.$router.push({ name: 'list', params: { emisor: response.data.records[0].id }});
                    } else {
                        // el usuario no existe
                        that.errorLogin = true;
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
        }
    }
}

</script>

<style lang="postcss" scoped>

    .login {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: rgb(184, 204, 194);
    }

    .login input {
        width: 70vw;
        height: 3rem;
        border-radius: 10px;
        background-color: transparent;
        border: 2px solid white; 
        padding: 1rem;
        margin: 0.7rem auto;
    }

    .login option {
        text-align: center;
    }

    .login input:focus {
        outline: 0px; 
    }

    button {
        width: 11rem;
        height: 3rem;
        border: 2px solid white;
        background-color: white;
        border-radius: 10px;
        color: rgb(184, 204, 194);
    }

    button:focus {
        outline: 0px;
    }

    .errorLogin {
        @apply bg-red-lighter border-red
    }

</style>
