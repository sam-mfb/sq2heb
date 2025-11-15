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

This project includes tools for preparing AGI logic files for translation.

### Message Indexing

The message indexing tool converts hardcoded strings in logic files to message references, making translation easier:

```bash
# Process logic files (output to tmp/ directory)
npm run index-messages project/src

# Or specify custom output directory
npm run index-messages project/src project/indexed
```

**What it does:**
- Finds all hardcoded strings in commands (print, display, set.menu, etc.)
- Replaces strings that match existing #message declarations with message references (m1, m2, etc.)
- Adds new #message declarations for strings without matches
- Preserves exact string matching (whitespace matters)
- Skips `said()` commands (vocabulary references, not translatable text)
- Outputs transformed files to `tmp/` directory (non-destructive)

**Example:**
```agi
// Before
print("Hello World");
set.menu("File");

// After
print(m1);
set.menu(m2);

// messages
#message 1 "Hello World"
#message 2 "File"
```

### Development Workflow

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Typecheck all scripts
npm run typecheck:scripts

# Clean generated files
npm run clean          # Clean project files
npm run example:clean  # Clean example files
```
