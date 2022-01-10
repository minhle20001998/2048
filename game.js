//hemlo`brbr
class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.hasChange = false;
        this.currentScore = 0;
        this.maxScore = localStorage.getItem('maxScore');
        this.alert = document.querySelector(".alert");
        this.addNum();
        this.addNum();
        this.draw();
        this.handle();
        this.updateScore();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        document.querySelector('.board').appendChild(this.canvas);
        this.reloadButton = document.querySelector(".reload-btn");
        this.reloadButton.addEventListener('click', () => {
            if (!this.alert.className.includes("d-none")) {
                this.alert.classList.add("d-none");
                this.grid = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                this.addNum();
                this.addNum();
                this.draw();
            }
        })
    }

    draw() {
        let isLost = this.checkLose();
        if (isLost) {
            if (this.alert.className.includes("d-none"))
                this.alert.classList.remove("d-none");
        }

        this.context.clearRect(0, 0, 400, 400);
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.context.beginPath();
                this.context.strokeStyle = "#a4988c";
                this.context.moveTo(i * 100, 0);
                this.context.lineTo(i * 100, 400);
                this.context.moveTo(0, i * 100);
                this.context.lineTo(400, i * 100);
                this.context.stroke();
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                switch (this.grid[i][j]) {
                    case 0:
                        this.fillColor('#cdc1b4', i, j)
                        break;
                    case 2:
                        this.fillColor('#e7ddd4', i, j)
                        break;
                    case 4:
                        this.fillColor('#eee1c9', i, j)
                        break;
                    case 8:
                        this.fillColor('#ebab75', i, j)
                        break;
                    case 16:
                        this.fillColor('#e99166', i, j)
                        break;
                    case 32:
                        this.fillColor("#e1806c", i, j)
                        break;
                    case 64:
                        this.fillColor("#f45547", i, j)
                        break;
                    case 128:
                        this.fillColor("#e6cb55", i, j)
                        break;
                    case 256:
                        this.fillColor("#eec357", i, j)
                        break;
                    case 512:
                        this.fillColor("#e5c73b", i, j)
                        break;
                    case 1024:
                        this.fillColor("#e4bf42", i, j)
                        break;
                    case 2048:
                        this.fillColor("#ecb543", i, j)
                        break;
                    default:
                        this.fillColor("#6eacda", i, j)
                        break;
                }
                if (this.grid[i][j] != 0) {
                    if (this.grid[i][j] >= 1024) {
                        this.context.font = '40px time new roman';
                    } else {
                        this.context.font = '60px time new roman';
                    }
                    if (this.grid[i][j] == 2 || this.grid[i][j] == 4) {
                        this.context.fillStyle = '#615951';
                    } else {
                        this.context.fillStyle = '#ffffff';
                    }
                    this.context.textAlign = 'center';

                    this.context.fillText(this.grid[i][j], j * 100 + 50, i * 100 + 70);
                }
            }
        }
    }

    checkLose() {
        let lose = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let current = this.grid[i][j];
                let top = (i - 1 >= 0) ? this.grid[i - 1][j] : null;
                let right = (j + 1 < 4) ? this.grid[i][j + 1] : null;
                let bottom = (i + 1 < 4) ? this.grid[i + 1][j] : null;
                let left = (j - 1 >= 0) ? this.grid[i][j - 1] : null;
                if (current != 0 && top != 0 && right != 0 && bottom != 0 && left != 0) {
                    if (current != top && current != right && current != bottom && current != left) {
                        lose++;
                    }
                }
            }
        }
        return lose == 16;
    }

    addNum() {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] == 0) {
                    arr.push({ x: i, y: j });
                }
            }
        }
        if (arr.length > 0) {
            let randomXY = arr[Math.random() * arr.length >> 0];
            let num = Math.floor(Math.random() * 4);
            if (num < 3) {
                this.grid[randomXY.x][randomXY.y] = 2;
            } else {
                this.grid[randomXY.x][randomXY.y] = 4;
            }
        }
    }

    fillColor(color, i, j) {
        this.context.fillStyle = color;
        this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
    }

    slideLeftOrUp(row) {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (row[i] != 0) {
                arr.push(row[i]);
            }
        }

        for (let j = arr.length; j < 4; j++) {
            arr.push(0);
        }

        return arr;
    }

    slideRightOrDown(row) {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (row[i] == 0) {
                arr.push(row[i]);
            }
        }

        for (let i = 0; i < 4; i++) {
            if (row[i] != 0) {
                arr.push(row[i]);
            }
        }

        return arr;
    }

    hasChangeFunc(arr1, arr2) {
        for (let i = 0; i < 4; i++) {
            if (arr1[i] != arr2[i]) {
                this.hasChange = true;
            }
        }
    }

    handle() {
        document.addEventListener('keydown', (e) => {
            this.hasChange = false;
            //LEFT
            if (e.code == 'KeyA') {
                this.handleSwipeLeft()
            } //UP
            else if (e.code == 'KeyW') {
                this.handleSwipeUp();
            }//RIGHT
            else if (e.code == 'KeyD') {
                this.handleSwipeRight();
            }//DOWN
            else if (e.code == "KeyS") {
                this.handleSwipeDown();
            }
            //handle
            if (this.hasChange) {
                this.currentScore = this.getLargestNumber(this.grid)
                if (this.currentScore > this.maxScore) {
                    this.maxScore = this.currentScore
                    localStorage.setItem('maxScore', this.maxScore);
                }
                this.updateScore()
                this.addNum();
            }
            this.draw()
        });
    }

    getLargestNumber(arr) {
        return Math.max(...arr.flat())
    }

    updateScore() {
        document.querySelector('.currentScore').textContent = this.currentScore;
        document.querySelector('.maxScore').textContent = this.maxScore;
    }

    handleSwipeLeft() {
        for (let i = 0; i < 4; i++) {
            let arr = this.grid[i];
            this.grid[i] = this.slideLeftOrUp(this.grid[i]);
            for (let j = 0; j < 3; j++) {
                if (this.grid[i][j] == this.grid[i][j + 1]) {
                    this.grid[i][j] += this.grid[i][j + 1];
                    this.grid[i][j + 1] = 0;
                }
            }
            this.grid[i] = this.slideLeftOrUp(this.grid[i]);
            this.hasChangeFunc(arr, this.grid[i]);
        }
    }

    handleSwipeRight() {
        for (let i = 0; i < 4; i++) {
            let arr = this.grid[i];
            this.grid[i] = this.slideRightOrDown(this.grid[i]);
            for (let j = 3; j > 0; j--) {
                if (this.grid[i][j] == this.grid[i][j - 1]) {
                    this.grid[i][j] += this.grid[i][j - 1];
                    this.grid[i][j - 1] = 0;
                }
            }
            this.grid[i] = this.slideRightOrDown(this.grid[i]);
            this.hasChangeFunc(arr, this.grid[i]);
        }
    }

    handleSwipeUp() {
        for (let i = 0; i < 4; i++) {
            let arr = [];
            for (let j = 0; j < 4; j++) {
                arr.push(this.grid[j][i]);
            }
            let arr1 = arr;
            arr = this.slideLeftOrUp(arr);
            for (let m = 0; m < 3; m++) {
                if (arr[m] == arr[m + 1]) {
                    arr[m] += arr[m + 1];
                    arr[m + 1] = 0;
                }
            }
            arr = this.slideLeftOrUp(arr);
            for (let m = 0; m < 4; m++) {
                this.grid[m][i] = arr[m];
            }
            this.hasChangeFunc(arr, arr1);
        }
    }

    handleSwipeDown() {
        for (let i = 0; i < 4; i++) {
            let arr = [];
            for (let j = 0; j < 4; j++) {
                arr.push(this.grid[j][i]);
            }
            let arr1 = arr;
            arr = this.slideRightOrDown(arr);
            for (let m = 3; m > 0; m--) {
                if (arr[m] == arr[m - 1]) {
                    arr[m] += arr[m - 1];
                    arr[m - 1] = 0;
                }
            }
            arr = this.slideRightOrDown(arr);
            for (let m = 0; m < 4; m++) {
                this.grid[m][i] = arr[m];
            }
            this.hasChangeFunc(arr, arr1);
        }
    }
}

var g = new game()