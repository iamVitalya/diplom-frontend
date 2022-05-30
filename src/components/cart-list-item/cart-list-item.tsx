import React from "react";

import './cart-list-item.scss';

export type TypeCartListItemProps = {
  buyAmount: number
  currency: number | string
  imageUrl: string
  name: string
  totalPrice: number
  composition: Array<string | null | undefined>
  onIncrement(): void
  onDecrement(): void
  onDelete(): void
}

const CartListItem: React.FC<TypeCartListItemProps> = (
  { buyAmount, currency, imageUrl, name, totalPrice, composition,
    onIncrement, onDecrement, onDelete }: TypeCartListItemProps) => {

  const checkComposition = composition
    ? <span className="cart-list-item__composition">{composition.join(", ")}</span>
    : null

  return (
    <div className="cart-list-item">
      <div className="cart-list-item__information">
        <img src={imageUrl} alt="logo" className="cart-list-item__image" />
        <div className="cart-list-item__description">
          <h5 className='cart-list-item__title'>{name}</h5>
          {checkComposition}
        </div>
      </div>

      <div className="cart-list-item__detailed">
        <div className="cart-list-item__counter">
          <button
            onClick={onDecrement}
            className='button cart-list-item__button cart-list-item__button--minus' />
          <span className="cart-list-item__amount">{buyAmount}</span>
          <button
            onClick={onIncrement}
            className='button cart-list-item__button cart-list-item__button--plus' />
        </div>

        <span className="cart-list-item__price">{totalPrice} {currency}</span>
        <button
          onClick={onDelete}
          className="button cart-list-item__button cart-list-item__button--delete" />
      </div>
    </div>
  );
};

export default CartListItem;