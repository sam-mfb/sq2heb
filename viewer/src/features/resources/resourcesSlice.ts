import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { scanResources, loadResourceFile } from './resourcesAPI'
import { parsePictureResource } from '../../utils/parsers/pictureParser'

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

// Async thunk to load a picture resource
export const loadPictureResource = createAsyncThunk(
  'resources/loadPictureResource',
  async (id: number) => {
    const fileContent = await loadResourceFile('pic', id)
    const pictureResource = await parsePictureResource(fileContent)
    return { id, data: pictureResource }
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
      .addCase(loadFileTree.fulfilled, (state, action) => {
        state.fileTree = { ...action.payload, loaded: true }
      })
      .addCase(loadFileTree.rejected, (state) => {
        state.fileTree.loaded = false
      })
      // Picture resource loading
      .addCase(loadPictureResource.pending, (state) => {
        state.currentResource.loading = true
        state.currentResource.error = null
      })
      .addCase(loadPictureResource.fulfilled, (state, action) => {
        state.currentResource.type = 'pic'
        state.currentResource.id = action.payload.id
        state.currentResource.data = action.payload.data
        state.currentResource.loading = false
        state.currentResource.error = null
      })
      .addCase(loadPictureResource.rejected, (state, action) => {
        state.currentResource.loading = false
        state.currentResource.error = action.error.message || 'Failed to load picture'
      })
  },
})

export const { clearCurrentResource } = resourcesSlice.actions
export default resourcesSlice.reducer
