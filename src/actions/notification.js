import actionTypes from './actionTypes.js'

// 单个标记已读
export const markHasReadById = (id) =>{
    return dispatch => {
        // 此处实际项目中应请求后端接口
        dispatch({
            type:actionTypes.MARK_HAS_READ_BY_ID,
            // 将id传递给reducer中
            payload: {
                id
            }
        })
    }
}

// 全部标记已读
export const markAllHasReadById = () => {
    return dispatch => {
        dispatch({
            type:actionTypes.MARK_ALL_HAS_READ_BY_ID,
        })
    }
}