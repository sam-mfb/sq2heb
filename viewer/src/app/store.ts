import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // We'll add slices here in Phase 2
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
