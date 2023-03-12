<template >
    <div calss="tem" style="border: 1px solid #ccc;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor style="height: 100vh; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            :mode="mode" @onCreated="handleCreated" />
        <div class="btnf">
            <button class="btn" @click='preservation'>保存</button>
            <button class="btn" @click="release">{{ isPub }}</button>
        </div>
        <div class="date">更新时间：<span>{{ datey }}&nbsp;&nbsp;{{ dates }}</span></div>
        <div class="wnum">字数：<span>{{ word_num }}</span></div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { shallowRef, ref, onBeforeUnmount, toRef, onUpdated, toRefs, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import { useRouter } from 'vue-router'
import axios from 'axios';

export default {
    components: { Editor, Toolbar },
    props: ["data", "title"],

    setup(props) {
        //路由
        const router = useRouter()


        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()
        const valueText = ref('')
        // 内容 HTML
        function ToText(HTML) {
            return HTML.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');

        }

        const valueHtml = ref('')
        const { data, title } = toRefs(props)
        valueHtml.value = data.value.content
        let word_num = ref(0)
        if (valueHtml.value != undefined) {
            word_num = ToText(valueHtml.value).length
        }
        const datey = ref(data.value.update_time.substring(0, 10));
        const dates = ref(data.value.update_time.substring(11, 19));
        const isPub = ref("")

        if (data.value.isPublish == 1) {
            isPub.value = '已发布'
        } else {
            isPub.value = '发布'
        }


        /*菜单栏配置*/
        const editorConfig = { placeholder: '请输入内容...', MENU_CONF: {} }

        /* 工具栏配置 */
        const toolbarConfig = {
            toolbarKeys: [
                {
                    key: 'group-bold',
                    title: '字体',
                    menuKeys: ['bold', 'italic', 'through', 'blockquote',]
                },
                'clearStyle',
                'color',
                'bgColor',
                '|',
                'codeBlock',
                'uploadImage',
                // 菜单组，包含多个菜单
                {
                    key: 'group-link',
                    title: '链接',
                    menuKeys: ['insertLink', 'editLink', 'unLink', 'viewLink']
                },
                'divider',
                'headerSelect',
                'redo',
                'undo',
                'fullScreen'
            ]
        }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })


        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
            return editor
            //显示工具配置
            // console.log(editor.getAllMenuKeys())
            //获取text内容
            // console.log(editor.getText());
        }


        //图片上传
        editorConfig.MENU_CONF['uploadImage'] = {
            server: 'http://localhost:7001/upOneFile.do', // 上传图片地址

            timeout: 5 * 1000, // 5s

            fieldName: 'custom-fileName',
            // meta: { token: 'xxx', a: 100 },
            // metaWithUrl: true, // 参数拼接到 url 上
            headers: { Accept: 'text/x-json' },

            maxFileSize: 10 * 1024 * 1024, // 10M

            base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

            onBeforeUpload(files) {
                console.log('onBeforeUpload', files)

                return files // 返回哪些文件可以上传
                // return false 会阻止上传
            },
            onProgress(progress) {
                //进行中
                console.log('onProgress', progress)
            },
            onSuccess(file, res) {
                //成功
                console.log('onSuccess', file, res)
            },
            onFailed(file, res) {
                //失败
                alert(res.message)
                console.log('onFailed', file, res)
            },
            onError(file, err, res) {
                //失败
                alert(err.message)
                console.error('onError', file, err, res)
            },
        }

        return {
            editorRef,
            valueHtml,
            valueText,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            data,
            title,
            router,
            word_num,
            ToText,
            datey,
            dates,
            isPub
        };
    },
    methods: {
        preservation() {
            let eid = this.data.eid
            let content = this.valueHtml
            let title = this.title
            let update_time = this.dateFormat()
            let word_num = this.word_num
            axios.post('http://localhost:7001/updateWrite.do', { eid, title, content, update_time, word_num })
                .then(res => {
                    if (res.data.affectedRows == 1) {
                        alert("保存成功")
                        this.$router.go(0)
                    }
                })
        },
        dateFormat() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        },
        release() {
            let word_num = this.word_num
            let eid = this.data.eid
            let isPublish = this.data.isPublish
            if (isPublish == 0) {
                if (word_num == 0) {
                    alert("文本内容不能为空哦~~")
                } else {
                    this.router.push({ path: '/release', query: { eid: eid } })
                }
            } else {
                alert('发布过的文章不能在发布了哦')
            }
        },



    },
    watch: {
        data(n) {
            if (n.content == undefined) {
                this.valueHtml = "<p><br></p>"
                this.word_num = 0
            } else {
                this.valueHtml = n.content
                this.word_num = this.ToText(n.content).length
            }
            this.datey = n.update_time.substring(0, 10)
            this.dates = n.update_time.substring(11, 19)
            n.isPublish == 0 ? this.isPub = '发布' : this.isPub = '已发布'

        },
        valueHtml(n) {
            this.word_num = this.ToText(n).length
        }
    }
}

</script>    
<style lang="scss" scoped>
.btnf {
    position: absolute;
    top: 4%;
    right: 3%;
}

.btn {
    background-color: #D9D9D9;
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

.wnum {
    font-size: 14px;
    position: absolute;
    top: 30px;
    right: 200px;
}

.date {
    position: absolute;
    font-size: 13px;
    top: 0;
}
</style>