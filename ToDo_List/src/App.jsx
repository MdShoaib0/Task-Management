import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import Home from './component/Home/Home';
import Prayer from './component/Navigation/Prayer';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prayer' element={<Prayer />} />
      </Routes>
  );
}

export default App;