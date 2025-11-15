# Space Quest 2: Vohaul's Revenge - AGI Resource Viewer

A web-based viewer for Space Quest 2 AGI game resources, built with React, TypeScript, and Vite.

## Overview

This project provides a modern web interface for viewing and exploring AGI (Adventure Game Interpreter) resources from Space Quest 2: Vohaul's Revenge. It uses [@agikit](https://github.com/nbudin/agikit) to decompile and parse the original game resources.

## Features

- 📷 **Picture Viewer** - View AGI picture resources with the PicEditor
- 🎨 **View/Sprite Viewer** - Explore animated sprites and character views
- 🔊 **Sound Viewer** - Play IBM PCjr sound resources
- 📜 **Logic Script Viewer** - Browse decompiled AGI logic scripts

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A legal copy of Space Quest 2 (AGI version)

## Setup

1. **Clone this repository**
   ```bash
   git clone https://github.com/sam-mfb/sq2heb.git
   cd sq2heb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your Space Quest 2 game files**
   - Create a ZIP file containing all your Space Quest 2 game files
   - The files should be at the root of the ZIP (e.g., `AGI`, `VOL.0`, `VOL.1`, `VOL.2`, etc.)
   - Place the ZIP file in the `project/` directory
   - See `project/README.md` for detailed instructions

4. **Run the setup script**
   ```bash
   npm run setup
   ```

   This will:
   - Extract your game files to `project/orig/`
   - Decompile resources to `project/src/` using agikit
   - Copy resources to the viewer
   - Generate a resource manifest

5. **Start the development server**
   ```bash
   npm run viewer:dev
   ```

   The viewer will be available at `http://localhost:3000`

## Project Structure

```
sq2heb/
├── project/              # Game resource directory
│   ├── README.md        # Setup instructions
│   ├── *.zip           # Your game files (gitignored)
│   ├── orig/           # Extracted originals (gitignored)
│   ├── src/            # Decompiled resources (gitignored)
│   └── build/          # Build output (gitignored)
├── viewer/              # React viewer application
│   ├── src/
│   │   ├── features/   # Feature-based components
│   │   ├── services/   # Resource cache service
│   │   └── utils/      # Parsers and utilities
│   └── public/
│       └── resources/  # Copied game resources (gitignored)
├── scripts/             # Build and setup scripts
└── package.json
```

## Available Scripts

- `npm run setup` - Extract and set up game resources
- `npm run viewer:dev` - Start the development server
- `npm run viewer:build` - Build the viewer for production
- `npm run build` - Build the AGI game with agikit

## Technical Details

### Architecture

- **Frontend**: React 17 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Build Tool**: Vite
- **AGI Toolkit**: @agikit/core and @agikit/react-editors

### Resource Cache

To maintain Redux serializability while handling binary data (Uint8Array buffers), the viewer uses a resource cache service that stores non-serializable data outside of Redux state.

## Copyright Notice

This viewer application is provided for educational and archival purposes. You must own a legal copy of Space Quest 2 to use this viewer. All Space Quest intellectual property belongs to Sierra On-Line/Activision.

The game files themselves are **not** included in this repository and must be provided by the user.

## License

ISC

## Credits

- Built with [@agikit](https://github.com/nbudin/agikit) by nbudin
- Space Quest 2: Vohaul's Revenge © Sierra On-Line
