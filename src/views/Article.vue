<template>
    <div class="article-content">
        <div class="content-wrapper">
            <div class="article-header">
                <div class="article-title"><span class="span-link-gray">{{articleName}}</span></div>
                <div><span class="span-link" @click="toHomePath">返回首页>></span></div>
            </div>
            <!-- 分割线 -->
            <div class="divider"></div>

            <div class="article-wrapper">
                <mavon-editor
                    :value="htmlMD"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs="true"
                    :boxShadow="false"
                    previewBackground="transparent"
                ></mavon-editor>
            </div>

            <!-- 文章评论 -->
            <div class="comment-wrapper">
                <div class="comment-header">
                    <div>文章评论({{commentList.length}})</div>
                    <div>
                        <span class="span-link" @click="showCommentInput">发表评论</span>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="divider"></div>

                <div class="comment-input" v-show="isShowCommentInput">
                    <div class="input-wrapper">
                        <div class="input-item">
                           <p><span style="color:red;">*</span>昵称：</p><input placeholder="输入姓名" v-model="commentContent.name" class="input-wrap"/>
                        </div>
                        <div class="input-item">
                           <p>邮箱：</p><input placeholder="填写邮箱" v-model="commentContent.email" class="input-wrap"/>
                        </div>
                    </div>
                    <div>
                        <div 　class="textarea-header"><p><span style="color:red;">*</span>评论内容：</p></div>
                        <textarea v-model="commentContent.content" placeholder="请输入评论内容(不超过300字)" class="input-textarea"/>
                    </div>
                    <div class="btn-bottom"><button class="btn primary" @click="submitContent">提交评论</button></div>
                </div>

                <div class="items-wrapper" v-if="commentListDisplay.length > 0">
                    <div class="comment-item" v-for="item in commentListDisplay" :key="item.id">
                        <div class="visitor-attr">{{item.nameDisplay}}</div>
                        <div class="visitor-content">{{item.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-sidebar">
            <div>类似文章</div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <div class="table-wrapper" v-if="similarList.length > 0">
                <div class="article-list" v-for="item in similarList" :key="item.articleId">
                    <span @click="changeArticleContent(item)" class="span-link-gray">{{item.articleName}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { verifyMail } from '../assets/libs/utils'
import { getFileContent, submitComment, getCommentList, getSearchArticle } from '../api/api'


export default {

    computed: {
        commentListDisplay: function() {
            this.commentList.forEach(item => {
                let name = item.name;
                if(name.length == 1) {
                    item.nameDisplay = '*';
                } else if(name.length == 2) {
                    item.nameDisplay = name[0] + '*';
                } else {
                    let mid = ''
                    for(let i = 0; i< name.length - 2; i++) {
                        mid += '*';
                    }
                    let last = name.length - 1;
                    let lastStr = name[last]
                    item.nameDisplay = name[0] + mid + lastStr;
                }
            });
            return this.commentList;
        }
    },
    data() {
        return {
            commentList: [],
            isShowCommentInput: false,
            commentContent: {
                name:'',
                email:'',
                content:''
            },
            htmlMD:'',
            articleName:'',
            similarList:[] ,    //类似文章
        }
    },
    methods: {
        // 返回主页
        toHomePath() {
            this.$router.push('/')
        },  
        //显示评论区
        showCommentInput() {
            this.isShowCommentInput = !this.isShowCommentInput;
        },


        //更新评论列表
        async refleshCommentList() {
            let articleId = this.$route.query.id
            let res = await getCommentList({articleId:articleId});
            if(res.code !== 0) {
                return;
            }
            this.commentList = res.commentList;
        },

        // 提交评论
        async submitContent() {
            let { name, email, content } = this.commentContent;
            if(!name||!content) {
                this.$message.warning('缺少姓名或评论内容')
                return;
            }
            if(name.length>20) {
                this.$message.warning('输入少于20个字的名字')
                return;
            }
            if(content.length > 300) {
                this.$message.warning('评论内容超出限制')
                return;
            }
            if(email) {
                if(!verifyMail(email)) {
                    this.$message.warning('输入正确的邮箱')
                    return;
                }
            }

            let params = {
                articleId: this.$route.query.id,
                name: name,
                content: content,
                email: email
            }
            let res = await submitComment(params);
            this.$message.success('提交成功')
            this.commentContent = {name:'', email:'', content:''};
            this.isShowCommentInput = false;
            this.refleshCommentList();
        },

        // 获取md文件
        async getMdFile(id ,name) {
            let params = {
                articleId: id,
                articleName: name
            }
            let res = await getFileContent(params)
            if(res.code !== 0) {
                return;
            }
            this.articleName = res.data.articleName;
            this.htmlMD = res.data.content
        },

        //获取类似文章
        async getSimilarList(tagList) {
            if(tagList.length !== 0) {
                let res = await getSearchArticle(tagList);
                if(res.code !== 0) {
                    return;
                }
                this.similarList = res.data.filter((item) => {
                    return item.articleName !== this.articleName;
                })
                return;
            }
        },

        //阅读相识文章
        changeArticleContent(item) {
            let { articleId, articleName, articleTag } = item
            this.getMdFile(articleId,articleName);
            this.getSimilarList(articleTag);
        }
    },
    mounted() {
        this.getMdFile(this.$route.query.id, this.$route.query.name);
        this.getSimilarList(this.$route.query.tagList);
        this.refleshCommentList();
    }
}
</script>

<style scoped>
.article-content {
    background: #f7f0db;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: flex-end;
}
.content-wrapper {
    width: 60%;
    margin: 0 auto;
}
.article-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.article-title {
    font-size: 24px;
    text-align: left;
}

/* 文章评论 */
.comment-wrapper {
    width: 100%;
    box-sizing: border-box;
}
.comment-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

/* 评论 */
.comment-item {
    text-align: left;
    box-sizing: border-box;
    padding: 20px;
    font-size: 14px;
    border-bottom: 1px solid rgb(194, 194, 194);
} 
.visitor-content {
    font-size: 12px;
    margin-top: 10px;
}

/* 评论区 */
.input-wrapper {
    display: flex;
    justify-content: flex-start;
}
.input-item {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 40px;
}
.input-item p {
    font-size: 13px;
    width: 25%;
    text-align: left;
}
.input-item input {
    width: 75%;
}
.textarea-header p {
    font-size: 13px;
    text-align: left;
}
.btn-bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 10px;
}
.article-wrapper {
    text-align: left;
}

/* 导航栏 */
.nav-sidebar {
    width: 25%;
    text-align: left;
    box-sizing: border-box;
    padding: 10px 80px 5px 20px;
}
.table-wrapper {
    font-size: 14px;
    box-sizing: border-box;
    overflow: auto;
}
.article-list {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>