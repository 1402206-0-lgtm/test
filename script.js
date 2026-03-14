// script.js - Google Stitch 生成的基礎交互 + Roo Code 整合

// 使用 Roo Code 載入遊戲
function loadGame(gameName) {
    // 隱藏遊戲卡片區
    document.getElementById('game-container').style.display = 'none';
    
    // 顯示遊戲框架
    const gameFrame = document.getElementById('game-frame');
    gameFrame.style.display = 'block';
    
    // 根據 Roo Code 配置載入對應遊戲
    const gameIframe = document.getElementById('game-iframe');
    
    // 透過 Roo Code API 取得遊戲路徑
    if (window.RooCode && window.RooCode.getGamePath) {
        const gamePath = window.RooCode.getGamePath(gameName);
        gameIframe.src = gamePath;
    } else {
        // 預設路徑
        gameIframe.src = `games/${gameName}/index.html`;
    }
}

// 返回大廳
function backToLobby() {
    document.getElementById('game-frame').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    
    // 停止遊戲
    const gameIframe = document.getElementById('game-iframe');
    gameIframe.src = '';
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Henry\'s Game Center 已啟動');
    
    // 初始化 Roo Code
    if (window.RooCode && window.RooCode.init) {
        window.RooCode.init({
            games: ['snake', 'tetris'],
            theme: 'dark'
        });
    }
});