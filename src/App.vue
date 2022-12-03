<template>
    <router-link to="/base" id="index" onclick="hide">gene</router-link>
    <router-view />

</template>
  
<style lang="stylus">

</style>
<script lang="ts">
export default {
    methods: {
        hide() {
            const a = document.getElementById('index')
            if (a) {
                a.style.display = 'none'
            }
        }
    }
}
</script>
  