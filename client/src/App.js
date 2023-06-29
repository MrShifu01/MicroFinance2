import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import ClientPage from './pages/ClientPage';
import AdminPage from './pages/AdminPage';
import axios from 'axios';
import './index.css';
import Layout from './components/Layout';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index={true} path='/' element={<IndexPage/>}/>
        <Route path='/client/:id' element={<ClientPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/user' element={<UserPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
