export default function reducer(state={
    recipes: {},
    fetching: false,
    fetched: false,
    error: null,
    version: 0
}, action) {
    switch (action.type){
        case "FETCH_RECIPES":{
            console.log('fething');
            return {...state, fetching: true}
        }
        case "FETCH_RECIPES_REJECTED":{
            console.log('err');
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_RECIPES_FULFILLED":{
            console.log('done');
            return {
                ...state,
                fetching: false,
                fetched: true,
                recipes: action.payload
            }
        }
        case "ADD_RECIPE":{
            return {
                ...state,
                recipes: [...state.recipes, action.payload ]
            }
        }
         case "UPDATE_RECIPE":{
             console.log('UPDATE_RECIPE',action.payload);
            return {
                ...state,
                recipes: state.recipes.map(r => r.id == action.payload.id ? action.payload : r)
            }
        }
        case "REMOVE_RECIPE":{
            return {
                ...state,
                recipes: state.recipes.filter(r => r.id != action.payload)
            }
        }
        case "ADD_RECIPE":{
            return {
                ...state,
                recipes: [...state.recipes, action.payload ]
            }
        }
        case "THUMB_UP":{
            return {
                ...state,
                recipes: state.recipes.map(r => r.id == action.payload ? {...r, liked: 1, likesCount : r.likesCount +1} : r)
            }
        }
         case "THUMB_DOWN":{
            return {
                ...state,
                recipes: state.recipes.map(r => r.id == action.payload ? {...r, liked: 0,  likesCount : r.likesCount - 1} : r)
            }
        }

        default:
            break;
    }
    return state;
}