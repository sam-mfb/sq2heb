import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { scanResources } from './resourcesAPI'

export interface FileTree {
  pics: number[]
  views: number[]
  sounds: number[]
  logics: number[]
  loaded: boolean
}

export interface CurrentResource {
  type: 'pic' | 'view' | 'sound' | 'logic' | null
  id: number | null
  data: any | null
  loading: boolean
  error: string | null
}

export interface ResourcesState {
  fileTree: FileTree
  currentResource: CurrentResource
}

const initialState: ResourcesState = {
  fileTree: {
    pics: [],
    views: [],
    sounds: [],
    logics: [],
    loaded: false,
  },
  currentResource: {
    type: null,
    id: null,
    data: null,
    loading: false,
    error: null,
  },
}

// Async thunk to scan resources
export const loadFileTree = createAsyncThunk(
  'resources/loadFileTree',
  async () => {
    const fileTree = await scanResources()
    return fileTree
  }
)

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    clearCurrentResource: (state) => {
      state.currentResource = initialState.currentResource
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFileTree.pending, (state) => {
        state.fileTree.loaded = false
      })
      .addCase(loadFileTree.fulfilled, (state, action: PayloadAction<FileTree>) => {
        state.fileTree = { ...action.payload, loaded: true }
      })
      .addCase(loadFileTree.rejected, (state) => {
        state.fileTree.loaded = false
      })
  },
})

export const { clearCurrentResource } = resourcesSlice.actions
export default resourcesSlice.reducer
