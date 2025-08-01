import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PURGE } from "reduxjs-toolkit-persist";
import { PersistSliceState } from '../../types';


const initialState = {
    hasEntitlement: false
} as PersistSliceState

const persistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        clearPersistSlice() {
            return initialState
        },
        setHasEntitlement(state, action: PayloadAction<any>) {
            state.hasEntitlement = action.payload
        },


    },

    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            AsyncStorage.removeItem('persist:root')
        });
    }

})

export const {
    clearPersistSlice,
    setHasEntitlement,
} = persistSlice.actions

export default persistSlice.reducer