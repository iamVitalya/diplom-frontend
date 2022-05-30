import { updateOrderCart } from "../utils";
import { TypeOneItemInCart, TypeOneSushiServer } from "../types";

type GetUpdateShoppingCartType = {
  shoppingCart: {
    cartList: Array<TypeOneItemInCart>,
    fullOrderPrice: number,
    fullOrderAmount: number,
  };
}

export type ReturnUpdateShoppingCartType = {
  cartList: Array<TypeOneSushiServer | TypeOneItemInCart>,
  fullOrderPrice: number,
  fullOrderAmount: number,
}

const updateShoppingCart = (state: GetUpdateShoppingCartType, actions: any): ReturnUpdateShoppingCartType => {
  if (state === undefined) {
    return {
      cartList: [],
      fullOrderPrice: 0,
      fullOrderAmount: 0,
    }
  }

  switch (actions.type) {
    case "SUSHI_ADDED_TO_CART":
      return updateOrderCart(state, actions.payload, 1) as ReturnUpdateShoppingCartType;
    case "SUSHI_REMOVE_FROM_CART":
      return updateOrderCart(state, actions.payload, -1) as ReturnUpdateShoppingCartType;
    case "ALL_SUSHI_REMOVE_FROM_CART":
      const { buyAmount }: any = state.shoppingCart.cartList.find(({ id }: any) => id === actions.payload);
      return updateOrderCart(state, actions.payload, -buyAmount) as ReturnUpdateShoppingCartType;

    default:
      return state.shoppingCart
  }
}

export default updateShoppingCart;