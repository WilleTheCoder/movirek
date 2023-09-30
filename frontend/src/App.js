import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './register';
import Login from './login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Main></Main>}></Route>
        <Route exact path='/register' element={<Register></Register>}></Route>
        <Route exact path='/login' element={<Login></Login>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
