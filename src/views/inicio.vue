<template>
    <router-link :to="{ name: 'signup' }" ><button>Registrarse</button></router-link>
    <router-link :to="{ name: 'login' }" ><button>Identificarse</button></router-link>
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