<template>
    <div class="home" @click="getMouseXY">
        <canvas id="rain"></canvas>
        <!-- 主页左边栏 -->
        <div class="page-left">
            <!-- 文章标签 -->
            <div class="article-label">
                <div>文章标签</div>
            </div>
            <div class="tag-wrapper">
                <div :class="item.isSelect?'tag select':'tag none'" v-for="item in tagList" :key="item.id" @click="changeSelect(item)">{{item.tag}}</div> 
            </div>
            <!-- 作者内容 -->
            <div class="author-desc">
                <div class="desc-warpper">
                    <div class="author image"><img style="width:100%;height:100%;" src="../assets/logo.jpeg" /></div>
                    <div class="author article">
                        <div class="count-label">文章数</div>
                        <div class="article-count"><span class="span-link">1223</span></div>
                    </div>
                    <div class="author article">
                        <div class="count-label">留言</div>
                        <div class="article-count">1223</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主页内容栏 -->
        <div class="page-right">
            <div class="page-content">
                <div class="content-title">My前端之路</div>
                <!-- 分割线 -->
                <div class="divider"></div>
                <div style="margin-bottom:30px;">记录学习前端遇到的内容和知识点的笔记</div>
                <!-- 最新发布 -->
                <div class="article-dispaly">
                    <div v-show="searchTagList.length == 0">
                        <div class="article-new">最近更新：<span @click="toArticleContent(newestArticle)" class="span-link-gray">{{newestArticle.name}}</span><span style="font-size:13px;">2020:23:23</span></div>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <div>
                            <div class="article-tag">标签：<span class="span-link">vue</span></div>
                            {{newestArticle.articleSynopsis}}
                            <div class="read-complete"><span @click="toArticleContent(newestArticle)" class="span-link">前往阅读>>></span></div>
                        </div>
                    </div>
                    <!-- 文章列表 -->
                    <div class="table-title">
                        <span v-if="searchTagList.length == 0">最新发布</span>
                        <span v-else>搜索标签：</span>
                        <span class="span-link" style="margin-right:10px;" v-for="(item,index) in searchTagList" :key="index">{{item}}</span>
                    </div>
                    <div class="table-wrapper" id="tableWrapper" v-if="searchTagList.length !== 0">
                        <div class="article-list" v-for="item in articleList" :key="item.id">
                            <span @click="toArticleContent(item)" class="span-link-gray">{{item.name}}</span><span style="font-size:13px;margin-left:15px;">{{item.date}}</span>
                        </div>
                    </div>
                    <div class="table-wrapper" id="tableWrapper" v-if="searchTagList.length === 0">
                        <div class="article-list" v-for="item in newestList" :key="item.id">
                            <span @click="toArticleContent(item)" class="span-link-gray">{{item.name}}</span><span style="font-size:13px;margin-left:15px;">{{item.date}}</span>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>


<script>
import { throttle, random , drawRain , getWindowWH , drawPointSpread} from '../assets/libs/utils'
import { getFileList } from '../api/api'

export default {
    
    computed: {
        //返回最新数组
        newestList: function() {
            if(this.articleList.length <10) {
                return this.articleList;
            } else {
                return  this.articleList.slice(this.articleList.length-10,this.articleList.length);
            }
        },
        //计算searchTagList
        searchTagList: function() {
            let arr = [];
            for(let i=0;i<this.tagList.length;i++) {
                if(this.tagList[i].isSelect) {
                    arr.push(this.tagList[i].tag);
                }
            }
            return arr;
        }
    },
    
    data() {
        return {
            //标签列表
            tagList: [
                { id:'1', tag:'vue' ,isSelect: false},
                { id:'2', tag:'vue' ,isSelect: false},
                { id:'3', tag:'vue' ,isSelect: false},
                { id:'4', tag:'vue' ,isSelect: false},
                { id:'5', tag:'vue' ,isSelect: false},
                { id:'6', tag:'vue' ,isSelect: false},
                { id:'7', tag:'vue' ,isSelect: false},
                { id:'8', tag:'vue' ,isSelect: false},
                { id:'9', tag:'vue' ,isSelect: false},
                { id:'10', tag:'vue' ,isSelect: false},
                { id:'11', tag:'vue' ,isSelect: false},
                { id:'12', tag:'vue' ,isSelect: false},
                { id:'13', tag:'vue' ,isSelect: false},
                { id:'14', tag:'vue' ,isSelect: false},
                { id:'15', tag:'vue' ,isSelect: false},
                { id:'16', tag:'vue' ,isSelect: false},
                { id:'17', tag:'vue' ,isSelect: false},
                { id:'18', tag:'vue' ,isSelect: false},
                { id:'19', tag:'vue' ,isSelect: false},
                { id:'20', tag:'vue' ,isSelect: false},
                { id:'21', tag:'vue' ,isSelect: false},
                { id:'22', tag:'vue' ,isSelect: false},
                { id:'23', tag:'vue' ,isSelect: false},
                { id:'24', tag:'vue' ,isSelect: false},
                { id:'25', tag:'vue' ,isSelect: false},
                { id:'26', tag:'vue' ,isSelect: false},
                { id:'27', tag:'vue' ,isSelect: false},
                { id:'28', tag:'vue' ,isSelect: false},
                { id:'29', tag:'vue' ,isSelect: false},
                { id:'30', tag:'vue' ,isSelect: false},
                { id:'31', tag:'vue' ,isSelect: false},
                { id:'32', tag:'vue' ,isSelect: false},
                { id:'33', tag:'vue' ,isSelect: false},
                { id:'34', tag:'vue' ,isSelect: false},
                { id:'35', tag:'vue' ,isSelect: false},
                { id:'36', tag:'vue' ,isSelect: false},
            ],
            //文章列表
            articleList:[],
            //最新篇文章
            newestArticle: {},
        }
    },
    methods: {
        changeSelect(item) {
            let id = item.id
            this.tagList.forEach(item => {
                if( id === item.id) {
                    item.isSelect = !item.isSelect;
                };
            });
        },
        //跳转文章内容
        toArticleContent(item) {
            let query = {
                id: item.id,
                name: item.name
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
            this.newestArticle = res.data[last];
        },


        // 绘制canvas  雨
        drawRain() {
            let can = document.getElementById("rain");
            // 浏览器宽高
            let { w, h } = getWindowWH();
            can.width = w;
            can.height = h;
            // 自动调整canvas宽高
            window.onresize = function() {
                w = window.innerWidth;
                h = window.innerHeight;
                can.width = w;
                can.height = h;
            };
            let canContent = can.getContext("2d");
            //创建雨
            drawRain(w,h,canContent);
        },

        // 获取鼠标位置 绘制鼠标移动效果
        getMouseXY(event) {
            if(this.$route.path !== "/home") {
                return;
            }
            let x = event.x;
            let y = event.y;
            let can = document.getElementById("rain");
            let canContent = can.getContext("2d");
            drawPointSpread(x,y,canContent);
        },
        // 设置表高度
        setTableHeight() {
            let height = window.innerHeight - 240;
            var table = document.getElementById('tableWrapper');
            table.style.maxHeight = height + 'px';
        }
    },
    mounted () {
        this.drawRain();
        this.setTableHeight();
        this.getFileListAll();
    }
}
</script>

<style scoped>
.home {
    height: 100%;
    display: flex;
    justify-content: space-between;
}
/*  主页左边栏  */
.page-left {
    width: 25%;
    text-align: left;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 5px 20px 5px 80px;
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
    justify-content: space-between;
    flex-wrap: wrap;
}

/* 主页内容栏 */
.page-right {
    width: 75%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 80px 5px 0;
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
    padding: 0 20px;
}
.article-new {
    font-size: 24px;
    text-align: left;
}

.article-tag {
    text-align: right;
}
.read-complete {
    margin-top: 15px;
}

.table-title {
    box-sizing: border-box;
    padding: 20px 0 5px 0;
    border-bottom: 1px solid rgb(194, 194, 194);
    margin-bottom: 10px;
}
.table-wrapper {
    box-sizing: border-box;
    padding: 0 20px;
    overflow: auto;
}
.article-list {
    margin: 5px 0;
}
</style>
