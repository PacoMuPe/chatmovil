<template>
  <div class="list fixed pin">
    <router-link to="/">Home</router-link>
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
  </div>
</template>

<script>
export default {
  name: 'list',
  components: {
  }
}
</script>

<style lang="postcss" scoped>

  .h3 {
    @apply py-4 text-center text-white font-normal;
  }

  .buscador {
    @apply py-2
  }

  .buscador-interior {
    @apply py-4
  }

  .list {
    font-family: 'Lato', sans-serif;
    background: linear-gradient(to right, rgba(76,173,200,1) 0%, rgba(81,172,195,1) 9%, rgba(99,169,175,1) 45%, rgba(128,163,144,1) 100%);
  }
</style>


