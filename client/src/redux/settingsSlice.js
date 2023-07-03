import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settings: false,
        column: false,
        pagination: false,
        delete: false
    },

    reducers: {
        toggleColumn: (state) => {
            state.column = !state.column
        },

        togglePagination: (state) => {
            state.pagination = !state.pagination
        },

        toggleSettings: (state) => {
            state.settings = !state.settings
        },

        toggleDelete: (state) => {
            state.delete = !state.delete
        },
    }
})

export const { toggleColumn, togglePagination, toggleSettings, toggleDelete } = settingsSlice.actions

export default settingsSlice.reducer