import React, { Fragment } from 'react';
import axios from 'axios';

import styles from './Drawer.module.scss';
import Info from '../info';
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onCloseCart, items, onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://612a676522bb490017893936.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      //the functionality mock.api does not allow you not to write this crutch
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://612a676522bb490017893936.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div
      onClick={onCloseCart}
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div onClick={(e) => e.stopPropagation()} className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onCloseCart}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <Fragment>
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-15">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20" flex>
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul className="">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} грн</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} грн</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </Fragment>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ № ${orderId} скоро будет передан службе доставки`
                : 'Добавьте хотя бы одну пару кроссовокб чтобы сделать заказ'
            }
            image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
