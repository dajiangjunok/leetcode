import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value++
    },
    decrement: state => {
      state.value--
    },
    incrementByAmount: (state, action) => {
      console.log(typeof state.value);
      console.log(typeof action.payload);

      state.value = state.value + action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer