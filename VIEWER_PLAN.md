# AGI Resource Viewer - Implementation Plan

## Overview
Build a Vite React app to display Space Quest 2 AGI resources from `./project/src/` using the `@agikit/react-editors` component library.

## Project Location
`viewer/` - New Vite React application at root level

## Architecture Decisions

- **Framework**: Vite + React 17.0.2 + TypeScript
- **State Management**: Redux Toolkit
- **UUID Generation**: nanoid
- **Routing**: React Router v6
- **Styling**: @agikit/react-editors CSS + custom CSS

## Application Structure

```
/home/devuser/sq2heb/
├── orig/                             # Original game files
├── project/                          # AGI game project
│   ├── src/                          # Extracted resource source files
│   │   ├── pic/                      # Picture resources (.agipic)
│   │   ├── view/                     # View/sprite resources (.agiview)
│   │   ├── sound/                    # Sound resources (.agisound)
│   │   ├── logic/                    # Logic script resources (.agilogic)
│   │   ├── words.txt                 # Vocabulary
│   │   └── object.json               # Object definitions
│   ├── build/                        # Compiled game files (ignored)
│   └── agikit-project.json           # AGI project config
├── viewer/                           # Vite React app (NEW)
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.ts              # Redux store configuration
│   │   │   └── hooks.ts              # Typed Redux hooks
│   │   ├── features/
│   │   │   ├── resources/
│   │   │   │   ├── resourcesSlice.ts # Redux slice for resource state
│   │   │   │   └── resourcesAPI.ts   # Resource loading logic
│   │   │   ├── browser/
│   │   │   │   └── ResourceBrowser.tsx
│   │   │   ├── viewers/
│   │   │   │   ├── PictureViewer.tsx
│   │   │   │   ├── ViewViewer.tsx
│   │   │   │   └── SoundViewer.tsx
│   │   ├── utils/
│   │   │   ├── parsers/
│   │   │   │   ├── pictureParser.ts
│   │   │   │   ├── viewParser.ts
│   │   │   │   └── soundParser.ts
│   │   ├── types/
│   │   │   └── index.ts              # Type definitions
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── node_modules/
├── package.json
├── package-lock.json
└── .gitignore
```

## UI Layout

```
┌─────────────────────────────────────────────────┐
│  AGI Resource Viewer - Space Quest 2           │
├──────────────┬──────────────────────────────────┤
│              │  Resource: pic/1.agipic          │
│  Resources   ├──────────────────────────────────┤
│              │                                  │
│  📁 pic      │                                  │
│    📄 1      │                                  │
│    📄 2      │      Resource Display            │
│    📄 3      │      (PicEditor/ViewEditor/      │
│  📁 view     │       SoundEditor)               │
│    📄 0      │                                  │
│    📄 1      │                                  │
│  📁 sound    │                                  │
│    📄 1      │                                  │
│  📁 logic    │                                  │
│    📄 0      │                                  │
└──────────────┴──────────────────────────────────┘
```

## Dependencies

### Production Dependencies
```json
{
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-router-dom": "^6.20.0",
  "@reduxjs/toolkit": "^2.0.0",
  "react-redux": "^9.0.0",
  "@agikit/react-editors": "^0.8.2",
  "@agikit/core": "^0.8.0",
  "nanoid": "^5.0.0"
}
```

### Dev Dependencies
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0",
  "typescript": "^5.3.0",
  "@types/react": "^17.0.0",
  "@types/react-dom": "^17.0.0"
}
```

## Redux State Structure

```typescript
interface RootState {
  resources: {
    currentResource: {
      type: 'pic' | 'view' | 'sound' | 'logic' | null;
      id: number | null;
      data: EditingPictureResource | EditingView | IBMPCjrSound | string | null;
      loading: boolean;
      error: string | null;
    };
    fileTree: {
      pics: number[];
      views: number[];
      sounds: number[];
      logics: number[];
      loaded: boolean;
    };
  };
}
```

## Routing Strategy

- `/` - Home with resource browser (no resource selected)
- `/pic/:id` - Display picture resource
- `/view/:id` - Display view/sprite resource
- `/sound/:id` - Display sound resource
- `/logic/:id` - Display logic script (text only)

## Data Flow

```
1. App loads → scan ../project/src/ for available resources
                ↓
2. Build file tree in Redux state
                ↓
3. User clicks resource in browser
                ↓
4. Navigate to /:type/:id
                ↓
5. Redux thunk loads and parses resource file from ../project/src/
                ↓
6. Parser converts to appropriate format:
   - .agipic → EditingPictureResource (with UUIDs via nanoid)
   - .agiview → EditingView
   - .agisound → IBMPCjrSound
   - .agilogic → string (text content)
                ↓
7. Appropriate viewer component renders the resource
```

## File Format Parsing

### Picture Files (.agipic)
- Parse picture command data
- Add UUID to each command using nanoid
- Set `enabled: true` for all commands
- Return `EditingPictureResource`

### View Files (.agiview)
- Parse loop and cel structure
- Handle regular and mirrored loops
- Extract cel pixel buffers
- Return `EditingView`

### Sound Files (.agisound)
- Parse 3 tone voices + 1 noise voice
- Extract note timing and frequency data
- Return `IBMPCjrSound`

### Logic Files (.agilogic)
- Read as plain text
- Return string for display in `<pre>` tag

## Implementation Phases

---

## Phase 1: Project Setup and Scaffolding
**Commit Message**: "feat: initialize Vite React viewer app with Redux Toolkit"

### Tasks:
1. Create `viewer/` directory
2. Initialize Vite React TypeScript project
3. Install all dependencies (React 17, Redux Toolkit, React Router, @agikit packages, nanoid)
4. Configure `vite.config.ts` to allow file system access to `../project/src/`
5. Set up Redux store with basic structure
6. Set up React Router with basic routes
7. Create basic App component with router
8. Import all @agikit/react-editors CSS files
9. Verify app runs with `npm run dev`

### Files Created:
- `viewer/package.json`
- `viewer/vite.config.ts`
- `viewer/tsconfig.json`
- `viewer/src/main.tsx`
- `viewer/src/App.tsx`
- `viewer/src/app/store.ts`
- `viewer/src/app/hooks.ts`

### Acceptance Criteria:
- ✅ App runs on `http://localhost:3000`
- ✅ Redux DevTools shows store connected
- ✅ Basic routing works (can navigate to `/`)

---

## Phase 2: File System Scanner and Resource Browser
**Commit Message**: "feat: add resource browser with file tree"

### Tasks:
1. Create `resourcesSlice.ts` with file tree state
2. Create `resourcesAPI.ts` with file scanning logic
3. Implement function to scan `../project/src/` and list all resources
4. Create `ResourceBrowser.tsx` component
   - Display folder tree structure
   - List all pics, views, sounds, logics by number
   - Make resources clickable (navigate to route)
5. Add file tree to Redux state on app load
6. Style the browser sidebar

### Files Created:
- `viewer/src/features/resources/resourcesSlice.ts`
- `viewer/src/features/resources/resourcesAPI.ts`
- `viewer/src/features/browser/ResourceBrowser.tsx`
- `viewer/src/App.css` (layout styles)

### Acceptance Criteria:
- ✅ Sidebar shows all available resources organized by type
- ✅ Clicking a resource navigates to appropriate route
- ✅ File tree loads from actual `project/src/` directory

---

## Phase 3: Picture Resource Parsing and Viewer
**Commit Message**: "feat: implement picture resource viewer"

### Tasks:
1. Create `utils/parsers/pictureParser.ts`
   - Read `.agipic` file format (use @agikit/core utilities if available)
   - Convert to `EditingPictureResource`
   - Add UUIDs to commands using nanoid
2. Add picture loading logic to Redux slice (async thunk)
3. Create `PictureViewer.tsx` component
   - Wrap `PicEditor` from @agikit/react-editors
   - Provide `PicEditorControlContext`
   - Implement confirm dialog
   - Make read-only (no saving)
4. Connect viewer to route `/pic/:id`
5. Handle loading and error states

### Files Created:
- `viewer/src/utils/parsers/pictureParser.ts`
- `viewer/src/features/viewers/PictureViewer.tsx`
- `viewer/src/types/index.ts`

### Acceptance Criteria:
- ✅ Clicking a picture in browser loads and displays it
- ✅ PicEditor renders with all tools visible
- ✅ Can view picture commands
- ✅ Loading spinner shows while loading
- ✅ Error message if resource fails to load

---

## Phase 4: View Resource Parsing and Viewer
**Commit Message**: "feat: implement view/sprite resource viewer"

### Tasks:
1. Create `utils/parsers/viewParser.ts`
   - Read `.agiview` file format
   - Parse loops and cels
   - Convert to `EditingView`
2. Add view loading logic to Redux slice (async thunk)
3. Create `ViewViewer.tsx` component
   - Wrap `ViewEditor` from @agikit/react-editors
   - Provide `ViewEditorControlContext`
   - Handle zoom state
   - Make read-only
4. Connect viewer to route `/view/:id`
5. Handle loading and error states

### Files Created:
- `viewer/src/utils/parsers/viewParser.ts`
- `viewer/src/features/viewers/ViewViewer.tsx`

### Acceptance Criteria:
- ✅ Clicking a view in browser loads and displays it
- ✅ ViewEditor renders with loop/cel navigation
- ✅ Can navigate between loops and cels
- ✅ Zoom controls work
- ✅ Mirrored loops display correctly

---

## Phase 5: Sound Resource Parsing and Viewer
**Commit Message**: "feat: implement sound resource viewer with playback"

### Tasks:
1. Create `utils/parsers/soundParser.ts`
   - Read `.agisound` file format
   - Parse tone voices and noise voice
   - Convert to `IBMPCjrSound`
2. Add sound loading logic to Redux slice (async thunk)
3. Create `SoundViewer.tsx` component
   - Wrap `SoundEditor` from @agikit/react-editors
   - Integrate `IBMPCjrSoundPlayer` for playback
   - Add play/pause controls
   - Make read-only
4. Connect viewer to route `/sound/:id`
5. Handle loading and error states

### Files Created:
- `viewer/src/utils/parsers/soundParser.ts`
- `viewer/src/features/viewers/SoundViewer.tsx`

### Acceptance Criteria:
- ✅ Clicking a sound in browser loads and displays it
- ✅ SoundEditor renders with note visualization
- ✅ Can play/pause sound
- ✅ All 4 voices (3 tone + 1 noise) display correctly

---

## Phase 6: Logic Script Viewer and Polish
**Commit Message**: "feat: add logic script viewer and final polish"

### Tasks:
1. Create simple `LogicViewer.tsx` component
   - Display `.agilogic` text content in `<pre>` tag
   - Add basic syntax styling (optional)
2. Add logic loading to Redux slice
3. Connect viewer to route `/logic/:id`
4. Add home page content (instructions, project info)
5. Polish styling and layout
6. Add keyboard shortcuts (optional):
   - Arrow keys to navigate between resources
   - Escape to return to browser
7. Update README with viewer instructions

### Files Created:
- `viewer/src/features/viewers/LogicViewer.tsx`
- `viewer/README.md`

### Acceptance Criteria:
- ✅ Logic scripts display as readable text
- ✅ Home page explains how to use the viewer
- ✅ All resource types can be viewed
- ✅ Layout is responsive and polished
- ✅ README documents how to run the viewer

---

## Technical Notes

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    port: 3000,
    fs: {
      allow: ['..']  // Allow access to ../project/src
    }
  }
})
```

### Loading Resources
Since we need to access `../project/src/` files, we have two options:
1. **Fetch API**: Copy `project/src/` to `viewer/public/resources/` and fetch from there
2. **Vite Raw Import**: Use `?raw` suffix to import file contents at build time

**Recommended**: Copy approach for simplicity and runtime flexibility.

### Context Providers Required

**PictureViewer**:
```tsx
<PicEditorControlContext.Provider value={{
  confirm: async (msg) => window.confirm(msg),
  addCommands: () => {},  // Read-only
  deleteCommand: () => {}, // Read-only
  setCommandsEnabled: () => {}, // Read-only
  setProjectConfig: () => {} // Read-only
}}>
  <PicEditor pictureResource={resource} />
</PicEditorControlContext.Provider>
```

**ViewViewer**:
```tsx
<ViewEditorControlContext.Provider value={{
  confirm: async (msg) => window.confirm(msg),
  addCommands: () => {},  // Read-only
  zoom,
  setZoom
}}>
  <ViewEditor view={resource} />
</ViewEditorControlContext.Provider>
```

### UUID Generation with nanoid
```typescript
import { nanoid } from 'nanoid';

function preparePicCommandForEditing(command: PictureCommand): EditingPictureCommand {
  return {
    ...command,
    uuid: nanoid(),
    enabled: true
  };
}
```

## Testing Strategy

After each phase:
1. Test navigation between different resources
2. Verify Redux state updates correctly
3. Check browser console for errors
4. Test with multiple resource IDs
5. Verify loading and error states

## Future Enhancements (Not in Scope)

- ❌ Edit and save resources (read-only for now)
- ❌ Export modified resources
- ❌ Undo/redo functionality
- ❌ Tab interface for multiple resources
- ❌ Search and filter
- ❌ Comparison views
- ❌ words.txt and object.json viewers
- ❌ Advanced syntax highlighting for logic

## Success Criteria

The viewer is complete when:
- ✅ All pictures can be viewed
- ✅ All views can be viewed and navigated
- ✅ All sounds can be viewed and played
- ✅ All logic scripts can be read
- ✅ Navigation works smoothly
- ✅ No console errors
- ✅ Professional appearance with consistent styling
