import { useState } from "react";

import classes from "./RedBlackInput.module.css";

const RedBlackInput = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(Number(event.target.value));
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (inputValue === 0 || inputValue === "") {
      alert("Potrebno je unijeti valjanu vrijednost.");
      setInputValue("");
      return;
    }
    props.onInputValue(inputValue);
    setInputValue("");
  };

  return (
    <div className={classes.inputContainer}>
      <input
        type="number"
        className={classes.inputField}
        onChange={handleInputChange}
        value={inputValue}
      />
      <button className={classes.inputButton} onClick={handleInputSubmit}>
        Dodaj
      </button>
    </div>
  );
};

export default RedBlackInput;
