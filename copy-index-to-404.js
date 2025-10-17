const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist/ux-theme-builder/browser');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

try {
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✅ Successfully copied index.html to 404.html');
  } else {
    console.error('❌ index.html not found at:', indexPath);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying file:', error);
  process.exit(1);
}
