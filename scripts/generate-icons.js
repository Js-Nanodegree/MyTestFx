const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'icon.png': 1024,
  'ios-icon.png': 1024,
  'adaptive-icon.png': 1024,
  'splash.png': 2048,
  'splash-icon.png': 1024,
  'favicon.png': 48,
};

const sourceIcon = path.join(__dirname, '../assets/images/source-icon.png');
const outputDir = path.join(__dirname, '../assets/images');

// Создаем директорию, если она не существует
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Генерируем иконки разных размеров
Object.entries(sizes).forEach(([filename, size]) => {
  sharp(sourceIcon)
    .resize(size, size)
    .toFile(path.join(outputDir, filename))
    .then(() => console.log(`Generated ${filename}`))
    .catch(err => console.error(`Error generating ${filename}:`, err));
});
