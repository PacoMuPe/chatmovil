<template>
    <div>
        <router-link :to="{ name: 'signup' }"><button>Registrarse</button></router-link>
        <router-link :to="{ name: 'login' }"><button>iniciar sesion</button></router-link>
    </div>  
</template>

<script>

export default {
    name: 'inicio',
    data: function () {
        return {
        }
    }
}

</script>

<style scoped>

</style>
