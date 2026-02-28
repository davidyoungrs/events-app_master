const fs = require('fs');
const path = require('path');

const ARGS = process.argv.slice(2);
const help = ARGS.includes('--help') || ARGS.includes('-h');

if (help || ARGS.length === 0) {
    console.log(`
Event Site Deployment Helper

Usage:
  node deploy.js --config <path> --agenda <path> [--discover <path>] [--presenters <path>]

Options:
  --config      Path to the new eventConfig.json
  --agenda      Path to the new agenda.csv
  --discover    Path to the new discoverData.json (optional)
  --presenters  Path to the new presenters.csv (optional)
    `);
    process.exit(0);
}

const getArgValue = (flag) => {
    const index = ARGS.indexOf(flag);
    return index !== -1 ? ARGS[index + 1] : null;
};

const configPath = getArgValue('--config');
const agendaPath = getArgValue('--agenda');
const discoverPath = getArgValue('--discover');
const presentersPath = getArgValue('--presenters');

const DEST_DIR = path.join(__dirname, '../../../../src/data');

const copyFile = (src, destName) => {
    if (!src) return;
    const dest = path.join(DEST_DIR, destName);
    try {
        fs.copyFileSync(src, dest);
        console.log(`Successfully updated: ${destName}`);
    } catch (err) {
        console.error(`Error updating ${destName}:`, err.message);
    }
};

// Ensure data directory exists
if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

console.log('--- Starting Deployment ---');
copyFile(configPath, 'eventConfig.json');
copyFile(agendaPath, 'agenda.csv');
copyFile(discoverPath, 'discoverData.json');
copyFile(presentersPath, 'presenters.csv');
console.log('--- Deployment Complete ---');
console.log('Please run "npm run build" to verify the changes.');
