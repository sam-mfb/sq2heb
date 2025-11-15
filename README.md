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

## License

ISC

---

Built with [@agikit](https://github.com/nbudin/agikit) • Space Quest 2 © Sierra On-Line
