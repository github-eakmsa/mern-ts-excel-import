import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWork, Work } from '../../interfaces/Work';

export interface WorkState {
    data: IWork;
    list: IWork[]
}

const initialState: WorkState = {
    data: new Work(),
    list: []
}

export const WorkSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IWork>) => {
            state.data = action.payload
        },
        setWorks: (state, action: PayloadAction<IWork[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setWorks } = WorkSlice.actions

export default WorkSlice.reducer