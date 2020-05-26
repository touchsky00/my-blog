import axios from '../assets/libs/axiosConfig'

// 上传文件
export const uploadFile = (params) => {
    return axios.request({
        method: 'post',
        url: '/api/upload',
        data: params,
    });
}

// 获取文章列表
export const getFileList = () => {
    return axios.request({
        method: 'post',
        url: '/api/file/list',
    });
};

// 获取文章内容
export const getFileContent = (params) => {
    return axios.request({
        method: 'post',
        url: '/api/file/content',
        data: params
    });
};

// 提交评论
export const submitComment = (params) => {
    return axios.request({
        method:'post',
        url:'/api/file/comment',
        data: params
    });
};

//获取评论列表
export const getCommentList = (params) => {
    return axios.request({
        method:'post',
        url: '/api/file/comment/list',
        data: params
    });
};


export const getTagList = () => {
    return axios.request({
        method:'post',
        url:'/api/file/tag/list',
    });
};

//获取搜索词文章
export const getSearchArticle = (params) => {
    return axios.request({
        method:'post',
        url:'/api/article/search',
        data: params
    });
};


//登录账号
export const login = (params) => {
    return axios.request({
        method:'post',
        url:'/api/login',
        data: params
    })
}