import actionTypes from './actionTypes'

import { userLogin } from '../server/index'

const startLogin = () => {
    return {
        type:actionTypes.START_LOGIN
    }
}

const loginSuccess =(userReqInfo) =>{
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo:userReqInfo
        }
    }
}

const loginFaile = () => {
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.sessionStorage.removeItem('userInfo')  
    window.sessionStorage.removeItem('userInfo') 
    return {
        type: actionTypes.LOGIN_FAILE
    }
}

export const logout = () =>{ 
    return dispatch => {
        dispatch(loginFaile())
    }
}

export const loginUser = (userReq)=>{
    console.log('dddd')
    return dispatch=>{
        dispatch(startLogin())
        userLogin(userReq).then(resp=>{
            console.log(resp)
            if(resp.data.code ==="200" ) {
                // 将返回的authToken存储在本地  根据remindme  不同 存不同的本地存储
                if (userReq.remember) {
                    window.localStorage.setItem('authToken',resp.data.data.authToken)
                    window.localStorage.setItem('userInfo',JSON.stringify(resp.data.data))
                } else {
                    window.sessionStorage.setItem('authToken',resp.data.data.authToken)
                    window.sessionStorage.setItem('userInfo',JSON.stringify(resp.data.data))
                }
                dispatch(loginSuccess(resp.data.data))
            }else {
                dispatch(loginFaile())
            }
        }).catch(err=>{
            console.log(err)
        })
    }
}