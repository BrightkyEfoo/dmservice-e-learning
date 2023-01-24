import {configureStore} from "@reduxjs/toolkit"
import MousePosReducer from "../features/MousePos"
import ActiveDropZoneReducer from "../features/ActiveDropZone"
import ItemSelectedReducer from "../features/ItemSelected"
import TimerReducer from "../features/timer"
import FoundedReducer from "../features/founded"
import memoireReducer from "../features/memoire"
import IntrusReducer from "../features/Intrus"

const store = configureStore({
    reducer : {
        mousePos : MousePosReducer,
        activeDropZone : ActiveDropZoneReducer,
        itemSelected : ItemSelectedReducer,
        timer : TimerReducer,
        founded : FoundedReducer,
        memoire : memoireReducer,
        intrus : IntrusReducer,
    }
})
export default store