import { TypeOneItemInCart, TypeOneSushiServer } from "../types";
import { updateCartItem } from "./update-cart-item";
import { updateCartList } from "./update-cart-list";
import { ReturnUpdateShoppingCartType } from "../reducer/update-shopping-cart";

const calculateTheCost = (list: Array<TypeOneSushiServer | TypeOneItemInCart>, counter: string) => {
  return list.reduce((acc: number, prevState: any) => {
    return acc + prevState[counter]
  }, 0);
}

export const updateOrderCart = (state: any, sushiId: number, quantity: number): ReturnUpdateShoppingCartType => {
  const { arrays: { sushiList }, shoppingCart: { cartList }  } = state;

  const sushi: any = sushiList.find((item: TypeOneSushiServer) => item.id === sushiId);
  const indexSushiItem: number = cartList.findIndex(({ id }: TypeOneItemInCart) => id === sushiId);
  const addSushiItem: TypeOneItemInCart = cartList[indexSushiItem];

  const sushiItem = updateCartItem(sushi, addSushiItem, quantity);
  const allSushiList = updateCartList(cartList, sushiItem, indexSushiItem);

  return {
    fullOrderAmount: calculateTheCost(allSushiList, 'buyAmount'),
    fullOrderPrice: calculateTheCost(allSushiList, 'totalPrice'),
    cartList: allSushiList
  }
}
