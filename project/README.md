# Space Quest 2 Project Setup

This directory contains the extracted AGI resources for Space Quest 2: Vohaul's Revenge.

## Setup Instructions

1. **Obtain a legal copy of Space Quest 2**
   - You must own the game to use this viewer
   - The game files should be the original AGI version

2. **Create a ZIP file**
   - Compress all the Space Quest 2 game files into a ZIP archive
   - The files should be at the root of the ZIP (not in a subdirectory)
   - Expected files include: `AGI`, `VOL.0`, `VOL.1`, `VOL.2`, `LOGDIR`, `PICDIR`, `VIEWDIR`, `SNDDIR`, `OBJECT`, `WORDS.TOK`, etc.

3. **Add the ZIP file**
   - Place your ZIP file in this `project/` directory
   - The file can have any name (e.g., `sq2.zip`, `space-quest-2.zip`, etc.)

4. **Run the setup script**
   ```bash
   npm run setup
   ```

This will:
- Extract the ZIP file to `project/orig/`
- Use agikit to decompile resources to `project/src/`
- Create the `project/build/` directory for builds
- Copy resources to `viewer/public/resources/` for the web viewer

## Directory Structure

After running setup, you'll have:

```
project/
  ├── README.md (this file)
  ├── *.zip (your game files - gitignored)
  ├── orig/ (extracted original game files - gitignored)
  ├── src/ (decompiled AGI resources - gitignored)
  └── build/ (build output - gitignored)
```

## Note

All game files (`*.zip`, `orig/`, `src/`, `build/`) are excluded from git to respect copyright.
You must provide your own legal copy of the game.
