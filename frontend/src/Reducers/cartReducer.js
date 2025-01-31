import {
  ADD_SHIPPING_INFO,
  ADD_TO_CART_SUCCESS,
  ALL_PRODUCTS_SUCCESS,
  GET_ALL_CART_ITEMS_FAIL,
  GET_ALL_CART_ITEMS_PROCESS,
  GET_ALL_CART_ITEMS_SUCCESS,
  REMOVE_TO_CART_SUCCESS,
} from "../Constants/productConstants";

export const addToCartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const isExistItem = state.cartItems.find((i) => {
        return i._id === item._id;
      });
      if (isExistItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => {
            return i._id === isExistItem._id ? item : i;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case GET_ALL_CART_ITEMS_PROCESS:
      return {
        ...state,
        cartItems: [],
      };
    case GET_ALL_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case GET_ALL_CART_ITEMS_FAIL:
      return {
        ...state,
        cartItems: [],
      };
    case REMOVE_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i._id !== action.payload),
      };
    case ADD_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
