import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import clientsReducer from './clientsSlice'
import loansReducer from './loansSlice'
import userReducer from './userSlice'
import settingsReducer from './settingsSlice'

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        user: userReducer,
        loans: loansReducer,
        clients: clientsReducer,
        page: pageReducer,
    }
})

export default store