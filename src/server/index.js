const axios = require('axios')

const isDev = process.env.NODE_ENV === 'development'

// 创建请求实例
const server = axios.create({
    baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/251308':'',
    timeout: 1000
  })

// 创建登录实例
const service1 = axios.create({
    baseURL: isDev? 'http://rap2.taobao.org:38080/app/mock/251308':'',
    timeout:100000
})

// 拦截器
server.interceptors.request.use((config)=>{
    config.data = Object.assign({},config.data,{
        authToken:'dasdsadsadsa'
    })
    return config
})


server.interceptors.response.use((response)=>{
    if(response.status === 200) {
        return response.data
    }
},(error)=>{
    return Promise.reject(error)
})

// 请求实例
export const getArtlist  = (offset,limited)=>{
    return server.post('/api/aritcle/aritcleList',{offset,limited})
}


// 此处可以考虑传参是隐式传参还是显示传参params
export const deletArticle = (id) => {
    return server.post(`api/aritcle/delet/${id}`)
}

// 求取后台信息中心接口获取未标记数据

export const getInfoMarkTag = () => {
    return server.post('api/selfInfo/markInfo')
}

// 用户登录接口

export const userLogin = (userInfo) => {
    return service1.post('api/userLogin',{username:userInfo.username,password:userInfo.password})
}

