import axios from 'axios';

export function getAllBucketAction(data) {
    return function(dispatch) {
        axios.get("/api/bucket", {
            headers: {
                    'x-access-token': data
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "GET_ALL_BUCKET",
                    payload: response.data
                }
            )
         })
    }
}

export function createBucketAction(bucketName, token) {
    return function(dispatch) {
        axios.post("/api/bucket", bucketName, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "CREATE_BUCKET",
                    payload: response.data
                }
            )
         })
    }
}

export function editBucketAction(data, token) {
    return function(dispatch) {
        axios.put("/api/bucket", data, {
            headers: {
                    'x-access-token': token
            }
        })
        .then((response) => {
            dispatch(
                {
                    type: "UPDATE_BUCKET",
                    payload: response.data
                }
            )
         })
    }
}