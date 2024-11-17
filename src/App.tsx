import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AttributesList from './components/AttributesList';
import CharacterBuilder from './components/CharacterBuilder';

function App() {
  const [num, setNum] = useState<number>(0);
  return (
    <Provider store={store}>
      <div className='App'>
        <header className='App-header'>
          <h1>React Coding Exercise</h1>
        </header>
        <section className='App-section'>
          <CharacterBuilder />
        </section>
      </div>
    </Provider>
  );
}

export default App;
