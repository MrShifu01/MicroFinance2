import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import AdminPage from './pages/AdminPage';
import axios from 'axios';
import './index.css';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import { ClerkProvider } from "@clerk/clerk-react";

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index={true} path='/' element={<IndexPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/change-password' element={<ChangePasswordPage/>}/>
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default App;
