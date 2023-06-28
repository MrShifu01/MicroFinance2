import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { Link, Navigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch()

    const handleLogin = async (ev, email, password) => {
        ev.preventDefault()
        try {
            const response = await axios.post('/users/login', {
              email,
              password
          })
          dispatch(setUser(response.data))
          setRedirect(true)
        } catch (error) {
          alert("fail")
        }
    }

    if (redirect) {
      return <Navigate to='/'/>
    }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className='mx-auto mt-32'
    >
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-disabled"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className='bg-primary w-20 mx-auto rounded-lg my-2' onClick={ev => handleLogin(ev, email, password)}>Login</button>
      </div>
      <p className='text-center text-sm text-gray-500'>Don't have an account? <Link to='/register' className='mx-2 underline text-black'>Register</Link></p>
    </Box>
  );
}