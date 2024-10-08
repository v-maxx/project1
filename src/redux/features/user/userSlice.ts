import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "@/redux/store";


// Define a type for the slice state
interface UserState {
    value: number
    applicationState:any
    applications:any
}

// Define the initial state using that type
const initialState: UserState = {
    value: 0,
    applicationState:undefined,
    applications:undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setApplicationState: (state,action: PayloadAction<any>) => {
            console.log('action payload',action.payload)
            state.applicationState = {...state, ...action.payload}
        },
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        setApplications: (state, action: PayloadAction<any>) => {
            console.log('action appli',action.payload)
            state.applications = action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount,setApplicationState,setApplications } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value
export const selectApplicationState = (state: RootState) => state.user.applicationState

export default userSlice.reducer
