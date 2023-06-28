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
        },

        resetLoans: (state) => {
            state.data = []
        }
    }
})

export const { setLoans, resetLoans } = loansSlice.actions

export default loansSlice.reducer