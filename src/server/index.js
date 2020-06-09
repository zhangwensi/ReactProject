const axios = require('axios')

const isDev = process.env.NODE_ENV === 'development'

// 创建请求实例
const server = axios.create({
    baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/251308':'',
    timeout: 1000
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