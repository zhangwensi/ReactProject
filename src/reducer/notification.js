// 引入异步操作的类型
import actionTypes from '../actions/actionTypes.js'

// 初始化信息中心的通知状态
const initState = {
    isLoading: false,
    list: [
        {
            id: 1,
            title: '这是第一个标题',
            desc: '这个是第一个标题的描述',
            hasRead: true
        },
        {
            id: 2,
            title: '这是第二个标题',
            desc: '这个是第二个标题的描述',
            hasRead: false
        },
        {
            id: 3,
            title: '这是第三个标题',
            desc: '这个是第三个标题的描述',
            hasRead: false
        }
    ]
}


export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FINSH_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.GET_INFOS_FROM_BACK:
            return {
                ...state,
                list: action.payload.list
            }
        case actionTypes.MARK_HAS_READ_BY_ID:
            //  找出传入的id对应数组  改变其hasRead的状态
            const newList = state.list.map(item => {
                if (item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list: newList
            }
            case actionTypes.MARK_ALL_HAS_READ_BY_ID:
                //  改变全部list中的hasRead的状态
                const newList1 = state.list.map(item => {
                    item.hasRead = true
                    return item
                })
                return {
                    ...state,
                    list: newList1
                }
        default:
            return state
    }
}