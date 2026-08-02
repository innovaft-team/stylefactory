import fs from 'fs';

// Read the JSON list we wrote earlier
const unusedList = JSON.parse(fs.readFileSync('unused-files.json', 'utf8'));

// Add the other definitely unused .jpg files in homegrid
const extraHomegridJpgs = [
  'public/images/homegrid/1.jpg',
  'public/images/homegrid/2.jpg',
  'public/images/homegrid/3.jpg',
  'public/images/homegrid/4.jpg',
  'public/images/homegrid/5.jpg',
  'public/images/homegrid/6.jpg',
  'public/images/homegrid/9.jpg',
];

// Add the original files we converted to WebP
const convertedOriginals = [
  'public/images/home-redesign/hero.png',
  'public/images/home-redesign/jacket.png',
  'public/images/home-redesign/shirt-sketch.png',
  'public/images/home-redesign/timeline-contour.png',
  'public/images/home-redesign/timeline-flower.png',
  'public/images/home-redesign/timeline-ring.png',
  'public/images/home-redesign/consultation.jpg',
  'public/images/home-redesign/fabric-board.jpg',
  'public/images/home-redesign/pants-sketch.jpg',
  'public/images/home-redesign/pants-render.jpg',
];

const allToDelete = new Set([
  ...unusedList,
  ...extraHomegridJpgs,
  ...convertedOriginals
]);

console.log(`Starting deletion of ${allToDelete.size} unused or redundant files...`);

let totalSavedBytes = 0;
let deletedCount = 0;

for (const file of allToDelete) {
  if (fs.existsSync(file)) {
    try {
      const stats = fs.statSync(file);
      totalSavedBytes += stats.size;
      fs.unlinkSync(file);
      console.log(`Deleted: ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
      deletedCount++;
    } catch (err) {
      console.error(`Error deleting ${file}:`, err.message);
    }
  }
}

console.log(`\nSuccessfully deleted ${deletedCount} files.`);
console.log(`Total storage saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB!`);

// Clean up helper scripts
try {
  fs.unlinkSync('find-unused.js');
  fs.unlinkSync('unused-files.json');
  fs.unlinkSync('optimize-images.js');
} catch (e) {}
