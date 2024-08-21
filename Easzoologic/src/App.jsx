import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import MyRouter from './MyRouter';
function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <div className='App'>
          <Router>
                {/* <Modal open={open} onClose={onCloseModal} modalTitle={modalTitle} modalText={modalText} /> */}
                <MyRouter/>
          </Router>
      </div>
    </>
  )
}

export default App
