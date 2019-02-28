<template>
    <div class="login">
        <input type="text" v-model="newUsername" placeholder="NUEVO USUARIO" :class="{ 'input-wrong' : usuarioExistente }" @input="retardoCheckUser">
        <input type="password" v-model="newPassword" placeholder="CONTRASEÑA">
        <input type="password" v-model="confirmedPassword" placeholder="repite contraseña" @input="checkPassword" :class="{ 'input-password' : passwordCorrect }">
        <router-link :to="{ name: 'list' , params: { emisor: emisorSeleccionado }}"><button @click="addUser">sign up</button></router-link>
    </div>
</template>

<script>

export default {
    name: 'signup',
    data: function () {
        return {
            usuarios: [],
            newUsername: '',
            newPassword: '',
            confirmedPassword: '',
            emisorSeleccionado: 0,
            usuarioExistente: false,
            passwordCorrect: false,
        }
    },
    mounted: function () {
        let that = this;
        axios.get('https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios?view=Grid%20view')
        .then(function (response) {
            // handle success
            that.usuarios = response.data.records;
            //console.log(that.usuarios);
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
        checkUser: function () {
            /*
            this.usuarioExistente = false;
            for(let user of this.usuarios) {
                if(this.newUsername.toUpperCase() == user.fields.username.toUpperCase()){
                    this.usuarioExistente = true;
                } 
            }
            */
            let that = this;
            axios.get(`https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios?view=Grid%20view&filterByFormula=AND(UPPER({username})="${that.newUsername.toUpperCase()}")`)
                .then(function (response) {
                    if(response.data.records.length > 0){
                        // Existe username
                        that.usuarioExistente = true;
                    } else {
                        // NO existe username
                        that.usuarioExistente = false;
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                }); 
        },
        retardoCheckUser: function () {
            setTimeout(this.checkUser, 200);
        },

        checkPassword: function () {
            this.passwordCorrect = false;
            if(this.newPassword == this.confirmedPassword){
                this.passwordCorrect = true;
            }
        },
        addUser: function () {
            let that = this;
            if (this.usuarioExistente == false && this.passwordCorrect){
                axios.post('https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios', {
                    "fields": {
                        "username": that.newUsername,
                        "password": that.newPassword
                    }
                })
                .then(function (response) {
                    // handle success
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
        background-color: #974162;
    }

    input {
        width: 70vw;
        height: 3rem;
        text-align: center;
        border-radius: 10px;
        background-color: transparent;
        border: 2px solid white; 
        margin: 0.5rem auto;
    }

    .input-wrong {
        width: 70vw;
        height: 3rem;
        text-align: center;
        border-radius: 10px;
        background-color: transparent;
        border: 2px solid; 
        margin: 0.5rem auto;
        @apply border-red-light;
    }

    .input-password {
        width: 70vw;
        height: 3rem;
        text-align: center;
        border-radius: 10px;
        background-color: transparent;
        border: 2px solid; 
        margin: 0.5rem auto;
        @apply border-green-light;
    }

    input:focus {
        outline: 0px; 
        background-color: #cc9daf;
    }

    button {
        width: 11rem;
        height: 3rem;
        border: 2px solid white;
        background-color: white;
        border-radius: 10px;
        margin-top: 1rem;
        color: #974162;
    }

    button:focus {
        outline: 0px;
    }

</style>