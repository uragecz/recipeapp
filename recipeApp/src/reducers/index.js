import { combineReducers } from 'redux'

import recipes from './recipesReducer'
import toaster from './toasterReducer'

export default combineReducers({
    recipes,
    toaster
})