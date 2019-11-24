import axios from 'axios';


export function createUserAction(data) {
    return function(dispatch) {
        axios.post("/api/signup", data)
        .then((response) => {
            dispatch(
                {
                    type: "USER_DATA",
                    payload: response.data
                }
            )
         })
    }
}

export function loginUserAction(data) {
    return function (dispatch) {
        axios.post("/api/login", data)
        .then((response) => {
            dispatch({
                type: "USER_DATA",
                payload: response.data
            })
        })
    }
}

export function logoutUserAction(email, token) {
    return function(dispatch) {
        axios.post("/api/logout", email, {
            headers: {
                'x-access-token': token
            }
        }) 
        .then((response) => {
            dispatch({
                type: 'USER_LOGOUT',
                payload: response.data
            })
        })
    }
}