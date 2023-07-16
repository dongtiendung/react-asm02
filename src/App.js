import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExampleContext from './components/Store/Context';

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';
import Popup from './components/Components/HomePage/Popup';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = newValue => {
    console.log(newValue);
    setInputValue(newValue);
  };
  return (
    <ExampleContext.Provider value={{ input: inputValue }}>
      {false && <Popup onInputChange={handleInputChange}></Popup>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </ExampleContext.Provider>
  );
}

export default App;
