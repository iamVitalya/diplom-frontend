import updateDataInArrays from "./update-data-in-arrays";
import updateCurrentStateList from './update-current-state-list';
import updateShoppingCart from "./update-shopping-cart";

const reduces = (state: any, actions: any) => {
  return {
    arrays: updateDataInArrays(state, actions),
    currentState: updateCurrentStateList(state, actions),
    shoppingCart: updateShoppingCart(state, actions),
  }
}

export default reduces;
