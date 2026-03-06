贪吃蛇游戏 PRD
一、專案概述
專案名稱：贪吃蛇·橙球掉头版

一句話描述：一款支持WASD键位、新增橙色高分球、允许蛇头掉头且不影响长度的现代化贪吃蛇游戏

版本：V1.0

二、問題與目標
問題陳述
经典贪吃蛇游戏玩法单一，缺乏新意

传统贪吃蛇不允许掉头，限制了玩家的操作灵活性

键盘控制方式不统一，部分游戏不支持WASD键位

游戏反馈机制简单，缺少特殊奖励元素

目標
增加游戏趣味性：通过特殊食物机制提升玩家参与感

优化操作体验：同时支持方向键和WASD键位，满足不同玩家习惯

创新玩法机制：实现“掉头不影响长度”的新规则，降低新手挫败感

视觉反馈升级：不同食物类型有明显视觉区分

三、目標用戶
用戶特徵
年龄范围：15-40岁

游戏经验：轻度至中度游戏玩家

使用场景：工作休息间隙、通勤途中、休闲娱乐

设备偏好：桌面电脑（键盘操作）

用戶需求
用户类型	核心需求
怀旧玩家	保留经典玩法，但希望有新元素
休闲玩家	操作简单，容错率高
硬核玩家	追求高分挑战，希望有策略深度
新手玩家	容易上手，不会因误操作快速失败
四、用戶故事
用戶故事1：作为休闲玩家小明，我想要同时使用WASD和方向键控制蛇的移动，以便找到我最舒适的操作方式。

用戶故事2：作为高分追求者小红，我想要吃到橙色球获得更多分数（30分），以便挑战更高的游戏纪录。

用戶故事3：作为新手玩家小张，我想要在不小心按错方向时能够掉头而不会立即死亡，以便有更多容错空间继续游戏。

用戶故事4：作为视觉控玩家小李，我想要不同颜色的食物有明显的视觉区分，以便快速判断应该优先吃哪个。

五、功能需求與驗收標準
功能1：橙色特殊食物
描述：在原有红色普通食物（10分）的基础上，新增橙色球。橙色球出现概率为30%，吃掉可获得30分。

驗收標準：

Given 游戏正常运行，When 食物刷新时，Then 有约30%概率出现橙色球

Given 蛇头吃到橙色球，When 计分时，Then 分数增加30

Given 蛇头吃到橙色球，When 视觉效果呈现时，Then 橙色球有明显的发光和橙色外观

Given 食物类型切换，When 游戏继续，Then 普通食物保持红色

功能2：WASD键位支持
描述：同时支持方向键和WASD键位控制蛇的移动方向。

驗收標準：

Given 游戏运行中，When 按下W或↑键，Then 蛇头向上移动

Given 游戏运行中，When 按下A或←键，Then 蛇头向左移动

Given 游戏运行中，When 按下S或↓键，Then 蛇头向下移动

Given 游戏运行中，When 按下D或→键，Then 蛇头向右移动

Given 游戏暂停或结束时，When 按下方向键，Then 不影响游戏状态

功能3：蛇头掉头机制
描述：允许蛇头直接转向相反方向，且不会导致游戏结束，也不会额外增加蛇的长度。

驗收標準：

Given 蛇向右移动，When 玩家按下A/←键，Then 蛇头立即转向左方

Given 蛇掉头时，When 新头部与第二节重合，Then 游戏不会结束

Given 蛇掉头后，When 计算蛇的长度，Then 长度保持不变

Given 蛇掉头过程中，When 吃到食物，Then 长度正常增加（遵循进食规则）

功能4：掉头进食特殊处理
描述：当掉头动作与吃到食物同时发生时，确保长度增加逻辑正确。

驗收標準：

Given 蛇掉头且新头部位置是食物，When 吃掉食物，Then 蛇的长度增加1

Given 蛇掉头但未吃到食物，When 移动完成，Then 长度不变

功能5：游戏状态管理
描述：提供开始、暂停、重启、主题切换等基础游戏控制。

驗收標準：

Given 游戏未开始，When 点击开始按钮或按空格，Then 游戏启动

Given 游戏进行中，When 点击暂停或按P键，Then 游戏暂停

Given 游戏暂停，When 再次点击暂停，Then 游戏继续

Given 任何状态，When 点击重启或按R键，Then 游戏重置并开始新一局

六、技術約束
必須遵守
JavaScript原生实现：不依赖第三方游戏引擎

Canvas渲染：使用Canvas 2D上下文进行游戏绘制

事件监听：使用标准keydown事件处理键盘输入

游戏循环：使用requestAnimationFrame + setTimeout实现变速控制

数据持久化：使用localStorage存储最高分、最大长度等数据

兼容性要求
类别	要求
浏览器	Chrome 80+, Firefox 75+, Edge 80+, Safari 13+
操作系统	Windows 10/11, macOS 10.15+, Linux
输入设备	键盘（必须），触摸屏（可选）
分辨率	支持1920x1080及以下，画布固定600x600
不要做
❌ 不要使用jQuery或其他DOM操作库

❌ 不要实现多人联机功能

❌ 不要添加广告或内购系统

❌ 不要改变经典贪吃蛇的基本视觉风格

❌ 不要移除原有的速度调节、网格显示等功能

❌ 不要使用WebSocket或后端服务

七.現有代碼:

// 贪吃蛇游戏主逻辑
class SnakeGame {
    constructor() {
        // 游戏常量
        this.gridSize = 25; // 网格大小
        this.cellSize = 24; // 每个格子像素大小
        
        // 游戏状态
        this.score = 0;
        this.highScore = 0;
        this.snakeLength = 3;
        this.maxLength = 3;
        this.foodCount = 0;
        this.gamesPlayed = 0;
        this.gameTime = 0;
        this.gameTimer = null;
        
        // 游戏控制
        this.isPlaying = false;
        this.isPaused = false;
        this.gameOver = false;
        this.speed = 5; // 1-10
        this.wallThrough = true;
        this.showGrid = true;
        
        // 蛇的状态
        this.snake = [];
        this.direction = { x: 1, y: 0 }; // 初始向右移动
        this.nextDirection = { x: 1, y: 0 };
        
        // 食物
        this.food = { x: 0, y: 0 };
        this.foodType = 'normal'; // normal, bonus, speed
        
        // 主题
        this.themeIndex = 0;
        this.themes = [
            {
                name: '经典绿',
                snakeHead: '#4CAF50',
                snakeBody: '#81C784',
                food: '#FF5252',
                background: '#0a1929',
                grid: 'rgba(255, 255, 255, 0.05)'
            },
            {
                name: '暗黑紫',
                snakeHead: '#9C27B0',
                snakeBody: '#BA68C8',
                food: '#FF9800',
                background: '#1a1a2e',
                grid: 'rgba(255, 255, 255, 0.05)'
            },
            {
                name: '海洋蓝',
                snakeHead: '#2196F3',
                snakeBody: '#64B5F6',
                food: '#FFEB3B',
                background: '#0d1b2a',
                grid: 'rgba(255, 255, 255, 0.05)'
            },
            {
                name: '霓虹',
                snakeHead: '#00FF88',
                snakeBody: '#00CCFF',
                food: '#FF0088',
                background: '#000000',
                grid: 'rgba(255, 255, 255, 0.1)'
            }
        ];
        
        // 获取DOM元素
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 更新画布大小
        this.canvas.width = this.gridSize * this.cellSize;
        this.canvas.height = this.gridSize * this.cellSize;
        
        // 显示元素
        this.scoreElement = document.getElementById('score');
        this.lengthElement = document.getElementById('length');
        this.speedElement = document.getElementById('speed');
        this.foodCountElement = document.getElementById('foodCount');
        this.highScoreElement = document.getElementById('highScore');
        this.maxLengthElement = document.getElementById('maxLength');
        this.gamesPlayedElement = document.getElementById('gamesPlayed');
        this.gameOverElement = document.getElementById('gameOver');
        
        // 初始化
        this.init();
        this.loadHighScore();
        this.bindEvents();
    }
    
    init() {
        // 初始化蛇的位置（在中间）
        this.snake = [];
        const startX = Math.floor(this.gridSize / 2);
        const startY = Math.floor(this.gridSize / 2);
        
        for (let i = 0; i < this.snakeLength; i++) {
            this.snake.push({ x: startX - i, y: startY });
        }
        
        // 生成第一个食物
        this.generateFood();
        
        // 重置游戏状态
        this.score = 0;
        this.snakeLength = this.snake.length;
        this.foodCount = 0;
        this.gameTime = 0;
        this.gameOver = false;
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        
        // 更新显示
        this.updateDisplay();
        
        console.log('贪吃蛇游戏已初始化！');
        console.log('控制说明:');
        console.log('WASD 或方向键: 控制移动');
        console.log('空格: 加速移动');
        console.log('P: 暂停/继续');
        console.log('R: 重新开始');
        console.log('+/=: 增加速度');
        console.log('-/_ : 减少速度');
    }
    
    generateFood() {
        let foodPlaced = false;
        
        // 尝试放置食物，确保不在蛇身上
        while (!foodPlaced) {
            this.food = {
                x: Math.floor(Math.random() * this.gridSize),
                y: Math.floor(Math.random() * this.gridSize)
            };
            
            // 检查是否与蛇身重叠
            let overlap = false;
            for (let segment of this.snake) {
                if (segment.x === this.food.x && segment.y === this.food.y) {
                    overlap = true;
                    break;
                }
            }
            
            if (!overlap) {
                foodPlaced = true;
            }
        }
        
        // 随机选择食物类型
        const rand = Math.random();
        if (rand < 0.7) {
            this.foodType = 'normal';
        } else if (rand < 0.9) {
            this.foodType = 'bonus';
        } else {
            this.foodType = 'speed';
        }
    }
    
    move() {
        if (!this.isPlaying || this.isPaused || this.gameOver) return;
        
        // 更新方向
        this.direction = { ...this.nextDirection };
        
        // 计算新的头部位置
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // 穿墙处理
        if (this.wallThrough) {
            if (head.x < 0) head.x = this.gridSize - 1;
            if (head.x >= this.gridSize) head.x = 0;
            if (head.y < 0) head.y = this.gridSize - 1;
            if (head.y >= this.gridSize) head.y = 0;
        }
        
        // 检查是否撞墙
        if (!this.wallThrough && 
            (head.x < 0 || head.x >= this.gridSize || 
             head.y < 0 || head.y >= this.gridSize)) {
            this.endGame();
            return;
        }
        
        // 检查是否撞到自己
        for (let segment of this.snake) {
            if (segment.x === head.x && segment.y === head.y) {
                this.endGame();
                return;
            }
        }
        
        // 添加新的头部
        this.snake.unshift(head);
        
        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
        } else {
            // 如果没有吃到食物，移除尾部
            this.snake.pop();
        }
        
        // 更新长度
        this.snakeLength = this.snake.length;
        
        // 绘制游戏
        this.draw();
        
        // 更新显示
        this.updateDisplay();
    }
    
    eatFood() {
        let points = 10;
        
        // 根据食物类型计算分数
        switch (this.foodType) {
            case 'normal':
                points = 10;
                break;
            case 'bonus':
                points = 30;
                break;
            case 'speed':
                points = 20;
                this.speed = Math.min(10, this.speed + 1);
                this.updateSpeedDisplay();
                break;
        }
        
        // 更新分数和计数
        this.score += points;
        this.foodCount++;
        
        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
        }
        
        // 更新最大长度
        if (this.snakeLength + 1 > this.maxLength) {
            this.maxLength = this.snakeLength + 1;
            this.saveHighScore();
        }
        
        // 生成新的食物
        this.generateFood();
    }
    
    draw() {
        const theme = this.themes[this.themeIndex];
        
        // 清空画布
        this.ctx.fillStyle = theme.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格
        if (this.showGrid) {
            this.ctx.strokeStyle = theme.grid;
            this.ctx.lineWidth = 0.5;
            
            // 垂直线
            for (let x = 0; x <= this.gridSize; x++) {
                this.ctx.beginPath();
                this.ctx.moveTo(x * this.cellSize, 0);
                this.ctx.lineTo(x * this.cellSize, this.canvas.height);
                this.ctx.stroke();
            }
            
            // 水平线
            for (let y = 0; y <= this.gridSize; y++) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, y * this.cellSize);
                this.ctx.lineTo(this.canvas.height, y * this.cellSize);
                this.ctx.stroke();
            }
        }
        
        // 绘制蛇
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            
            // 蛇头特殊处理
            if (i === 0) {
                this.ctx.fillStyle = theme.snakeHead;
                this.ctx.shadowColor = theme.snakeHead;
                this.ctx.shadowBlur = 15;
                
                // 绘制蛇头
                this.ctx.fillRect(
                    segment.x * this.cellSize,
                    segment.y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
                
                // 绘制眼睛
                this.ctx.fillStyle = 'white';
                const eyeSize = this.cellSize / 5;
                const eyeOffset = this.cellSize / 3;
                
                // 根据方向确定眼睛位置
                let eye1X, eye1Y, eye2X, eye2Y;
                
                if (this.direction.x === 1) { // 向右
                    eye1X = segment.x * this.cellSize + this.cellSize - eyeOffset;
                    eye1Y = segment.y * this.cellSize + eyeOffset;
                    eye2X = segment.x * this.cellSize + this.cellSize - eyeOffset;
                    eye2Y = segment.y * this.cellSize + this.cellSize - eyeOffset;
                } else if (this.direction.x === -1) { // 向左
                    eye1X = segment.x * this.cellSize + eyeOffset;
                    eye1Y = segment.y * this.cellSize + eyeOffset;
                    eye2X = segment.x * this.cellSize + eyeOffset;
                    eye2Y = segment.y * this.cellSize + this.cellSize - eyeOffset;
                } else if (this.direction.y === 1) { // 向下
                    eye1X = segment.x * this.cellSize + eyeOffset;
                    eye1Y = segment.y * this.cellSize + this.cellSize - eyeOffset;
                    eye2X = segment.x * this.cellSize + this.cellSize - eyeOffset;
                    eye2Y = segment.y * this.cellSize + this.cellSize - eyeOffset;
                } else { // 向上
                    eye1X = segment.x * this.cellSize + eyeOffset;
                    eye1Y = segment.y * this.cellSize + eyeOffset;
                    eye2X = segment.x * this.cellSize + this.cellSize - eyeOffset;
                    eye2Y = segment.y * this.cellSize + eyeOffset;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
                this.ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
                this.ctx.fill();
                
                // 绘制瞳孔
                this.ctx.fillStyle = 'black';
                this.ctx.beginPath();
                this.ctx.arc(eye1X, eye1Y, eyeSize / 2, 0, Math.PI * 2);
                this.ctx.arc(eye2X, eye2Y, eyeSize / 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.shadowBlur = 0;
            } else {
                // 蛇身
                this.ctx.fillStyle = theme.snakeBody;
                
                // 渐变效果
                const alpha = 1 - (i / this.snake.length) * 0.5;
                this.ctx.globalAlpha = alpha;
                
                this.ctx.fillRect(
                    segment.x * this.cellSize + 1,
                    segment.y * this.cellSize + 1,
                    this.cellSize - 2,
                    this.cellSize - 2
                );
                
                // 绘制蛇身花纹
                if (i % 2 === 0) {
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    this.ctx.fillRect(
                        segment.x * this.cellSize + 5,
                        segment.y * this.cellSize + 5,
                        this.cellSize - 10,
                        this.cellSize - 10
                    );
                }
                
                this.ctx.globalAlpha = 1;
            }
        }
        
        // 绘制食物
        let foodColor;
        switch (this.foodType) {
            case 'normal':
                foodColor = '#FF5252';
                break;
            case 'bonus':
                foodColor = '#FF9800';
                break;
            case 'speed':
                foodColor = '#00BCD4';
                break;
        }
        
        // 食物发光效果
        this.ctx.shadowColor = foodColor;
        this.ctx.shadowBlur = 15;
        
        // 绘制食物
        this.ctx.fillStyle = foodColor;
        this.ctx.beginPath();
        const centerX = this.food.x * this.cellSize + this.cellSize / 2;
        const centerY = this.food.y * this.cellSize + this.cellSize / 2;
        const radius = this.cellSize / 2 - 2;
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 食物内部效果
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(centerX - radius/3, centerY - radius/3, radius/4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.shadowBlur = 0;
        
        // 如果是奖励食物，添加旋转效果
        if (this.foodType === 'bonus') {
            this.ctx.strokeStyle = '#FFD700';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
    
    start() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.isPaused = false;
        this.gameOver = false;
        
        // 隐藏游戏结束画面
        this.gameOverElement.style.display = 'none';
        
        // 开始游戏计时器
        this.startTime = Date.now();
        this.gameTimer = setInterval(() => {
            this.gameTime = Math.floor((Date.now() - this.startTime) / 1000);
        }, 1000);
        
        // 开始游戏循环
        this.gameLoop();
        
        console.log('游戏开始！');
    }
    
    pause() {
        if (!this.isPlaying || this.gameOver) return;
        
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.innerHTML = this.isPaused ? 
            '<i class="fas fa-play"></i> 继续 (P)' : 
            '<i class="fas fa-pause"></i> 暂停 (P)';
        
        if (this.isPaused) {
            console.log('游戏暂停');
        } else {
            console.log('游戏继续');
        }
    }
    
    restart() {
        clearInterval(this.gameTimer);
        this.gamesPlayed++;
        this.saveHighScore();
        this.init();
        this.start();
    }
    
    endGame() {
        this.isPlaying = false;
        this.gameOver = true;
        clearInterval(this.gameTimer);
        
        // 更新游戏次数
        this.gamesPlayed++;
        this.saveHighScore();
        
        // 显示游戏结束画面
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLength').textContent = this.snakeLength;
        document.getElementById('finalFood').textContent = this.foodCount;
        document.getElementById('finalTime').textContent = this.gameTime + '秒';
        this.gameOverElement.style.display = 'flex';
        
        console.log('游戏结束！最终分数:', this.score);
    }
    
    gameLoop() {
        if (!this.isPlaying || this.isPaused || this.gameOver) return;
        
        // 计算移动间隔（速度越快，间隔越短）
        const speedMap = [200, 180, 160, 140, 120, 100, 80, 60, 40, 30, 20];
        const moveInterval = speedMap[this.speed - 1] || 100;
        
        // 移动蛇
        this.move();
        
        // 安排下一次移动
        setTimeout(() => {
            requestAnimationFrame(() => this.gameLoop());
        }, moveInterval);
    }
    
    changeDirection(newDirection) {
        // 防止直接反向移动
        if (this.isPaused || this.gameOver) return;
        
        const oppositeX = this.direction.x === -newDirection.x && newDirection.x !== 0;
        const oppositeY = this.direction.y === -newDirection.y && newDirection.y !== 0;
        
        if (!oppositeX && !oppositeY) {
            this.nextDirection = newDirection;
        }
    }
    
    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.lengthElement.textContent = this.snakeLength;
        this.foodCountElement.textContent = this.foodCount;
        this.highScoreElement.textContent = this.highScore;
        this.maxLengthElement.textContent = this.maxLength;
        this.gamesPlayedElement.textContent = this.gamesPlayed;
    }
    
    updateSpeedDisplay() {
        const speedText = ['极慢', '很慢', '慢', '较慢', '正常', '较快', '快', '很快', '极快', '闪电'][this.speed - 1] || '正常';
        this.speedElement.textContent = speedText;
        document.getElementById('speedValue').textContent = this.speed;
    }
    
    saveHighScore() {
        const data = {
            highScore: this.highScore,
            maxLength: this.maxLength,
            gamesPlayed: this.gamesPlayed
        };
        localStorage.setItem('snakeHighScore', JSON.stringify(data));
    }
    
    loadHighScore() {
        const data = JSON.parse(localStorage.getItem('snakeHighScore') || '{}');
        this.highScore = data.highScore || 0;
        this.maxLength = data.maxLength || 3;
        this.gamesPlayed = data.gamesPlayed || 0;
        this.updateDisplay();
    }
    
    changeTheme() {
        this.themeIndex = (this.themeIndex + 1) % this.themes.length;
        console.log('切换主题到:', this.themes[this.themeIndex].name);
        this.draw();
    }
    
    bindEvents() {
        // 键盘控制
        document.addEventListener('keydown', (event) => {
            switch(event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    this.changeDirection({ x: 0, y: -1 });
                    break;
                case 's':
                case 'arrowdown':
                    this.changeDirection({ x: 0, y: 1 });
                    break;
                case 'a':
                case 'arrowleft':
                    this.changeDirection({ x: -1, y: 0 });
                    break;
                case 'd':
                case 'arrowright':
                    this.changeDirection({ x: 1, y: 0 });
                    break;
                case ' ':
                    if (this.isPlaying && !this.isPaused) {
                        // 加速移动
                        this.move();
                    }
                    break;
                case 'p':
                    this.pause();
                    break;
                case 'r':
                    this.restart();
                    break;
                case '+':
                case '=':
                    if (this.speed < 10) {
                        this.speed++;
                        this.updateSpeedDisplay();
                    }
                    break;
                case '-':
                case '_':
                    if (this.speed > 1) {
                        this.speed--;
                        this.updateSpeedDisplay();
                    }
                    break;
            }
        });
        
        // 按钮控制
        document.getElementById('startBtn').addEventListener('click', () => {
            if (!this.isPlaying) {
                this.start();
            }
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.pause();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restart();
        });
        
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.changeTheme();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.restart();
        });
        
        document.getElementById('shareBtn').addEventListener('click', () => {
            this.shareScore();
        });
        
        // 移动端控制按钮
        document.querySelectorAll('.mobile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const direction = e.target.dataset.direction;
                switch(direction) {
                    case 'up': this.changeDirection({ x: 0, y: -1 }); break;
                    case 'down': this.changeDirection({ x: 0, y: 1 }); break;
                    case 'left': this.changeDirection({ x: -1, y: 0 }); break;
                    case 'right': this.changeDirection({ x: 1, y: 0 }); break;
                }
            });
        });
        
        // 设置项
        document.getElementById('gridSize').addEventListener('change', (e) => {
            this.gridSize = parseInt(e.target.value);
            this.cellSize = 600 / this.gridSize;
            this.canvas.width = this.gridSize * this.cellSize;
            this.canvas.height = this.gridSize * this.cellSize;
            this.restart();
        });
        
        document.getElementById('gameSpeed').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = this.speed;
            this.updateSpeedDisplay();
        });
        
        document.getElementById('wallThrough').addEventListener('change', (e) => {
            this.wallThrough = e.target.checked;
        });
        
        document.getElementById('showGrid').addEventListener('change', (e) => {
            this.showGrid = e.target.checked;
            this.draw();
        });
        
        // 全屏功能
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F11') {
                e.preventDefault();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }
        });
    }
    
    shareScore() {
        const text = `我在贪吃蛇游戏中获得了 ${this.score} 分！蛇的长度达到 ${this.snakeLength}，吃掉了 ${this.foodCount} 个食物，游戏时间 ${this.gameTime} 秒。你也来试试吧！`;
        
        if (navigator.share) {
            navigator.share({
                title: '贪吃蛇游戏成绩',
                text: text,
                url: window.location.href
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(text).then(() => {
                alert('成绩已复制到剪贴板！\n\n' + text);
            });
        }
    }
}

// 页面加载完成后启动游戏
window.addEventListener('DOMContentLoaded', () => {
    const game = new SnakeGame();
    window.game = game; // 方便在控制台调试
    
    // 显示欢迎信息
    console.log('欢迎来到贪吃蛇游戏！');
    console.log('游戏已准备好，点击"开始游戏"按钮开始。');
    
    // 初始绘制
    game.draw();
});