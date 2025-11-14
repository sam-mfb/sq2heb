import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { scanResources, loadResourceFile, loadBinaryResourceFile } from './resourcesAPI'
import { parsePictureResource } from '../../utils/parsers/pictureParser'
import { parseViewResource } from '../../utils/parsers/viewParser'
import { parseSoundResource } from '../../utils/parsers/soundParser'
import { resourceCache } from '../../services/resourceCache'

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
  loaded: boolean  // Whether the resource is loaded in the cache
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
    loaded: false,
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
    // Store in cache instead of Redux state
    resourceCache.set('pic', id, pictureResource)
    return { id }
  }
)

// Async thunk to load a view resource
export const loadViewResource = createAsyncThunk(
  'resources/loadViewResource',
  async (id: number) => {
    const fileContent = await loadBinaryResourceFile('view', id)
    const viewResource = await parseViewResource(fileContent)
    // Store in cache instead of Redux state
    resourceCache.set('view', id, viewResource)
    return { id }
  }
)

// Async thunk to load a sound resource
export const loadSoundResource = createAsyncThunk(
  'resources/loadSoundResource',
  async (id: number) => {
    const fileContent = await loadBinaryResourceFile('sound', id)
    const soundResource = await parseSoundResource(fileContent)
    // Store in cache instead of Redux state
    resourceCache.set('sound', id, soundResource)
    return { id }
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
        state.currentResource.loaded = true
        state.currentResource.loading = false
        state.currentResource.error = null
      })
      .addCase(loadPictureResource.rejected, (state, action) => {
        state.currentResource.loading = false
        state.currentResource.loaded = false
        state.currentResource.error = action.error.message || 'Failed to load picture'
      })
      // View resource loading
      .addCase(loadViewResource.pending, (state) => {
        state.currentResource.loading = true
        state.currentResource.error = null
      })
      .addCase(loadViewResource.fulfilled, (state, action) => {
        state.currentResource.type = 'view'
        state.currentResource.id = action.payload.id
        state.currentResource.loaded = true
        state.currentResource.loading = false
        state.currentResource.error = null
      })
      .addCase(loadViewResource.rejected, (state, action) => {
        state.currentResource.loading = false
        state.currentResource.loaded = false
        state.currentResource.error = action.error.message || 'Failed to load view'
      })
      // Sound resource loading
      .addCase(loadSoundResource.pending, (state) => {
        state.currentResource.loading = true
        state.currentResource.error = null
      })
      .addCase(loadSoundResource.fulfilled, (state, action) => {
        state.currentResource.type = 'sound'
        state.currentResource.id = action.payload.id
        state.currentResource.loaded = true
        state.currentResource.loading = false
        state.currentResource.error = null
      })
      .addCase(loadSoundResource.rejected, (state, action) => {
        state.currentResource.loading = false
        state.currentResource.loaded = false
        state.currentResource.error = action.error.message || 'Failed to load sound'
      })
  },
})

export const { clearCurrentResource } = resourcesSlice.actions
export default resourcesSlice.reducer
