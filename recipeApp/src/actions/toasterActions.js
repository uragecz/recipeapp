export function printError(message){
    return{
        type: "PRINT_ERROR",
        payload: message
    }
}

export function hideError(){
    return{
        type: "HIDE_ERROR",
        payload: false
    }
}