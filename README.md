# Space Quest 2: Vohaul's Revenge - AGI Resource Viewer

A web-based viewer for exploring Space Quest 2 game resources. View pictures, sprites, sounds, and decompiled logic scripts from the classic Sierra AGI game.

## What is this?

This project provides a modern web interface for viewing AGI (Adventure Game Interpreter) resources from Space Quest 2: Vohaul's Revenge. It uses [@agikit](https://github.com/nbudin/agikit) to decompile and display the game's resources.

**Note:** You must own a legal copy of Space Quest 2 to use this viewer. The game files are not included and must be provided by you.

## Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/sam-mfb/sq2heb.git
   cd sq2heb
   npm install
   ```

2. **Add your game files**
   - Create a ZIP file containing your Space Quest 2 game files
   - Place the ZIP file in the `project/` directory
   - See `project/README.md` for details

3. **Run setup**

   ```bash
   npm run setup
   ```

4. **Start the viewer**

   ```bash
   npm run viewer:dev
   ```

   Open `http://localhost:3000` in your browser.

## Translation Tools

This project includes tools for preparing AGI logic files for translation by converting hardcoded strings and inventory objects to indexed references, and extracting translatable content to JSON files.

### Translation Extraction

Extract all translatable content (messages, objects, vocabulary) to JSON files for easy editing:

```bash
# Extract from main project
npm run extract-translations

# Extract from example project
npm run example:extract-translations
```

This creates three JSON files in subdirectories under `translations/`:

- **translations/project/** - Main project translations
- **translations/example/** - Example project translations

Each directory contains:
- **messages.json** - All text messages from logic files (311 messages in example)
- **objects.json** - All inventory object names (1 object in example)
- **vocabulary.json** - All parser vocabulary words (44 word groups in example)

**JSON Format:**

Each file includes metadata and an array of translatable items with these fields:
- `original`: Source English text
- `translation`: Target language text (empty until translated)
- `notes`: Optional notes for translators
- Plus context-specific fields (messageNumber, index, wordNumber, placeholders, etc.)

**Example (messages.json):**
```json
{
  "logicFile": "0.agilogic",
  "messageNumber": 3,
  "original": "I don't understand \\\"%w3\\\"",
  "translation": "",
  "notes": "",
  "placeholders": ["%w3"]
}
```

The placeholder detector automatically identifies `%w1`, `%w2`, `%w3`, `%v`, `%s`, and `%m<number>` placeholders that must be preserved in translations.

### Complete Translation Workflow

Process your game files through the complete indexing and build pipeline:

```bash
# 1. Index objects and messages (creates project/tmp/src/)
npm run index

# 2. Build the indexed game (creates project/tmp/build/)
npm run build-index

# 3. Package as ZIP file (creates project/tmp/agi-build.zip)
npm run zip-index-build
```

**What happens during indexing:**

1. **Object Indexing** (runs first):
   - Reads inventory object names from `object.json`
   - Replaces hardcoded object strings with references (i0, i1, i2, etc.)
   - Only replaces in inventory commands: `get()`, `put()`, `drop()` and their `.v()` variants
   - Exact match only (preserves quotes)

2. **Message Indexing** (runs second):
   - Finds hardcoded strings in display commands (`print`, `display`, `set.menu`, etc.)
   - Matches against existing `#message` declarations (with escape sequence normalization)
   - Replaces matches with message references (m1, m2, m3, etc.)
   - Adds new `#message` declarations for strings without matches
   - Preserves exact whitespace and special characters

3. **Both indexers skip `said()` commands** - these use vocabulary words, not objects or messages

**Example transformation:**

```agi
// Before indexing
if (has("Key")) {
  print("You have the key!");
}

// After indexing
if (has(i2)) {
  print(m5);
}

// messages
#message 5 "You have the key!"
```

### Individual Tools

For more control, you can run the indexing tools separately:

```bash
# Object indexing only
npm run index-objects <input-dir> <output-dir>

# Message indexing only
npm run index-messages <input-dir> <output-dir>
```

**Note:** Always run object indexing before message indexing to avoid conflicts.

### Testing with Example Project

The repository includes a small example AGI project for testing the tooling without requiring a full game:

```bash
# Setup example project
npm run example:setup

# Index the example files
npm run example:index

# Build the indexed example
npm run example:build-index

# Package the example build
npm run example:zip-index-build

# Clean example files
npm run example:clean
```

### Development Workflow

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Typecheck all scripts
npm run typecheck:scripts

# Clean generated files
npm run clean          # Clean project files
npm run example:clean  # Clean example files
```
