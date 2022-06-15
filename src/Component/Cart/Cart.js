import React, { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

// const DUMMY_CART_ITEMS = [
//   {
//     id: "c1",
//     name: "Shushi",
//     amount: 20.02,
//     price: 10.01,
//   },
// ];

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isOrdered, setIsOrdered] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitOrder = async (userData) => {
    await fetch(
      "https://react-meal-5d301-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    ).then((response) => {
      cartCtx.clearCart();
      setFormSubmitted(true);
    });
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const cartTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const confirmOrderHandler = (userData) => {
    submitOrder(userData);
  };

  const orderHandler = () => {
    setIsOrdered(true);
  };

  const modalCartContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isOrdered && (
        <Checkout onConfirm={confirmOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isOrdered && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const formSubmittedContent = (
    <React.Fragment>
      <p>Order Placed Successfully.</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {formSubmitted && formSubmittedContent}
      {!formSubmitted && modalCartContent}
    </Modal>
  );
};

export default Cart;
