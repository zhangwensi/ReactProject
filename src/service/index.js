const axios = require('axios')

// 创建应用
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/251308' : ''
})

// 拦截器

service.interceptors.request.use((config) => {
    // 配置
    config.data = Object.assign({}, config.data, {
        // authToken : window.localStorage.getItem('authToken')
        authToken : 'ddddddasdsa'
    })
    return config
})

service.interceptors.response.use((resp) => {
    if(resp.status === 200) {
        return resp.data
    }
})


export const getList = () => {
    return service.post('/api/aritcle/aritcleList')
}