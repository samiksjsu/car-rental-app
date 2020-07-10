import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import usersReducer from '../reducers/users'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            users: usersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )

    return store
}