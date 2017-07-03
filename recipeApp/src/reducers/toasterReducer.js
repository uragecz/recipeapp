export default function reducer(state={
    error: false,
    message: ""
}, action) {
    switch (action.type){
        case "PRINT_ERROR":{
            console.log('printError', action.payload)
            return{...state, message: action.payload, error: true}
        }
        case "HIDE_ERROR":{
            return{...state, error: false}
        }
        default:{
            break;
        }
    }
    return state;
}