import styles from "../styles/modules/Cell.module.scss";
import bomb from "../resources/icons/bomb.svg";
import flagSVG from "../resources/icons/flag.svg";
// import { Component } from "react";
import { useState, useEffect } from "react";

const Cell = ({ value, id, onOpening, isOpened, ifBomb }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    setIsChecked(true);
    if (value === 0) onOpening(id);
    ifBomb(value);
  }, [isOpened]);

  const handleLeftClick = () => {
    setIsChecked(true);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setFlag((flag) => !flag);
  };

  return (
    <div
      className={styles.cell}
      onContextMenu={(e) => handleRightClick(e)}
      onClick={this.clickOrNot}
      style={{
        backgroundColor: value === "bomb" ? "#A3293D" : "#5C5C5C",
      }}
    >
      {!isChecked && flag ? (
        <div className={`${styles.mask} ${styles.flagged}`}>
          <img src={flagSVG} alt="flag" className={styles.flag} />
        </div>
      ) : !isChecked && !flag ? (
        <div className={styles.mask} onClick={handleLeftClick} />
      ) : null}
      {value === "bomb" ? (
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

// class CellCC extends Component {
//   constructor(props) {
//     super(props);
//     this.value = props.value;
//     this.id = props.id;
//     this.onOpening = props.onOpening;
//     this.isOpened = props.isOpened;
//     this.ifBomb = props.ifBomb;
//   }

//   state = {
//     isChecked: false,
//     flag: false,
//     isEnded: false,
//   };

//   handleLeftClick = () => {
//     this.setState({
//       isChecked: true,
//     });
//   };

//   handleRightClick = (e) => {
//     e.preventDefault();
//     this.setState({
//       flag: !this.state.flag,
//     });
//   };

//   whatContent = (value) => {
//     if (value === "bomb") {
//       return <img src={bomb} alt="bomb" style={{ width: 25 }} />;
//     } else if (value === 0) {
//       return "";
//     } else {
//       return value;
//     }
//   };

//   cellStatus = () => {
//     if (!this.state.isChecked) {
//       if (this.state.flag) {
//         return (
//           <div className="mask flagged">
//             <img src={flag} alt="flag" className="flag" />
//           </div>
//         );
//       } else {
//         return <div className="mask" onClick={this.handleLeftClick} />;
//       }
//     } else {
//       return;
//     }
//   };

//   componentDidUpdate(prevProps) {
//     if (this.props.isOpened !== prevProps.isOpened) {
//       this.setState({ isChecked: true });
//       this.clickOrNot();
//     }
//   }

//   clickOrNot = () => {
//     if (this.value === 0) this.onOpening(this.id);
//     this.ifBomb(this.value);
//   };

//   render() {
//     return (
//       <div
//         className="cell"
//         onContextMenu={(e) => this.handleRightClick(e)}
//         onClick={this.clickOrNot}
//         style={{
//           backgroundColor: this.value === "bomb" ? "#A3293D" : "#5C5C5C",
//         }}
//       >
//         {this.cellStatus()}
//         {this.whatContent(this.value)}
//       </div>
//     );
//   }
// }
