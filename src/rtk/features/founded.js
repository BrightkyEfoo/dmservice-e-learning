import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    antonyms : 0,
    synonyms : 0
}

const FoundedSlice = createSlice({
    name : 'Founded',
    initialState,
    reducers :{
        set : (state,data)=>{
            state[data.payload.state] = data.payload.value
        },
        decrement : (state , data)=>{
            state[data.payload.state] = state[data.payload.state] - 1
        }
    }
})
const FoundedReducer = FoundedSlice.reducer
export default FoundedReducer
export const FoundedActions = FoundedSlice.actions