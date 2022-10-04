import './App.sass';

import Field from '../field/Field';

function App() {
  return (
    <div className="app">
      <div className="game">
        <h1>Minesweeper</h1>
        <Field size={10} difficulty={0.4}/>
      </div>
    </div>
  )
}

export default App;
