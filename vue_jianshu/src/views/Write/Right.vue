<template >
    <div class="right" v-if="data || title">
        <div class="int">
            <input type="text" v-model="title">
            <!-- <div class="menu"></div> -->
        </div>
        <WangEditor :data="data" :title="title"></WangEditor>
    </div>
</template>

<script setup lang="ts">
import { getEssayo } from '../../api/Write'
import WangEditor from "./WangEditor.vue";
import { Ref, ref, watch, toRef, defineExpose } from 'vue';

const props = defineProps<{
    eida: Ref,
    eid1: number,
}>()

let data = ref();
let title = ref("");
const eida = toRef(props, 'eida')
watch(eida, (neida) => {
    getEssayo({ id: neida }).then(res => {
        data.value = res.data[0]
        title.value = res.data[0].title
    })
})

getEssayo({ id: props.eid1 }).then(res => {
    data.value = res.data[0]
    title.value = res.data[0].title
})


defineExpose({ title })

</script>

<style scoped>
.right {
    position: relative;
    width: 83.33333333%;
    /* height: 100vh; */
    float: left;
}

.int {
    margin-top: 20px;
    width: 100%;
}

.int > input {
    width: 88%;
    padding: 0 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>