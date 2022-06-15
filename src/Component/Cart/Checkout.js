import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isFiveChars = (value) => {
  return value.trim().length >= 5;
};
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameRef = useRef("");
  const streetRef = useRef("");
  const postalCodeRef = useRef("");
  const cityRef = useRef("");

  const checkoutFormHandler = (event) => {
    event.preventDefault();

    const nameValue = nameRef.current.value;
    const streetValue = streetRef.current.value;
    const postalCodeValue = postalCodeRef.current.value;
    const cityValue = cityRef.current.value;

    const nameIsValid = !isEmpty(nameValue);
    const streetIsValid = !isEmpty(streetValue);
    const postalCodeValid = isFiveChars(postalCodeValue);
    const cityIsValid = !isEmpty(cityValue);

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeValid && cityIsValid;

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    //submit form data
    const userData = {
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
    };

    console.log(userData);
    props.onConfirm(userData);
  };

  return (
    <form className={classes.form} onSubmit={checkoutFormHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputsValidity.name && <p>Enter Valid name...</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputsValidity.street && <p>Enter Valid Street...</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Postal code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formInputsValidity.postalCode && (
          <p>Enter Valid Postal Code (5 Chars Long)...</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="name">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsValidity.city && <p>Enter Valid City...</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.button}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
