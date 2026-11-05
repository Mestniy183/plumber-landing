import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'src/img');

// Функция для рекурсивного поиска файлов
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(inputDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Конвертируем
    sharp(filePath)
      .webp({ quality: 80 }) // Настройте качество по вкусу
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ Конвертирован: ${filePath} -> ${outputPath}`);
        // Удаляем оригинал (раскомментируйте, если хотите удалить старые файлы)
        fs.unlinkSync(filePath); 
      })
      .catch(err => console.error(`❌ Ошибка с ${filePath}:`, err));
  }
});