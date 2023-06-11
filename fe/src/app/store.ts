import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import workReducer from '../features/work/workSlice'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export default configureStore({
    reducer: {
        work: workReducer,
    },
    middleware: customizedMiddleware,
})