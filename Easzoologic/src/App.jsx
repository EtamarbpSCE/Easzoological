import { useState } from 'react'
import InfoPage from './pages/InfoPage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ScanPage from './componenets/Scanner/ScanPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <ScanPage></ScanPage>
      </div>
    </>
  )
}

export default App
