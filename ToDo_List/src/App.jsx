import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import Home from './component/Home/Home';
import Namazs from './component/Prayers/Namazs';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prayer' element={<Namazs />} />
      </Routes>
  );
}

export default App;