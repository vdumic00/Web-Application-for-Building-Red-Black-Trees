import { useState } from "react";

import classes from "./RedBlackDelete.module.css";

const RedBlackDelete = (props) => {
  const [deleteValue, setDeleteValue] = useState("");

  const handleDeleteChange = (event) => {
    event.preventDefault();
    setDeleteValue(Number(event.target.value));
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    if (deleteValue === 0 || deleteValue === "") {
      alert("Potrebno je unijeti valjanu vrijednost.");
      setDeleteValue("");
      return;
    }
    props.onDeleteValue(deleteValue);
    setDeleteValue("");
  };

  return (
    <div className={classes.deleteContainer}>
      <input
        className={classes.deleteField}
        value={deleteValue}
        onChange={handleDeleteChange}
      />
      <button className={classes.deleteButton} onClick={handleDeleteSubmit}>
        Ukloni
      </button>
    </div>
  );
};

export default RedBlackDelete;
