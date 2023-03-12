<template>
    <div>
        <NavBar />
        <HomeVue v-if="'/' === $route.path" />
        <!-- <router-view></router-view> -->
        <Footer v-if="'/' === $route.path" />
    </div>
</template>

<script lang="ts">
import Footer from './Footer.vue'
import NavBar from './NavBar.vue';
import HomeVue from '../views/Home/home.vue'
export default {
    components: {
        NavBar,
        HomeVue,
        Footer
    }
};
</script>

<style lang="scss" scoped>

</style>