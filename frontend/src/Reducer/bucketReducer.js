export default function reducer(state={
    getAllBucketData: {},
    createBucketData: {},
    updateBucketData: {}
}, action) {
    switch(action.type) {
        case "GET_ALL_BUCKET":
            return {...state, getAllBucketData: action.payload }
        case "CREATE_BUCKET": 
            return {...state, createBucketData: action.payload}
        case "UPDATE_BUCKET": 
            return {...state, updateBucketData: action.payload}
        default : {}
    }

    return state;
}