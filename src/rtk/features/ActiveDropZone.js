import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    x : null,
    y : null,
    waited : '',
}

const ActiveDropZoneSlice = createSlice({
    name : 'ActiveDropZone',
    initialState,
    reducers :{
        set : (state,data)=>{
            state.x = data.payload.x
            state.y = data.payload.y
            state.waited = data.payload.waited
        },
        clear : (state,data)=>{
            state.x = null
            state.y = null
            state.waited = ''
        }
    }
})
const ActiveDropZoneReducer = ActiveDropZoneSlice.reducer
export default ActiveDropZoneReducer
export const ActiveDropZoneActions = ActiveDropZoneSlice.actions