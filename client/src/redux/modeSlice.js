import { createSlice} from '@reduxjs/toolkit'

const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        mode: 'light'
    },

    reducers: {
        darkMode: (state) => {
            state.mode = 'dark'
        },

        lightMode: (state) => {
            state.mode = 'light'
        }
    }
})

export const { darkMode, lightMode } = modeSlice.actions

export default modeSlice.reducer