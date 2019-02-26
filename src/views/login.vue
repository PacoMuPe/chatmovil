<template>
    <div class="login">
        <select v-model="emisorSeleccionado" name="usuarios" id="">
            <option value="0">selecciona</option>
            <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">{{ usuario.fields.username }}</option>
        </select>
        <router-link :to="{ name: 'list' , params: { emisor: emisorSeleccionado }}" ><button>log in</button></router-link>
    </div>
</template>

<script>

export default {
    name: 'login',
    data: function () {
        return {
            usuarios: [],
            emisorSeleccionado: 0
        }
    },
    mounted: function () {
    let that = this;
    axios.get('https://api.airtable.com/v0/appKu3WYsSg5zDj92/usuarios?view=Grid%20view')
        .then(function (response) {
            // handle success
            that.usuarios = response.data.records;
            that.loading = false;
            console.log(usuarios);
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

    .login select {
        padding: 0.7rem 2rem;
        border-radius: 10px; 
    }

</style>
