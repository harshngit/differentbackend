import { CLEAR_ERROR, CLEAR_ORDER, ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/orderConstants";

export const orderReducer = (state = {repairOrder:{} }, action) => {
    switch (action.type) {
     case ORDER_REQUEST:
       return {
         loading: true,
         isOrder: false,
       };
     case ORDER_SUCCESS:
       return {
         ...state,
        loading: false,
         isOrder: false,
         repairOrder: action.payload,
       };
     
     case ORDER_FAIL:
       return {
         ...state,
        loading: false,
         isOrder: false,
         repairOrder: null,
         error: action.payload,
       };
       case CLEAR_ORDER:
         return {
             repairOrder:{}
         }
    
     case CLEAR_ERROR:
       return {
         ...state,
         error: null,
       };
 
     default:
       return state;
   }
 }