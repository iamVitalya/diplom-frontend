import React from "react";
import CartListItem from "../cart-list-item";
import { useHistory } from 'react-router-dom';

import { sushiAddedToCart, allSushiRemoveFromCart, sushiRemoveFromCart } from "../../actions";
import { TypeOneItemInCart } from "../../types";
import { connect } from "react-redux";

import './cart-list.scss';

type TypeCartListProps = {
  cartList: Array<TypeOneItemInCart>
  fullOrderPrice: number
  onIncrement(id: number): void
  onDecrement(id: number): void
  onDelete(id: number): void
}

const CompletedShoppingCartItems: React.FC<TypeCartListProps> = ({cartList, onIncrement, fullOrderPrice, onDecrement, onDelete}: TypeCartListProps) => {
  const history = useHistory()

  const templateCartItem = cartList.map((cart: TypeOneItemInCart) => {
    return (
      <li key={cart.id}>
        <CartListItem
          {...cart}
          onIncrement={() => onIncrement(cart.id)}
          onDecrement={() => onDecrement(cart.id)}
          onDelete={() => onDelete(cart.id)} />
      </li>
    )
  });

  return (
    <React.Fragment>
      <h3 className="cart-list__title">Корзина</h3>

      <ul className="cart-list-content cart-list-items">
        {templateCartItem}
      </ul>

      <div className="cart-list-bottom">
        <button className="cart-list__button cart-list__back" onClick={() => history.goBack()}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 6.93015L6.86175 1" stroke="#919191" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
          </svg>
          <span>Вернуться назад</span>
        </button>

        <div className="cart-list__order">
          <h6 className="cart-list__price">
            <span className="cart-list__price--title">Сумма заказа: </span>
            <span className="cart-list__price--subtitle">{fullOrderPrice} ₽</span>
          </h6>

          <button className="cart-list__button cart-list__buy">Оплатить сейчас</button>
        </div>
      </div>
    </React.Fragment>
  )
}

const UncompletedShoppingCartItems: React.FC = () => {
  const history = useHistory()

  return (
    <div className="cart-list-uncompleted">
      <h4 className="cart-list-uncompleted__title">Корзина пуста!</h4>
      <p className="cart-list-uncompleted__description">
        Вероятней всего, вы ничего не заказали. <br/>
        Для того, чтобы это сделать, перейдите на главную страницу.
      </p>
      <div className="cart-list-uncompleted__detailed">
        <button className="button cart-list-uncompleted__button" onClick={() => history.goBack()}>
          Вернуться назад
        </button>
      </div>
    </div>
  );
}

const CartList: React.FC<TypeCartListProps> = (props: TypeCartListProps) => {
  const content = props.cartList.length ? <CompletedShoppingCartItems {...props} /> : null;
  const cartEmpty = !content ? <UncompletedShoppingCartItems /> : null;

  return (
    <div className="cart-list">
      {content}
      {cartEmpty}
    </div>
  );
};


type MapStateToPropsType = {
  shoppingCart: {
    cartList: Array<TypeOneItemInCart>
    fullOrderPrice: number
  }
}

const mapStateToProps = ({shoppingCart: {cartList, fullOrderPrice}}: MapStateToPropsType) => {
  return {cartList, fullOrderPrice};
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrement: (id: number) => dispatch(sushiAddedToCart(id)),
    onDecrement: (id: number) => dispatch(sushiRemoveFromCart(id)),
    onDelete: (id: number) => dispatch(allSushiRemoveFromCart(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);