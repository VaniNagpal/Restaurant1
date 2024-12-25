

const initialState = {
    name: '',
    email: '',
    username: "",
    image: '',
    orderHistory: [],
    cart: [],
    isLoggedIn: false
};

function userReducer(state = { initialState }, action) {


    console.log('Action:', action);
    console.log('State before:', state);

    
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,

                username: action.payload.username,
                image: action.payload.image,
                orderHistory: action.payload.orderHistory,
                cart: action.payload.cart,
                isLoggedIn: true
            }
        case 'GET_USER':
            return state;
         case 'LOG_IN':
            return{
            ...state,
            isLoggedIn:true
            }  
         case 'LOG_OUT':
                return initialState;
        default:
            return state;
    }

}

export default userReducer;
