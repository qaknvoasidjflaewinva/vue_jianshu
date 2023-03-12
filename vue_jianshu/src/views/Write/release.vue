<template >
    <div class="dd">
        <div>
            <h1 class="hh">选择分类</h1>
            <el-select v-model="data" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <button class="btn" @click="fa">确定发布</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { releaseWrite } from "../../api/Write";
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute();
        let eid = route.query.eid;
        console.log(route.query.eid);
        const data = ref();
        const options = [
            {
                value: '1',
                label: '前端',
            }, {
                value: '2',
                label: '后端',
            }, {
                value: '3',
                label: 'Andriod',
            }, {
                value: '4',
                label: 'IOS',
            }, {
                value: '5',
                label: '人工智能',
            },
            {
                value: '6',
                label: '数据库',
            }, {
                value: '7',
                label: '程序开发',
            }, {
                value: '8',
                label: '小说',
            }, {
                value: '9',
                label: '其他',
            },
        ]
        const router = useRouter()
        function fa() {
            console.log("fghjklkjnhb");
            console.log(data);

            setTimeout(() => {
                if (data.value != undefined) {
                    releaseWrite({ status: data.value, isPublish: 1, eid: eid }).then(res => {
                        if (res.data.affectedRows == 1) {
                            alert("发布成功")
                            router.push({ path: '/' })
                        }
                    })
                } else {
                    alert("请选择发布的类型")
                }

            }, 1000);

        }


        return {
            data,
            options,
            fa
        }
    }

})
</script>

<style scoped>
.dd {
    box-sizing: border-box;
    /* max-width: 900px; */
    height: 100vh;
    margin: 0 auto;
    text-align: center;
    background-color: azure;
    overflow: hidden;
}

.hh {
    margin: 50px;
}

.dd>div>div {
    margin: 20px;
}





.btn {
    margin: 20px;
    background-color: #D9D9D9;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 8%;
    cursor: pointer;
    padding: 4px 10px;
    margin-right: 20px;
}

.btn:hover {
    background-color: #404040;
    color: #f2f2f2;
}
</style>