import React, { useEffect } from "react";
import { withSushiShopService } from "../HOC";
import { TypeOneItemInCart, TypeOneSushiServer } from "../../types";
import { connect } from "react-redux";
import SushiListItem from "../sushi-list-item";
import { compose, filterCategorySushi, sortingSushi } from "../../utils";
import { fetchSushi } from "../../actions";
import { sushiAddedToCart } from "../../actions/actions";

import './sushi-list.scss';

const SushiList: React.FC = ({sushiList, cartList, currentCategory, currentSorting, onAddedToCart, getFetchSushi}: any) => {

  useEffect(() => { getFetchSushi() }, [getFetchSushi]);

  const currentSushiList = sortingSushi(filterCategorySushi(sushiList, currentCategory), currentSorting);

  const templateSushiItem = currentSushiList.map((roll: TypeOneSushiServer) => {
    const checkCart = cartList.find((item: any) => item.id === roll.id);

    return (
      <SushiListItem
        key={roll.id}
        {...roll}
        countInCart={checkCart && checkCart.buyAmount}
        onAddedToCart={() => onAddedToCart(roll.id)} />
    )
  });

  return <ul className="sushi-list">{templateSushiItem}</ul>
};

type TypeSushiListMapToProps = {
  arrays: { sushiList: Array<TypeOneSushiServer> }
  currentState: {
    currentCategory: string
    currentSorting: string
  }
  shoppingCart: {
    cartList: Array<TypeOneItemInCart>
  }
}

const mapStateToProps = (
  {
    arrays: {sushiList},
    currentState: {currentCategory, currentSorting},
    shoppingCart: {cartList}

  }: TypeSushiListMapToProps) => ({sushiList, currentCategory, currentSorting, cartList})


const mapDispatchToProps = (dispatch: any, {sushiShopService}: any) => {
  return {
    getFetchSushi: () => fetchSushi(sushiShopService, dispatch)(),
    onAddedToCart: (id: number) => dispatch(sushiAddedToCart(id))
  }
}

export default compose(
  withSushiShopService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SushiList);
