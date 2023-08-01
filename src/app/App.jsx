import styles from "../styles/modules/App.module.scss";

import Field from "../components/Field";

function App() {
  return (
    <div className={styles.app}>
      <h1>Minesweeper</h1>
      <Field size={10} difficulty={0.3} />
    </div>
  );
}

export default App;
