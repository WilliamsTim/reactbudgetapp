import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddExpense from './pages/AddExpense';
import PrivateRoutes from './pages/PrivateRoutes';
import PublicRoutes from './pages/PublicRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/addexpense' element={<AddExpense />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
