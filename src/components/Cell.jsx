import styles from "../styles/modules/Cell.module.scss";
import bomb from "../resources/icons/bomb.svg";
import flagSVG from "../resources/icons/flag.svg";

import { useState } from "react";

const Cell = ({ id, value, onOpening, isOpened, ifBomb }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleLeftClick = () => {
    setIsChecked(true);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setFlag((flag) => !flag);
  };

  const clickOrNot = () => {
    if (value === 0) onOpening(id);
    ifBomb(value);
  };

  return (
    <div
      className={styles.cell}
      onClick={() => clickOrNot()}
      onContextMenu={(e) => handleRightClick(e)}
      style={{
        backgroundColor: value === -1 ? "#A3293D" : "#5C5C5C",
      }}
    >
      {!isChecked ? (
        <div
          className={`${styles.mask} ${flag ? styles.flagged : null}`}
          onClick={!flag ? handleLeftClick : null}
        >
          {flag && <img src={flagSVG} alt="flag" className={styles.flag} />}
        </div>
      ) : null}
      {value === -1 ? (
        <img src={bomb} alt="bomb" style={{ width: 25 }} />
      ) : value === 0 ? (
        ""
      ) : (
        value
      )}
    </div>
  );
};

export default Cell;
