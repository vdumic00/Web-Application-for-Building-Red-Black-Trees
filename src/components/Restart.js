import classes from "./Restart.module.css";

const Restart = (props) => {
  const handleRestart = (event) => {
    event.preventDefault();

    props.onRestart();
  };

  return (
    <div className={classes.restartContainer}>
      <button className={classes.restartButton} onClick={handleRestart}>
        Izbriši stablo
      </button>
    </div>
  );
};

export default Restart;
