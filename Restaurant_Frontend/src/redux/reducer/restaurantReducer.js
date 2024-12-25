const initialState = []; // Initialize with an empty array

function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_RESTAURANTS':
            return action.payload; // Update the state with the payload
        case 'GET_RESTAURANTS':
            return state; // Return the current state (no change)
        default:
            return state; // Return the current state for unknown actions
    }
}

export default restaurantReducer;