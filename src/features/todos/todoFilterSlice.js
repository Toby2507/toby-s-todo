import { createSlice } from '@reduxjs/toolkit'

export const todoFilterSlice = createSlice({
    name: 'filters',
    initialState: 'all',
    reducers: {
        setFilter: (state, action) => action.payload
    }
})

export const { setFilter } = todoFilterSlice.actions
export const filterBy = state => state.filters
export default todoFilterSlice.reducer