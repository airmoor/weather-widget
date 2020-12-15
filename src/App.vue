<template>
  <div id="app">
    <layout-header/>
    <main>
      <router-view/>
    </main>

  </div>
</template>

<script>
  import LayoutHeader from "./components/layouts/layout-header";
  export default {
    components: {LayoutHeader}
  }
</script>


<style lang="scss">
  #app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    max-width: 350px;
    width:100%;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    top:0;

  }
</style>