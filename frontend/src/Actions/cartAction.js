import axios from "axios";
import {
  ADD_SHIPPING_INFO,
  ADD_TO_CART_SUCCESS,
  GET_ALL_CART_ITEMS_SUCCESS,
  REMOVE_TO_CART_SUCCESS,
} from "../Constants/productConstants";

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: {
      _id: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  const getUserId = getState().userLoginRegister?.user?._id;
  const cartItems = getState().cart.cartItems;

  await axios.post(`/api/v1/cart/create/${getUserId}`, {
    userId: getUserId,
    cartItems: cartItems,
  });
};
export const getAllCartItems = () => async (dispatch) => {
  const { data } = await axios.get(`/api/v1/cart/cartItems`);
  console.log(data);
  dispatch({
    type: GET_ALL_CART_ITEMS_SUCCESS,
    payload: data?.cartItems?.cartItems,
  });
};
export const removeToCartAction = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: REMOVE_TO_CART_SUCCESS,
    payload: data.product._id,
  });
  const getUserId = getState().userLoginRegister?.user?._id;
  const cartItems = getState().cart.cartItems;
  await axios.post(`/api/v1/cart/create/${getUserId}`, {
    userId: getUserId,
    cartItems: cartItems,
  });
};
export const shippingInfoAction = (data) => async (dispatch) => {
  dispatch({
    type: ADD_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
