<template>
  <div id="app">
      <Wrapper></Wrapper>
  </div>
</template>
<script>
import Wrapper from '@/components/wrapper'
    export default {
        name: 'App',
        components: {
            Wrapper
        }
    }
</script>
<style lang="less">
#nav {
  .router-link-active {
    text-decoration: none;
  }
  .toStyle{
    text-decoration:none;
    color: #555;
    &:hover {
      color: #0af;
      cursor: pointer;
    }
  }
}
</style>
