import 'bootstrap/dist/css/bootstrap.min.css';
import View from './component/View';
import './App.css';
import { Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
       <Routes>
           <Route path='/' element={<View />} />
           <Route path='/document' element={<View />} />
       </Routes>
    </div>
  );
}

export default App;
