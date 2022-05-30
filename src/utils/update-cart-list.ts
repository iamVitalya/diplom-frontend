import { TypeOneItemInCart, TypeOneSushiServer } from "../types";

export const updateCartList = (cartList: Array<TypeOneSushiServer>, cartItem: TypeOneItemInCart, index: number) => {
  // Если купленное колличество - это ноль, удалить элемент из массива
  if (cartItem.buyAmount === 0) {
    return [
      ...cartList.slice(0, index),
      ...cartList.slice(index + 1),
    ]
  }

  // Если такого элемента в массиве нет,
  // то скопировать предыдущие значений и добавить новое
  if (index === -1) {
    return [
      ...cartList,
      cartItem
    ]
  }

  // Если такой элемент уже есть, значит
  // скопировать элемены, идущие перед ним,
  // положить этот элемент
  // скопировать все элементы, идущие после него
  return [
    ...cartList.slice(0, index),
    cartItem,
    ...cartList.slice(index + 1),
  ]
};