import axios from '../assets/libs/axiosConfig'

// 上传文件
export const uploadFile = (params) => {
    return axios.request({
        method: 'post',
        url: '/api/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 获取文章列表
export const getFileList = () => {
    return axios.request({
        method: 'post',
        url: '/api/file/list',
    });
}

// 获取文章内容
export const getFileContent = (params) => {
    return axios.request({
        method: 'post',
        url: '/api/file/content',
        data: params
    });
}