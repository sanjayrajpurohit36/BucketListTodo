import axios from 'axios';

export function getAllBucketAction(data) {
    return function(dispatch) {
        axios.get("http://localhost:3001/api/bucket", {
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
        axios.post("http://localhost:3001/api/bucket", bucketName, {
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
        axios.put("http://localhost:3001/api/bucket", data, {
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