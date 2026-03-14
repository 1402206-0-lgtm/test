// build.js - Roo Code 建置腳本
const fs = require('fs');
const path = require('path');

// 讀取 Roo Code 配置
const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '.roo', 'config.json'), 'utf8')
);

// 建立輸出目錄
const distDir = path.join(__dirname, config.build.output || 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// 複製主頁面
fs.copyFileSync(
    path.join(__dirname, config.entry),
    path.join(distDir, 'index.html')
);

// 複製遊戲文件
config.games.forEach(game => {
    const gameDir = path.join(distDir, 'games', game.name);
    if (!fs.existsSync(gameDir)) {
        fs.mkdirSync(gameDir, { recursive: true });
    }
    
    // 複製遊戲文件
    const sourceDir = path.dirname(game.entry);
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
        fs.copyFileSync(
            path.join(sourceDir, file),
            path.join(gameDir, file)
        );
    });
});

console.log('✅ 建置完成！輸出目錄：', distDir);