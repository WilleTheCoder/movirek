import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Profile from './Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Main></Main>}></Route>
        <Route exact path='/register' element={<Register></Register>}></Route>
        <Route exact path='/login' element={<Login></Login>}></Route>
        <Route exact path='/profile' element={<Profile></Profile>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
