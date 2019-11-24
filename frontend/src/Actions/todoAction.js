import axios from 'axios';

export function getAllTaskAction(id,token) {
    return function(dispatch) {
        axios.get("/api/todo/"+id, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "GET_ALL_TASK",
                    payload: response.data
                }
            )
         })
    }
}

export function createTaskAction(data, token) {
    return function(dispatch) {
        axios.post("/api/todo", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "CREATE_TASK",
                    payload: response.data
                }
            )
         })
    }
}

export function editTaskAction(data, token) {
    return function(dispatch) {
        axios.put("/api/todo", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "UPDATE_TASK",
                    payload: response.data
                }
            )
         })
    }
}

export function deleteTaskAction(data, token) {
    return function(dispatch) {
        axios.post("/api/todo/delete", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "DELETE_TASK",
                    payload: response.data
                }
            )
         })
    }
}


