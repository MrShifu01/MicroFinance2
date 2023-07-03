import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import AdminPage from './pages/AdminPage';
import axios from 'axios';
import './index.css';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index={true} path='/' element={<IndexPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/change-password' element={<ChangePasswordPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
