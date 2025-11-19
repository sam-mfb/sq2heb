# CLAUDE.md - Project Orientation Guide

## Project Overview

**Name:** sq2heb (Space Quest 2 Hebrew Translation Project)
**Purpose:** A web-based AGI resource viewer and translation toolkit with focus on translating Space Quest 2 to Hebrew

This project provides:

1. A modern web viewer for exploring AGI game resources (pictures, views, sounds, logic scripts)
2. Documentation on the AGI translation architecture
3. Setup automation for processing AGI game files
4. Generic tooling designed to work with any Sierra AGI game from that era

**Key Context:**

- You must own a legal copy of the AGI game to use this. Game files are NOT included in the repo.
- While the project's goal is Space Quest 2 Hebrew translation, ALL TOOLING SHOULD BE KEPT GENERIC
- Tools should be easily adaptable to other AGI games (King's Quest, Police Quest, Leisure Suit Larry, etc.)
- Avoid hardcoding Space Quest 2-specific values or assumptions

---

## Quick Start Commands

```bash
# Setup (requires AGI game zip file in project/ directory)
npm run setup

# Start the web viewer
npm run viewer:dev        # Opens on http://localhost:3000

# Build the game (after modifications)
npm run build

# Clean project files
npm run clean

# Example project commands (for testing generic functionality)
npm run example:setup     # Setup example project
npm run example:build     # Build example project
npm run example:clean     # Clean example project

# Type-check scripts
npm run typecheck:scripts
```

---

## Project Structure

```
sq2heb/
├── README.md                        # User-facing setup instructions
├── TRANSLATION_ARCHITECTURE.md      # Detailed AGI translation guide
├── CLAUDE.md                        # This file - orientation for Claude
├── package.json                     # Node dependencies & scripts
│
├── scripts/                         # Setup automation scripts (TypeScript)
│   ├── utils/                       # Shared utilities (logger, fs-utils, exec-utils)
│   ├── setup-project.ts             # Extract & decompile game files
│   ├── setup-example.ts             # Setup example project
│   ├── clean-project.ts             # Remove all game files
│   ├── clean-example.ts             # Clean example project
│   ├── setup-agi.ts                 # Core AGI extraction logic
│   ├── clean-agi.ts                 # Core cleanup logic
│   ├── create-manifest.ts           # Generate resource list for viewer
│   └── tsconfig.json                # TypeScript config for scripts
│
├── project/                         # Game files (gitignored, user-provided)
│   ├── *.zip                        # User's AGI game archive (any Sierra AGI game)
│   ├── orig/                        # Extracted original AGI files
│   ├── src/                         # Decompiled AGI resources (logic/, pic/, view/, sound/, etc.)
│   └── build/                       # Build output
│
├── example/                         # Sample AGI project for testing (committed to VCS)
│   ├── orig/                        # Pre-compiled AGI files (committed)
│   ├── src/                         # Decompiled resources (gitignored)
│   └── build/                       # Build output (gitignored)
│
└── viewer/                          # React/Vite web application
    ├── vite.config.ts               # Vite configuration
    ├── tsconfig.json                # TypeScript config
    ├── public/
    │   └── resources/               # Copied from project/src/ (gitignored)
    └── src/
        ├── main.tsx                 # React entry point
        ├── App.tsx                  # Main app with routing
        ├── app/                     # Redux store & hooks
        ├── features/                # Feature modules
        │   ├── browser/             # Resource navigation sidebar
        │   ├── resources/           # Redux state & API for resource loading
        │   └── viewers/             # Picture/View/Sound/Logic viewer components
        ├── services/                # Resource cache (non-serializable data)
        └── utils/                   # Parsers for AGI file formats
```

---

## How the Viewer Works

### Setup Flow (npm run setup)

1. User adds `*.zip` file containing any AGI game files to `project/`
2. `setup-project.ts` extracts ZIP to `project/orig/`
3. agikit decompiles resources to `project/src/`
4. Resources copied to `viewer/public/resources/`
5. `create-manifest.ts` generates `manifest.json` listing all resources

### Viewer Architecture

- **Redux Store:** Manages file tree and current resource state
- **Resource Cache:** Stores parsed resource data outside Redux (for non-serializable objects)
- **Async Thunks:** Load and parse resources on demand
- **Parsers:** Convert AGI file formats to viewer-compatible objects
- **@agikit Components:** Render pictures, views, and sounds using AGI's original format

### Resource Loading Pattern

```typescript
// User clicks resource ID in browser
↓
// Redux thunk dispatched (e.g., loadPictureResource)
↓
// resourcesAPI.ts fetches file from /resources/pic/123.agipic
↓
// Parser converts file to EditingPictureResource
↓
// Stored in resourceCache (not Redux - non-serializable)
↓
// Viewer component reads from cache and displays
```

---

## Translation Architecture Summary

The `TRANSLATION_ARCHITECTURE.md` file contains detailed information on translating AGI games to languages like Hebrew. Key concepts:

### Files That Need Translation

1. **Logic files (.lgc)** - Game messages via `#message` declarations
2. **OBJECT file** - Inventory item names (binary format)
3. **WORDS.TOK** - Parser vocabulary (binary, ASCII only)
4. **WORDS.TOK.EXTENDED** - Extended vocabulary (text, supports Hebrew/Cyrillic)
5. **VIEWDIR** - Inventory descriptions embedded in view resources

### Core Challenges

- Standard AGI format doesn't support extended characters (128-255)
- Logic files need conversion to target encoding (e.g., Windows-1255 for Hebrew)
- Vocabulary split into two files: ASCII for compilation, extended for runtime

### Translation Workflow

1. Extract messages/objects/words from original files
2. Translate to target language (Hebrew, etc.)
3. Import translations back to files with proper encoding
4. Compile with WinAGI (configured for target encoding)
5. Test in ScummVM with extended character support

---

## Important Notes for Future Work

### Git Ignore Strategy

- ALL game files are gitignored (copyright protection)
- Only tooling, documentation, and viewer code are committed
- Users must provide their own legal copy of Space Quest 2

### Testing with Template

The `template/` directory contains a minimal AGI project from agikit's author. Use this for:

- Testing scripts without requiring a full AGI game
- Verifying agikit integration
- Developing generic translation tools on a smaller dataset
- Ensuring tools work on different AGI games (not just Space Quest 2)

---

## Common Workflows

### Adding Game Files for First Time

```bash
# 1. Place your AGI game zip file in project/ directory
#    (e.g., sq2.zip, kq4.zip, lsl1.zip - any Sierra AGI game)
# 2. Run setup
npm run setup
# 3. Start viewer
npm run viewer:dev
# 4. Open http://localhost:3000
```

### Viewing Different Resources

- Navigate to http://localhost:3000
- Sidebar shows all resources by type (Pictures, Views, Sounds, Logic)
- Click any number to view that resource
- URLs: `/pic/123`, `/view/45`, `/sound/7`, `/logic/0`

### Starting Fresh

```bash
npm run clean        # Removes all game files
# Add new zip file to project/
npm run setup        # Re-extract and decompile
```

### Working on Viewer Features

```bash
npm run viewer:dev   # Hot reload enabled
# Edit files in viewer/src/
# Changes auto-reload in browser
```

### Building AGI Game with Encoding

This project uses **agikit-slim** with Windows-1255 encoding support for Hebrew translations.

```bash
# Build main project (uses --encoding windows-1255)
npm run build

# Build example project (uses --encoding windows-1255)
npm run example:build

# Build indexed translations (uses --encoding windows-1255)
npm run build-index
npm run example:build-index
```

**What gets encoded:**
- Logic file messages (`#message` declarations)
- Object names (inventory items)
- View descriptions (embedded text in graphics)

**Encoding support:**
- All build commands use `--encoding windows-1255` by default
- Supports any single-byte encoding (windows-1251, iso-8859-8, etc.)
- Multi-byte encodings (UTF-8, UTF-16) are NOT supported by AGI

**Manual build command:**
```bash
agikit build <projectdir> --encoding windows-1255
```

---

## File Format Quick Reference

### AGI Resource Files (in project/src/ and viewer/public/resources/)

- `*.agipic` - Picture resources (JSON format from agikit)
- `*.agiview` - View resources (binary sprite data)
- `*.agisound` - Sound resources (binary audio data)
- `*.agilogic` - Logic scripts (text format from agikit)
- `object.json` - Inventory objects (JSON from agikit)
- `words.txt` - Vocabulary (text format from agikit)

### Original AGI Files (in project/orig/)

- `VOL.0`, `VOL.1`, `VOL.2` - Resource volume files
- `LOGDIR`, `PICDIR`, `VIEWDIR`, `SNDDIR` - Resource directories
- `OBJECT` - Inventory objects (binary)
- `WORDS.TOK` - Vocabulary (binary)
- `AGI` - Game metadata

---

## Useful Links

- **agikit-slim:** https://github.com/sam-mfb/agikit-slim (used in this project - supports Windows-1255 encoding)
- **agikit:** https://github.com/nbudin/agikit (original project)
- **AGI Wiki:** http://agiwiki.sierrahelp.com/
- **AGIHebrew Reference:** https://github.com/SegMash/AGIHebrew
- **ScummVM:** https://www.scummvm.org/
- **AGI Specs:** http://agispecs.sierrahelp.com/

---

## Tips for Claude

### Before Making Changes

1. Check if game files exist (`project/src/` directory)
2. Understand viewer uses @agikit components (don't reinvent rendering)
3. Remember: non-serializable data goes in resourceCache, not Redux
4. Binary file editing requires understanding AGI format specs

### Working with Scripts

**IMPORTANT:** All scripts are written in TypeScript and located in `scripts/` directory.

- Scripts use ES modules (import/export)
- Scripts are executed with `vite-node` (cross-platform)
- Shared utilities are in `scripts/utils/` (logger, fs-utils, exec-utils)

**After modifying any script, ALWAYS run:**
```bash
npm run typecheck:scripts
```

This ensures type safety and catches errors before runtime.

### Red Flags

- ❌ Don't commit game files (copyright violation)
- ❌ Don't store binary data in Redux (use resourceCache)
- ❌ Don't hardcode resource IDs (they vary by game version)
- ❌ Don't hardcode Space Quest 2-specific logic (keep tools generic for all AGI games)
- ❌ Don't assume specific inventory object counts, logic numbers, or game structure
- ❌ Don't modify scripts without running `npm run typecheck:scripts` afterwards

---

## Developing Translation Tools

### Architecture
- **Core logic**: `src/logic/` (testable modules with TypeScript)
- **CLI wrappers**: `scripts/` (thin wrappers that call src/ modules)
- **Tests**: `src/logic/__tests__/` using Vitest
- **Fixtures**: Copy real files from `example/src/logic/` for testing

### TDD Workflow
1. Write tests first (red phase) - `npm test -- --run`
2. Implement in `src/logic/` (green phase)
3. Create CLI wrapper in `scripts/`
4. Typecheck: `npm run typecheck:scripts`
5. Verify: `npm test`

### Key Patterns
```typescript
// Object indexing (run FIRST)
import { parseObjectFile } from '../src/logic/object-parser.js';
import { indexObjects } from '../src/logic/object-indexer.js';
const objectFile = parseObjectFile(objectJsonContent);
const result = indexObjects(logicContent, objectFile.objects);

// Message indexing (run SECOND, after object indexing)
import { parseLogicFile } from '../src/logic/parser.js';
import { indexMessages } from '../src/logic/indexer.js';
const logicFile = parseLogicFile(content);
const result = indexMessages(logicFile);

// Batch process files
import { findFiles } from './utils/fs-utils.js';
const files = findFiles('path/to/logic', /\.agilogic$/);
```

### AGI Logic File Quirks
- Section separator: `// messages` (appears after `return()`)
- Message numbers can have gaps (1, 2, 5, 10 is valid)
- Escaped strings: `"He said \"hello\""`
- Placeholders: `%v0`, `%w1`, `%s0`, `%m0` (preserve these!)
- Skip `said()` commands (vocabulary, not translatable text)
- Object references: `iN` (i0, i1, i2) for inventory objects from object.json
- **Order matters**: Run object indexing before message indexing

### Design Principles
- **Non-destructive**: Always output to `tmp/` or new directory
- **Pure functions**: Don't mutate input
- **Generic**: Work with any AGI game, not just SQ2
- **Test-driven**: Write tests before implementation

---

**End of CLAUDE.md**
