// 初始化信息中心的通知状态
const initState = {
    list: [
        {
            id:1,
            title:'这是第一个标题',
            desc:'这个是第一个标题的描述',
            hasRead: true
        },
        {
            id:2,
            title:'这是第二个标题',
            desc:'这个是第二个标题的描述',
            hasRead: false
        },
        {
            id:3,
            title:'这是第三个标题',
            desc:'这个是第三个标题的描述',
            hasRead: false
        }
    ]
}


export default (state =initState,action) =>{
    switch (action.type) {
        default :
            return  state
    }
}