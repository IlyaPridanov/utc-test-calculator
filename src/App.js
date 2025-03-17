import React, { useState } from 'react';
import Button from './components/Button/Button';
import Popup from './components/Popup/Popup';
import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="App">
      <Button onClick={() => setIsPopupOpen(true)} />
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default App;
