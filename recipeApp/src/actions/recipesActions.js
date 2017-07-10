import axios from 'axios'

const URL = "http://localhost:3000/api/recipes/";

const config = {
  headers: {
    'Accept': 'application/json', 
    'Access-Control-Allow-Origin':'*', 
     },
     'timeout': 3000
};

export function fetchRecipes(){
    return dispatch => {
        dispatch({type: "FETCH_RECIPES"})
        return axios.get(URL, config)
            .then((response) => {
                return dispatch({type: "FETCH_RECIPES_FULFILLED", payload: response.data})
            })
            .catch((err) => {
            dispatch({type: "FETCH_RECIPES_REJECTED", payload: err})
            dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
        }
}

export function addRecipe(recipe){
    return dispatch => {
        return axios.post(URL , recipe, config)
            .then((response) => {
                return dispatch({type: "ADD_RECIPE", payload: recipe})
            })
            .catch((err) => {
                return dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}

export function thumbUp(id){
    return dispatch => {
        return axios.post(URL + id  + '/like', config)
            .then((response) => {
                return dispatch({type: "THUMB_UP", payload: id})
            })
             .catch((err) => {
                return dispatch({type: "PRINT_ERROR",  payload: "Cannot contact server"})
            })
    }
}

export function thumbDown(id){
    return dispatch => {
        return axios.delete(URL + id  + '/like', config)
            .then((response) => {
                return dispatch({type: "THUMB_DOWN", payload: id})
            })
             .catch((err) => {
                return dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}

export function updateRecipe(recipe,liked){
     return dispatch => {
        return axios.post(URL+recipe.id , recipe, config)
            .then((response) => {
                return dispatch({type: "UPDATE_RECIPE", payload: recipe})
            })
             .catch((err) => {
                return dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}

export function removeRecipe(id,liked){
    return dispatch => {
        return axios.delete(URL + id , config)
            .then((response) => {
               return dispatch({type: "REMOVE_RECIPE", payload: id})
            })
             .catch((err) => {
                return dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}