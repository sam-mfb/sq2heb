import { log } from './utils/logger.js';
import { findFiles, removeFile } from './utils/fs-utils.js';
import { exec } from './utils/exec-utils.js';

log.emoji('🧹', 'Cleaning project directory...');
log.newline();

// Remove ZIP files
const zipFiles = findFiles('project', /\.zip$/);
if (zipFiles.length > 0) {
  log.step('Removing ZIP files...');
  zipFiles.forEach(removeFile);
}

// Run common AGI cleanup (without --keep-orig, so it removes orig/ too)
exec('vite-node scripts/clean-agi.ts project');

log.emoji('✅', 'Cleanup complete!');
log.newline();
log.info('The project/ directory is now clean.');
log.info("Add a new ZIP file to project/ and run 'npm run setup' to start over.");
