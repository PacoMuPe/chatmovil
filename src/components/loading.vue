<template>
  <div class="cargador">
    <div class="lds-dual-ring">{{ mensaje }}</div>
  </div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        mensaje: {
          default: 'cargando',
          type: String
        }
    }
}
</script>


<style scoped>

.cargador {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
