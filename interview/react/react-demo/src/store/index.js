import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/conterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store