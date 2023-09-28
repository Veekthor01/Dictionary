import React, { useState } from 'react';
import { useDictionaryContext } from './dictionaryContext';
import './App.css';

const Dictionary = () => {
  const { dictionary } = useDictionaryContext();
  const [word, setWord] = useState('');
  const [entry, setEntry] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchDefinition = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setEntry(data[0]);
        setNotFound(false);
      } else {
        setEntry(null);
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching definition:', error);
      setEntry(null);
      setNotFound(true);
    }
  };

  return (
    <div className="custom-container">
      <div className="header">Dictionary App</div>
      <input
        className="custom-textfield"
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button className="custom-button" onClick={fetchDefinition}>
        Get Definition
      </button>
      <div className="definition">
        {notFound ? (
          <div className='entry'>Word not found.</div>
        ) : (
          entry && (
            <div>
              <div className="word">{entry.word}</div>
              {entry.phonetics && (
                <div>
                  <strong className='heading'></strong> 
                  <div><audio controls src={entry.phonetics[0].audio} /></div>
                </div>
              )}
              
              {entry.meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex}>
                 {meaningIndex === 0 ? (
                    <strong className='heading'>Definition:</strong>
                  ) : (
                    <strong className='heading'>Definition {meaningIndex + 1}:</strong>
                  )}
                  <div className='entry'>{meaning.definitions[0].definition}</div>
                  {meaning.partOfSpeech && (
                    <div>
                       {meaningIndex === 0 ? (
                        <strong className='heading'>Part of Speech:</strong>
                      ) : (
                        <strong className='heading'>Part of Speech {meaningIndex + 1}:</strong>
                      )}
                      <div className='entry'>{meaning.partOfSpeech}</div>
                    </div>
                  )}
                  {meaning.definitions[0].example && (
                    <div>
                      {meaningIndex === 0 ? (
                        <strong className='heading'>Example:</strong>
                      ) : (
                        <strong className='heading'>Example {meaningIndex + 1}:</strong>
                      )}
                      <div className='entry'>{meaning.definitions[0].example}</div>
                    </div>
                  )}
                  {meaningIndex < entry.meanings.length - 1 && <hr />}
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div>
        <ul>
          {Object.entries(dictionary).map(([word, definition]) => (
            <li key={word}>
              <strong>{word}:</strong> {definition}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dictionary;
