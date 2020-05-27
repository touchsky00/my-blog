<template>
    <div class="edit-page">
        <!-- 文件编辑 -->
        <div class="edit-article">
            <!-- 上传md文件 -->
            <div class="upload-item">
                <div><span class="span-link" @click="toHomePath">返回首页</span></div>
                <div class="upload-wrapper">
                    <div style="width:50%;margin-right:10px;"><input v-model="fileName" class="input-wrap"/></div>
                    <el-upload
                            action
                            :auto-upload="false"
                            :on-change="handleUpload"
                            :show-file-list="false"
                        >
                        <button class="btn primary">点击上传</button>
                    </el-upload>
                </div>
            </div>
            <mavon-editor
                :style="'height:'+ mavonHeight"
                :boxShadow="false"
                v-model="editContent">
            </mavon-editor>
            <div class="edit-bottom">
                <div class="synopsis-input">
                    <div>文章简介： </div>
                    <div style="width:80%;"><textarea v-model="overview" class="input-textarea"/></div>
                </div>
                <div class="article-tag">
                    <div class="input-tag">
                        <div style="width:60%"><input @keyup.enter="addArticleTag" v-model="articleTag" class="input-wrap"/></div>
                        <div style="margin-left:10px;"><button @click="addArticleTag" class="btn primary">添加标签</button></div>
                    </div>
                    <div class="tag-wrapper"> 
                        <div class="tag-operation" @click="removeTag(item)" v-for="(item,index) in tagList" :key="index">
                            <span>{{item}}</span><i style="font-size:12px;" class="el-icon-close"></i>
                        </div>
                    </div>
                </div>
                <div class="btn-submit">
                    <div class="btn-area">
                        <button style="font-size:18px;" class="btn primary" @click="submitArticle">发布文章</button>
                    </div>
                </div>
            </div>
        </div>

        <my-dialog
			:title="dialogTitle"
			:content="dialogContent"
			:visable="isDialogVisable"
			@confirm="getRulesForm"
			@cancel="isDialogVisable = false"
		/>

    </div>
</template>

<script>
import { readFile } from '../assets/libs/utils'
import { uploadFile, login } from '../api/api'


export default {
    data() {
        return {
            editContent:'',
            fileName:'',
            mavonHeight: window.innerHeight - 240 + 'px',
            overview:'',
            tagList:[],
            articleTag:'',

            //登录弹窗
			isDialogVisable: false,
			dialogContent: [], //content参数{content,name,label,rules,placeholder}
			dialogTitle: ""
        }
    },
    methods: {
        async handleUpload(ev) {
            let file = ev.raw;
            this.fileName = ev.name.replace(/\.md+$/g,'')
            if(!file) {
                return;
            }
            let data = await readFile(file);
            this.editContent = data;
        },
        // 添加标签
        addArticleTag() {
            if(!this.articleTag) {
                this.$message.warning('请输入标签');
                return;
            }
            this.tagList.push(this.articleTag);
            this.articleTag = ''
        },
        //移除tag
        removeTag(item) {
            let reSetArr = [];
            for(let i = 0;i<this.tagList.length;i++) {
                if(item === this.tagList[i]) {
                    this.tagList.splice(i,1);
                    break;
                };
            };
            // this.tagList = reSetArr;
        },
        // 提交文章
        async submitArticle() {
            let name = this.fileName;
            let content = this.editContent;
            let overview = this.overview;
            let tagList = this.tagList;
            if(!name) {
                this.$message.warning('请输入文件名');
                return;
            }
            if(!content) {
                this.$message.warning('编辑内容为空');
                return;
            }
            if(!overview) {
                this.$message.warning('请输入文件摘要');
                return;
            }
            if(tagList.length === 0) {
                this.$message.warning('请输入文件标签');
                return;
            }
            let requestData = {
                articleName:  name,
                overview: overview,
                content: content,
                articleTag: tagList,
            }
            let fileName = name + '.md';
            var file = new File([content], fileName, {
                type: "text/plain;charset=utf-8"
            });
            let params = new FormData();
            params.append("file",file)
            let res = await uploadFile(requestData)
            if(res.code !== 0) {
                this.$message.error(res.message)
                return;
            };
            this.$message.success('上传成功');
            this.editContent = '';
            this.fileName = '';
            this.overview = '';
            this.tagList = [];
        },
        // 返回主页
        toHomePath() {
            this.$router.push('/')
        },

         //显示登陆弹窗
        dialogVisable() {
            let addContent = [
				{
					name: "name",
					label: "用户名",
					placeholder: "请输入姓名",
					rules: [
						{
							required: true,
							message: "请输入姓名",
							trigger: "blur"
						}
					]
				},
				{
					name: "password",
					label: "密码",
					placeholder: "请输入密码",
					rules: [
						{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						}
					]
				}
			];
			this.isDialogVisable = true;
			this.dialogTitle = "登录账号"
			this.dialogContent = addContent;
        },

        //获取登陆表单内容
        async getRulesForm(data) {
            let params = {
                name: data.name,
                password: data.password
            }
            let res = await login(params);
            if(res.code !== 0) {
                this.$message.warning('登录失败');
                this.isDialogVisable = true;
                return;
            }
            this.$store.dispatch('setUserInfo',params);
            this.$message.success('登录成功')
            this.isDialogVisable = false;
        }
    },
    mounted() {
        this.dialogVisable();
    }
}
</script>

<style scoped>
.edit-page {
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.edit-article {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
}
/* 上传 文件*/
.upload-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.edit-bottom {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.upload-wrapper {
    width: 70%;
    display: flex;
    justify-content: flex-end;
}


/* 文章简介 */
.synopsis-input {
    width: 30%;
    font-size: 13px;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    margin-right: 30px;
}

/* 文章标签 */
.article-tag {
    width: 30%;
}
.input-tag {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
}
.tag-wrapper {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 5px;
    max-height: 70px;
    overflow: auto;
}
.tag-operation {
    background-color: #145c00;
    box-sizing: border-box;
    padding: 2px 3px;
    border-radius: 2px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 2px 2px;
}
.tag-operation:hover {
    background-color: #1d8700;
}

/* 提交 */
.btn-submit {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
</style>