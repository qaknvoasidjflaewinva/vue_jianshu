<template>
    <div class="write">
        <Left :userid="userid"></Left>
    </div>
</template>

<script setup lang="ts">
import Left from "./Left.vue";
let mydata
if (localStorage.length > 0) {
    mydata = localStorage.getItem('telnum');
}
const userid = mydata;
console.log(mydata);

</script>

<style scoped>
.write {
    width: 100vw;
    height: 100vh;
    overflow: hidden
}
</style>