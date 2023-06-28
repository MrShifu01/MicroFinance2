import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import clientsReducer from './clientsSlice'
import loansReducer from './loansSlice'
import userReducer from './userSlice'
import modeReducer from './modeSlice'

const store = configureStore({
    reducer: {
        mode: modeReducer,
        user: userReducer,
        loans: loansReducer,
        clients: clientsReducer,
        page: pageReducer,
    }
})

export default store