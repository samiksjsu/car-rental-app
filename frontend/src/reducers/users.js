const usersReducerDefaultState = {}

export default (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.data

        case 'REMOVE_USER':
            return action.data

        default:
            return state;
    }
}