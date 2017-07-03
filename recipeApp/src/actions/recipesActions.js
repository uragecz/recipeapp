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
    return function(dispatch){
        dispatch({type: "FETCH_RECIPES"})
        axios.get(URL, config)
            .then((response) => {
                console.log("RECIPES FETCHED")
                dispatch({type: "FETCH_RECIPES_FULFILLED", payload: response.data})
            })
            .catch((err) => {
            dispatch({type: "FETCH_RECIPES_REJECTED", payload: err})
            dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
        }
}

export function addRecipe(recipe){
    console.log('addRecipe',recipe);
    return function(dispatch){
        return axios.post(URL , recipe, config)
            .then((response) => {
                console.log('RECIPE ADDED')
                return dispatch({type: "ADD_RECIPE", payload: recipe})
            })
            .catch((err) => {
                dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}

export function thumbUp(id){
    console.log('thumpUp')
    return function(dispatch){
        return axios.post(URL + id  + '/like', config)
            .then((response) => {
                console.log('THUMBED UP')
                return dispatch({type: "THUMB_UP", payload: id})
            })
             .catch((err) => {
                dispatch({type: "PRINT_ERROR",  payload: "Cannot contact server"})
            })
    }
}

export function thumbDown(id){
    console.log('thumpDown')
    return function(dispatch){
        return axios.delete(URL + id  + '/like', config)
            .then((response) => {
                console.log('THUMBED DOWN')
                return dispatch({type: "THUMB_DOWN", payload: id})
            })
             .catch((err) => {
                dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}

export function updateRecipe(recipe,liked){
     return function(dispatch){
        return axios.post(URL+recipe.id , recipe, config)
            .then((response) => {
                console.log('RECIPE UPDATED')
                return dispatch({type: "UPDATE_RECIPE", payload: recipe})
            })
             .catch((err) => {
                dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}

export function removeRecipe(id,liked){
    console.log('removeRecipr',id);
    return function(dispatch){
        return axios.delete(URL + id , config)
            .then((response) => {
                console.log('RECIPE REMOVED')
               return dispatch({type: "REMOVE_RECIPE", payload: id})
            })
             .catch((err) => {
                dispatch({type: "PRINT_ERROR", payload: "Cannot contact server"})
            })
    }
}