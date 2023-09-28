import React from 'react';
import { DictionaryProvider } from './dictionaryContext';
import Dictionary from './dictionary';
import './App.css';

function App() {
  return (
    <div>
        <DictionaryProvider>
          <Dictionary />
        </DictionaryProvider>
    </div>
  );
}

export default App;
