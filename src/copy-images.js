import fs from 'fs';
import path from 'path';

function copyContents(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    const destDir = path.join(path.dirname(dest), path.basename(dest).toLowerCase());
    fs.mkdirSync(destDir, { recursive: true });

    fs.readdirSync(src).forEach((item) => {
      const srcItem = path.join(src, item);
      const destItem = path.join(destDir, item.toLowerCase());
      copyContents(srcItem, destItem);
    });
  } else if (stats.isFile() && path.extname(src).toLowerCase() === '.png') {
    const destFile = path.join(path.dirname(dest), path.basename(dest).toLowerCase());
    fs.copyFileSync(src, destFile);
    console.log(`Copied: ${src} → ${destFile}`);
  }
}

// Esports
copyContents(path.resolve('./esports'), path.resolve('./public/esports'));

// Committees
copyContents(path.resolve('./committees'), path.resolve('./public/committees'));
