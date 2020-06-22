import actionTypes from './actionTypes.js'

import { getInfoMarkTag } from '../server/index'

// 获取后端信息中心数据

const startLoading = () => {
    return {
        type:actionTypes.START_LOADING
    }
}

const finshLoading = () => {
    return {
        type:actionTypes.FINSH_LOADING
    }
}

export const getInfoFromBack = () => {
    return dispatch => {
        // 向后端发送请求
        dispatch(startLoading())
        getInfoMarkTag().then(resp=>{
            const list  = resp.data.list
            if(resp.code === '200') {
                dispatch({
                    type:actionTypes.GET_INFOS_FROM_BACK,
                    payload: {
                        list
                    }
                })
            }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            dispatch(finshLoading())
        })
    }
}

// 单个标记已读
export const markHasReadById = (id) =>{
    return dispatch => {
        dispatch(startLoading())
        // 此处实际项目中应请求后端接口
        dispatch({
            type:actionTypes.MARK_HAS_READ_BY_ID,
            // 将id传递给reducer中
            payload: {
                id
            }
        })
        dispatch(finshLoading())
    }
}

// 全部标记已读
export const markAllHasReadById = () => {
    return dispatch => {
        dispatch(startLoading())
        dispatch({
            type:actionTypes.MARK_ALL_HAS_READ_BY_ID,
        })
        dispatch(finshLoading())
    }
}