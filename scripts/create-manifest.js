const fs = require('fs');
const path = require('path');

const resourcesDir = path.join(__dirname, '../viewer/public/resources');
const manifestPath = path.join(resourcesDir, 'manifest.json');

function getResourceIds(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir)
    .filter(file => file.match(/^\d+\.agi/))
    .map(file => parseInt(file.split('.')[0]))
    .sort((a, b) => a - b);
}

const manifest = {
  pics: getResourceIds(path.join(resourcesDir, 'pic')),
  views: getResourceIds(path.join(resourcesDir, 'view')),
  sounds: getResourceIds(path.join(resourcesDir, 'sound')),
  logics: getResourceIds(path.join(resourcesDir, 'logic')),
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✓ Created manifest.json');
console.log(`  - ${manifest.pics.length} pictures`);
console.log(`  - ${manifest.views.length} views`);
console.log(`  - ${manifest.sounds.length} sounds`);
console.log(`  - ${manifest.logics.length} logic scripts`);
