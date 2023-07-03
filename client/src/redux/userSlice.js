import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        data:  storedUser ? JSON.parse(storedUser) : null
    },

    reducers: {
        setUser: (state, action) => {
            state.data = action.payload
            localStorage.setItem('user', JSON.stringify(state.data))
        },

        setTempUser: (state, action) => {
            state.data = action.payload
            localStorage.removeItem('user')
        },

        resetUser: (state) => {
            state.data = null
            localStorage.removeItem('user')
        }
    }
})

export const { setUser, setTempUser, resetUser } = userSlice.actions

export default userSlice.reducer