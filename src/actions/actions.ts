import { TypeOneSushiServer, TypeRequestService } from "../types";

export const toggleCurrentCategory = (newCategory: string) => {
  return {
    type: 'TOGGLE_CURRENT_CATEGORY',
    payload: newCategory,
  }
};

export const sushiListLoaded = (newSushiList: Array<TypeOneSushiServer>) => {
  return {
    type: 'SUSHI_LIST_LOADED',
    payload: newSushiList,
  }
};

export const toggleSortingActivePopup = (newStatePopup: boolean) => {
  return {
    type: 'SORTING_ACTIVE_POPUP',
    payload: newStatePopup,
  }
};

export const toggleCurrentSorting = (newSorting: string) => {
  return {
    type: 'CURRENT_SORTING',
    payload: newSorting,
  }
};

export const fetchSushi = (sushiShopService: TypeRequestService, dispatch: any) => () => {
  sushiShopService.getData()
    .then((data: Array<TypeOneSushiServer>) => dispatch(sushiListLoaded(data)));
};

export const sushiAddedToCart = (id: number) => {
  return {
    type: 'SUSHI_ADDED_TO_CART',
    payload: id,
  }
};

export const sushiRemoveFromCart = (id: number) => {
  return {
    type: 'SUSHI_REMOVE_FROM_CART',
    payload: id,
  }
};

export const allSushiRemoveFromCart = (id: number) => {
  return {
    type: 'ALL_SUSHI_REMOVE_FROM_CART',
    payload: id,
  }
};

export const toggleMobileActiveMenu = (currentState: boolean) => {
  return {
    type: 'TOGGLE_MOBILE_ACTIVE_MENU',
    payload: currentState
  }
};
