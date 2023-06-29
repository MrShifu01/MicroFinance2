import { createSlice } from '@reduxjs/toolkit'

const storedLoans = localStorage.getItem('loans')

const loansSlice = createSlice({
    name: 'loans',

    initialState: { 
        data: storedLoans ? JSON.parse(storedLoans) : [] 
    },

    reducers: {
        setLoans: (state, action) => {
            state.data = action.payload
            localStorage.setItem('loans', JSON.stringify(state.data))
        },

        resetLoans: (state) => {
            state.data = []
            localStorage.removeItem('loans')
        }
    }
})

export const { setLoans, resetLoans } = loansSlice.actions

export default loansSlice.reducer