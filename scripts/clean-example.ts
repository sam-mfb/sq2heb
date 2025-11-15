import { log } from './utils/logger.js';
import { exec } from './utils/exec-utils.js';

log.emoji('🧹', 'Cleaning example directory...');
log.newline();

// Run common AGI cleanup with --keep-orig flag to preserve example/orig/
exec('vite-node scripts/clean-agi.ts example --keep-orig');

log.emoji('✅', 'Cleanup complete!');
log.newline();
log.info('The example/src/ and example/build/ directories have been removed.');
log.info("The example/orig/ directory has been preserved (it's committed to version control).");
log.info("Run 'npm run example:setup' to re-extract resources.");
