<template>
    <div class="home">
        <!-- 主页左边栏 -->
        <div class="page-left">
            <!-- 最新发布 -->
            <div class="article-dispaly">
                <!-- 文章列表 -->
                <div class="table-title">
                    <span>最新发布</span>
                </div>
                <div class="table-wrapper" id="tableWrapper">
                    <div class="article-list" v-for="item in newestList" :key="item.articleId">
                        <span @click="toArticleContent(item)" class="span-link-gray">{{item.articleName}}</span>
                    </div>
                </div>
            </div>      
        </div>
        <!-- 主页内容栏 -->
        <div class="page-right">
            <div class="page-content">
                 <!-- 最紧更新 -->
                <div v-show="searchTagList.length == 0">
                    <div class="article-new">最近更新：<span @click="toArticleContent(newestArticle)" class="span-link-gray">{{newestArticle.articleName}}</span><span style="font-size:13px;">{{newestArticle.date.slice(0,10)}}</span></div>
                    <!-- 分割线 -->
                    <div class="divider"></div>
                    <div>
                        <div class="article-tag">标签：<span v-for="(item,index) in newestArticle.articleTag" :key="index" class="span-link" style="margin-right:10px;">{{item}}</span></div>
                        {{newestArticle.overview}}
                        <div class="read-complete"><span @click="toArticleContent(newestArticle)" class="span-link">前往阅读>>></span></div>
                    </div>
                </div>
                <div class="content-title">全部文章</div>
                <!-- 分割线 -->
                <div class="divider"></div>
                <div class="table-wrapper" id="tableWrapper">
                    <div class="article-list-all" v-for="item in articleList" :key="item.articleId">
                        <span @click="toArticleContent(item)" class="span-link-gray">{{item.articleName}}</span><span>{{item.date.slice(0,10)}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 导航栏 -->
        <div class="nav-side">
            <!-- 文章标签 -->
            <div class="article-label">
                <div>文章标签</div>
            </div>
            <div class="tag-wrapper">
                <div :class="item.isSelect?'tag select':'tag none'" v-for="(item,index) in tagList" :key="index" @click="changeSelect(item)">{{item.tag}}</div> 
            </div>
            <!-- 作者内容 -->
            <div class="author-desc">
                <div class="desc-warpper">
                    <div class="author image"><img style="width:100%;height:100%;" src="../assets/logo.jpeg" /></div>
                    <div class="author article">
                        <div class="count-label">文章数</div>
                        <div class="article-count"><span @click="selectAllTag" class="span-link">{{articleList.length}}</span></div>
                    </div>
                    <div class="author article">
                        <!-- TODO -->
                        <!-- <div class="count-label">留言</div>
                        <div class="article-count">4</div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { getFileList, getTagList , getSearchArticle, login} from '../api/api'

export default {
    
    computed: {
        //计算searchTagList
        searchTagList: function() {
            let arr = [];
            for(let i=0;i<this.tagList.length;i++) {
                if(this.tagList[i].isSelect) {
                    arr.push(this.tagList[i].tag);
                }
            }
            return arr;
        },
    },
    
    data() {
        return {
            tagList: [],  //标签列表
            articleList:[],  //文章列表
            //最新篇文章
            newestArticle: {
                articleId:'',
                articleName:'',
                overview:'',
                date:''
            },
            newestList:[],  //最新文章列表
        }
    },
    methods: {
        //更新搜索词
        async changeSelect(item) {
            let tag = item.tag
            this.tagList.forEach(item => {
                if( tag === item.tag) {
                    item.isSelect = !item.isSelect;
                };
            });
            let isSelectList = this.tagList.map(item => {
                if(item.isSelect) {
                    return item;
                };
            });
            if(this.searchTagList.length !== 0) {
                let res = await getSearchArticle(this.searchTagList);
                if(res.code !== 0) {
                    return;
                }
                this.articleList = res.data
                return;
            }
            this.getFileListAll();
        },

        //跳转文章内容
        toArticleContent(item) {
            let query = {
                id: item.articleId,
                name: item.articleName,
                tagList: item.articleTag
            }
            this.$router.push({path:'/article', query: query});
        },
        // 获取文章列表
        async getFileListAll() {
            let res = await getFileList();
            if(res.code !== 0) {
                return;
            }
            let last = res.data.length - 1;
            this.articleList = res.data;
            if(this.articleList.length < 10) {
                this.newestList = this.articleList;
            } else {
                this.newestList = this.articleList.slice(this.articleList.length-10,this.articleList.length);
            }
            this.newestArticle = res.data[last];
        },

        // 选择全部文章
        selectAllTag() {
            this.getFileListAll();
            if(this.searchTagList[0] !== 'all') {
                this.searchTagList.push('all');
            }
        },

        //获取全部文章标签
        async refleshTagList() {
            let res = await getTagList();
            if(res.code !== 0 ) {
                return;
            }
            this.tagList = res.tagList.map((item) => {
                return { tag: item, isSelect: false }
            });;
        },

        // 设置表高度
        setTableHeight() {
            let height = window.innerHeight - 240;
            var table = document.getElementById('tableWrapper');
            table.style.maxHeight = height + 'px';
        },
    },
    mounted () {
        this.setTableHeight();
        this.getFileListAll();
        this.refleshTagList();
    }
}
</script>

<style scoped>
.home {
    height: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
}
/*  主页左边栏  */
.page-left {
    width: 25%;
    text-align: left;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 20px 20px 5px 80px;
}

/*  作者内容  */
.author-desc {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 15px 10px 15px;
    border-radius: 4px;
}
.desc-warpper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px 0;
    background: #f4edd5;
    box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.1)
}
.author {
    width: 100%;
    box-sizing: border-box;
    
}
.author.image {
    padding: 0;
    margin: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;
}
.author.article {
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.count-label {
    width: 45%;
    text-align: right;
    margin-right: 10px;
}
.article-count {
   width: 45%;
   text-align: left;
}

/*  文章标签  */
.article-label {
    /* background: #fff; */
    margin-top: 20px;
    font-size: 14px;
    box-sizing: border-box;
    padding: 5px 15px 0 15px;
    display: flex;
    justify-content: space-between;
}
.tag-wrapper {
    width: 100%;
    max-height: 400px;
    padding: 5px 15px 10px 15px;
    border-radius: 4px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

/* 主页内容栏 */
.page-right {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px 10px 5px 0;
}
.page-content {
    width: 100%;
    height: 100%;
    /* background: #fff; */
    box-sizing: border-box;
    padding: 15px 20px;
    border-radius: 4px;
    text-align: left;
}
.content-title {
    font-size: 18px;
    text-align: left;
    cursor: pointer;
}

.article-dispaly {
    box-sizing: border-box;
}
.article-new {
    font-size: 18px;
    text-align: left;
}

.article-tag {
    text-align: right;
}
.read-complete {
    margin: 15px 0;
}

.table-title {
    box-sizing: border-box;
    padding: 20px 0 5px 0;
    border-bottom: 1px solid rgb(194, 194, 194);
    margin-bottom: 10px;
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
.article-list-all {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0 10px;
}

/* 导航栏 */
.nav-side {
    width: 25%;
    text-align: left;
    box-sizing: border-box;
    padding: 5px 80px 5px 20px;
}
</style>
