import fs from 'fs';
import path from 'path';

function copyContents(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });

    fs.readdirSync(src).forEach((item) => {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      copyContents(srcItem, destItem);
    });
  } else if (stats.isFile() && path.extname(src).toLowerCase() === '.png') {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} → ${dest}`);
  }
}

// Esports
copyContents(path.resolve('./esports'), path.resolve('./public/esports'));

// Committees
copyContents(path.resolve('./committees'), path.resolve('./public/committees'));
