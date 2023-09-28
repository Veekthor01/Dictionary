import React, { useContext, useState } from 'react';

const DictionaryContext = React.createContext();

export const useDictionaryContext = () => useContext(DictionaryContext);

export function DictionaryProvider({ children }) {
  const [dictionary] = useState({});

  return (
    <DictionaryContext.Provider value={{ dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
}
