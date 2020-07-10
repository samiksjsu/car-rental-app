// ADD_EXPENSE
export const addUser = ({ userId = '', email = '', name = '', loggedIn = false } = {}) => {
    return {
        type: 'ADD_USER',
        data: {
            userId,
            email,
            name,
            loggedIn
        }
    }
}

export const removeUser = ({ userId = '', email = '', name = '', loggedIn = false } = {}) => {
    return {
        type: 'REMOVE_USER',
        data: {
            userId,
            email,
            name,
            loggedIn
        }
    }
}

