import { SiAxios } from "react-icons/si";
import { NEW_SHIPPING_TOKEN_FAIL, NEW_SHIPPING_TOKEN_REQUEST, NEW_SHIPPING_TOKEN_SUCCESS } from "../constants/shippingConstants";
import axios from "axios"


export const generateToken = () => async (dispatch) => {
    try{
      dispatch({ type: NEW_SHIPPING_TOKEN_REQUEST});
      var data = JSON.stringify({
    "username": "GRCEXPRESSB2BC",
    "password": "Grclog@2024"
  });
  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: 'https://btob.api.delhivery.com/ums/login/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    console.log("Hii")
    dispatch({ type: NEW_SHIPPING_TOKEN_SUCCESS, payload:response.data });
  })
  .catch(function (error) {
    alert("Error:"+ error.message)
    dispatch({
        type: NEW_SHIPPING_TOKEN_FAIL,
        payload: error.message,
      });
  })
    } catch(err){
       dispatch({
        type: NEW_SHIPPING_TOKEN_FAIL,
        payload: err.message,
      });
    }
  }