import { log } from './utils/logger.js';
import { exists, removeDir } from './utils/fs-utils.js';
import { exec } from './utils/exec-utils.js';

log.section('🎮 Example AGI Project Setup');

// Check if example directory exists
if (!exists('example')) {
  log.error('example/ directory not found');
  process.exit(1);
}

// Check if orig exists
if (!exists('example/orig')) {
  log.error('example/orig/ directory not found');
  log.info('The example project should have pre-compiled AGI files in example/orig/');
  process.exit(1);
}

log.success('Found example AGI files in example/orig/');
log.newline();

// Clean up existing directories (keep orig/ intact)
log.emoji('🧹', 'Cleaning up old files...');
removeDir('example/src');
removeDir('example/build');
removeDir('viewer/public/resources');

// Run common AGI setup
exec('vite-node scripts/setup-agi.ts example');

log.emoji('✅', 'Setup complete!');
log.newline();
log.info('You can now:');
log.info('  • Run the viewer: npm run viewer:dev');
log.info('  • Build the example: npm run example:build');
