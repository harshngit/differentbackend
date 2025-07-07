import { NEW_SHIPPING_TOKEN_FAIL, NEW_SHIPPING_TOKEN_REQUEST, NEW_SHIPPING_TOKEN_SUCCESS } from "../constants/shippingConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

export const shippingTokenReducer = (state = { shippingToken:{} }, action) => {
    switch (action.type) {
    
      case NEW_SHIPPING_TOKEN_REQUEST:
       return {
         loading: true,
         isShippingToken: false,
       };
        case NEW_SHIPPING_TOKEN_SUCCESS:
       return {
         loading: false,
         isShippingToken: true,
         shippingToken:action.payload
       };
        case NEW_SHIPPING_TOKEN_FAIL:
       return {
         loading: false,
         isShippingToken: false,
         errror:true,
         shippingToken:null
       };
    
      
     case CLEAR_ERRORS:
       return {
         ...state,
         error: null,
       };
 
     default:
       return state;
   }
 }