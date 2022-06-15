import { useContext, useState, useEffect } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnHighlighted, setBtnHightlighted] = useState(false);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnHightlighted(true);

    const highlightTimer = setTimeout(() => {
      setBtnHightlighted(false);
    }, 300);

    return () => {
      clearTimeout(highlightTimer);
    };
  }, [cartCtx.items]);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
