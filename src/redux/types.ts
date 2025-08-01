export interface PersistSliceState {
    hasEntitlement: boolean;
}

export interface RootState {
    persistSlice: PersistSliceState;
}