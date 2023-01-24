import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    data : '',
    isMoving : false
}

const ItemSelectedSlice = createSlice({
    name : 'ItemSelected',
    initialState,
    reducers :{
        set : (state,data)=>{
            state.data = data.payload.data
            state.isMoving = data.payload.isMoving
        }
    }
})
const ItemSelectedReducer = ItemSelectedSlice.reducer
export default ItemSelectedReducer
export const ItemSelectedActions = ItemSelectedSlice.actions