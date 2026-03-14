// 俄罗斯方块游戏主逻辑
class TetrisGame {
    constructor() {
        // 游戏常量
        this.COLS = 10;
        this.ROWS = 20;
        this.BLOCK_SIZE = 30;
        
        // 方块颜色
        this.COLORS = [
            null,
            '#00FFFF', // I - 青色
            '#0000FF', // J - 蓝色
            '#FFA500', // L - 橙色
            '#FFFF00', // O - 黄色
            '#00FF00', // S - 绿色
            '#800080', // T - 紫色
            '#FF0000'  // Z - 红色
        ];
        
        // 方块形状定义
        this.SHAPES = [
            null,
            [ // I
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]
            ],
            [ // J
                [2,0,0],
                [2,2,2],
                [0,0,0]
            ],
            [ // L
                [0,0,3],
                [3,3,3],
                [0,0,0]
            ],
            [ // O
                [4,4],
                [4,4]
            ],
            [ // S
                [0,5,5],
                [5,5,0],
                [0,0,0]
            ],
            [ // T
                [0,6,0],
                [6,6,6],
                [0,0,0]
            ],
            [ // Z
                [7,7,0],
                [0,7,7],
                [0,0,0]
            ]
        ];
        
        // 游戏状态
        this.board = [];
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        
        // 当前和下一个方块
        this.player = {
            pos: {x: 0, y: 0},
            matrix: null,
            type: 0
        };
        
        this.nextPiece = null;
        
        // 获取DOM元素
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('nextCanvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        // 分数显示元素
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');
        this.gameOverElement = document.getElementById('gameOver');
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化游戏
        this.init();
    }
    
    init() {
        // 初始化游戏板
        this.createBoard();
        
        // 创建第一个和下一个方块
        this.nextPiece = this.createPiece();
        this.resetPlayer();
        
        // 更新显示
        this.updateDisplay();
        
        console.log('俄罗斯方块游戏已初始化！');
        console.log('控制说明:');
        console.log('← → : 左右移动');
        console.log('↑ : 旋转方块');
        console.log('↓ : 加速下落');
        console.log('空格 : 直接落下');
        console.log('P : 暂停/继续');
    }
    
    createBoard() {
        // 创建空游戏板
        this.board = Array.from({length: this.ROWS}, () => Array(this.COLS).fill(0));
    }
    
    createPiece(type) {
        const pieceType = type || Math.floor(Math.random() * 7) + 1;
        return {
            matrix: JSON.parse(JSON.stringify(this.SHAPES[pieceType])),
            type: pieceType
        };
    }
    
    resetPlayer() {
        // 使用预览的方块
        this.player.matrix = this.nextPiece.matrix;
        this.player.type = this.nextPiece.type;
        this.player.pos.y = 0;
        this.player.pos.x = Math.floor(this.COLS / 2) - Math.floor(this.player.matrix[0].length / 2);
        
        // 生成新的预览方块
        this.nextPiece = this.createPiece();
        this.drawNextPiece();
        
        // 检查游戏是否结束
        if (this.collide()) {
            this.gameOver = true;
            this.showGameOver();
        }
    }
    
    collide() {
        const [m, p] = [this.player.matrix, this.player.pos];
        
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                if (m[y][x] !== 0 &&
                    (this.board[y + p.y] &&
                     this.board[y + p.y][x + p.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
    
    merge() {
        // 将当前方块合并到游戏板
        this.player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.board[y + this.player.pos.y][x + this.player.pos.x] = value;
                }
            });
        });
    }
    
    rotate(matrix, dir) {
        // 转置矩阵
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < y; x++) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        
        // 根据方向翻转
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }
    
    playerRotate(dir) {
        if (this.isPaused || this.gameOver) return;
        
        const pos = this.player.pos.x;
        let offset = 1;
        
        // 复制当前方块进行旋转测试
        const matrixCopy = JSON.parse(JSON.stringify(this.player.matrix));
        this.rotate(matrixCopy, dir);
        
        // 测试旋转后的碰撞
        const originalMatrix = this.player.matrix;
        this.player.matrix = matrixCopy;
        
        while (this.collide()) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            
            if (offset > this.player.matrix[0].length) {
                // 旋转失败，恢复原状
                this.player.matrix = originalMatrix;
                this.player.pos.x = pos;
                return;
            }
        }
    }
    
    playerMove(dir) {
        if (this.isPaused || this.gameOver) return;
        
        this.player.pos.x += dir;
        
        if (this.collide()) {
            this.player.pos.x -= dir;
        }
    }
    
    playerDrop() {
        if (this.isPaused || this.gameOver) return;
        
        this.player.pos.y++;
        
        if (this.collide()) {
            this.player.pos.y--;
            this.merge();
            this.resetPlayer();
            this.sweep();
            this.updateDisplay();
        }
        
        this.dropCounter = 0;
    }
    
    playerHardDrop() {
        if (this.isPaused || this.gameOver) return;
        
        while (!this.collide()) {
            this.player.pos.y++;
        }
        
        this.player.pos.y--;
        this.playerDrop();
    }
    
    sweep() {
        let rowCount = 0;
        
        // 从底部向上检查完整行
        outer: for (let y = this.board.length - 1; y >= 0; y--) {
            for (let x = 0; x < this.board[y].length; x++) {
                if (this.board[y][x] === 0) {
                    continue outer;
                }
            }
            
            // 移除完整行
            const row = this.board.splice(y, 1)[0].fill(0);
            this.board.unshift(row);
            y++;
            rowCount++;
        }
        
        if (rowCount > 0) {
            // 更新分数和行数
            this.lines += rowCount;
            const linePoints = [0, 100, 300, 500, 800];
            this.score += linePoints[rowCount] * this.level;
            
            // 更新等级
            this.level = Math.floor(this.lines / 10) + 1;
            
            // 加快下落速度
            this.dropInterval = Math.max(50, 1000 - (this.level - 1) * 100);
        }
    }
    
    drawBlock(ctx, x, y, type) {
        // 绘制方块主体
        ctx.fillStyle = this.COLORS[type];
        ctx.fillRect(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE, this.BLOCK_SIZE, this.BLOCK_SIZE);
        
        // 绘制方块边框
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE, this.BLOCK_SIZE, this.BLOCK_SIZE);
        
        // 绘制高光效果
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE, this.BLOCK_SIZE - 2, 3);
        ctx.fillRect(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE, 3, this.BLOCK_SIZE - 2);
        
        // 绘制阴影效果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x * this.BLOCK_SIZE + 3, y * this.BLOCK_SIZE + this.BLOCK_SIZE - 3, this.BLOCK_SIZE - 3, 3);
        ctx.fillRect(x * this.BLOCK_SIZE + this.BLOCK_SIZE - 3, y * this.BLOCK_SIZE + 3, 3, this.BLOCK_SIZE - 3);
    }
    
    draw() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已落下的方块
        this.board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.drawBlock(this.ctx, x, y, value);
                }
            });
        });
        
        // 绘制当前方块
        if (this.player.matrix) {
            this.player.matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        this.drawBlock(
                            this.ctx,
                            x + this.player.pos.x,
                            y + this.player.pos.y,
                            value
                        );
                    }
                });
            });
        }
        
        // 绘制网格线
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        // 垂直线
        for (let x = 0; x <= this.COLS; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.BLOCK_SIZE, 0);
            this.ctx.lineTo(x * this.BLOCK_SIZE, this.ROWS * this.BLOCK_SIZE);
            this.ctx.stroke();
        }
        
        // 水平线
        for (let y = 0; y <= this.ROWS; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.BLOCK_SIZE);
            this.ctx.lineTo(this.COLS * this.BLOCK_SIZE, y * this.BLOCK_SIZE);
            this.ctx.stroke();
        }
    }
    
    drawNextPiece() {
        this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (!this.nextPiece) return;
        
        const matrix = this.nextPiece.matrix;
        const offsetX = (4 - matrix[0].length) / 2;
        const offsetY = (4 - matrix.length) / 2;
        
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    // 缩放绘制预览方块
                    const scale = 25;
                    this.nextCtx.fillStyle = this.COLORS[value];
                    this.nextCtx.fillRect(
                        (x + offsetX) * scale,
                        (y + offsetY) * scale,
                        scale,
                        scale
                    );
                    
                    this.nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    this.nextCtx.lineWidth = 1;
                    this.nextCtx.strokeRect(
                        (x + offsetX) * scale,
                        (y + offsetY) * scale,
                        scale,
                        scale
                    );
                }
            });
        });
    }
    
    update(time = 0) {
        if (this.gameOver) return;
        
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        
        if (!this.isPaused) {
            this.dropCounter += deltaTime;
            
            if (this.dropCounter > this.dropInterval) {
                this.playerDrop();
            }
            
            this.draw();
        }
        
        requestAnimationFrame((time) => this.update(time));
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.linesElement.textContent = this.lines;
    }
    
    showGameOver() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLines').textContent = this.lines;
        document.getElementById('finalLevel').textContent = this.level;
        this.gameOverElement.style.display = 'flex';
    }
    
    hideGameOver() {
        this.gameOverElement.style.display = 'none';
    }
    
    startGame() {
        this.createBoard();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.dropInterval = 1000;
        
        this.nextPiece = this.createPiece();
        this.resetPlayer();
        
        this.updateDisplay();
        this.hideGameOver();
        
        this.lastTime = 0;
        this.dropCounter = 0;
        
        // 开始游戏循环
        requestAnimationFrame((time) => this.update(time));
    }
    
    togglePause() {
        if (this.gameOver) return;
        
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.innerHTML = this.isPaused ? 
            '<i class="fas fa-play"></i> 继续 (P)' : 
            '<i class="fas fa-pause"></i> 暂停 (P)';
    }
    
    bindEvents() {
        // 键盘控制
        document.addEventListener('keydown', (event) => {
            if (this.gameOver && event.key !== 'r' && event.key !== 'R') return;
            
            switch(event.key) {
                case 'ArrowLeft':
                    this.playerMove(-1);
                    break;
                case 'ArrowRight':
                    this.playerMove(1);
                    break;
                case 'ArrowDown':
                    this.playerDrop();
                    break;
                case 'ArrowUp':
                    this.playerRotate(1);
                    break;
                case ' ':
                    this.playerHardDrop();
                    break;
                case 'p':
                case 'P':
                    this.togglePause();
                    break;
                case 'r':
                case 'R':
                    if (this.gameOver) {
                        this.startGame();
                    }
                    break;
            }
        });
        
        // 按钮控制
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.startGame();
        });
    }
}

// 页面加载完成后启动游戏
window.addEventListener('DOMContentLoaded', () => {
    const game = new TetrisGame();
    
    // 显示欢迎信息
    console.log('欢迎来到俄罗斯方块！');
    console.log('游戏已准备好，点击"开始游戏"按钮或按任意方向键开始。');
});