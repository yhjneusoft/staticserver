let rows = 18;
let cols = 10;
//方块的x坐标
var x = 0;
//方块的y坐标
var y = 3;
//随机产生1-7种方块
var boxType = Math.floor(Math.random() * 7) + 1;
//方块数字地图
var boxMap = [[0, 0], [0, 0], [0, 0], [0, 0]];
//保存方块类型
var temp = 0;
//保存定时器
var saveTime;
//玩家分数
var num = 0;
//时间频率
var time = 1000;
//是否结束  0:结束  1：未结束
var isOver = 0;
//得分
let score = document.getElementById('score');

//表格数字地图
var gridMap =
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
//颜色列表 [背景颜色，方块颜色，方块堆颜色]
var colors = ["#D7E3DE", "#409EFF", "#409EFF"];
//表格对象
var htmlGrid;

//画表格
function drawGrid() {
    //取得表格对象
    htmlGrid = document.getElementById("grid");
    //根据表格数字地图(gridMap[][])画表格
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            htmlGrid.rows[i].cells[j].style.backgroundColor = colors[gridMap[i][j]];
        }
    }
}

//设置方块数字地图,共19种(包括旋转后的方块)
function setBox() {
    switch (boxType) {
        case 1:        //棍
            boxMap = [[0, 0], [0, 1], [0, 2], [0, 3]];
            break;
        case 11:
            boxMap = [[0, 0], [1, 0], [2, 0], [3, 0]];
            break;
        case 2:        //方块
            boxMap = [[0, 0], [0, 1], [1, 0], [1, 1]];
            break;
        case 3:        //反L型
            boxMap = [[0, 0], [0, 1], [0, 2], [1, 2]];
            break;
        case 31:
            boxMap = [[0, 1], [1, 1], [2, 1], [2, 0]];
            break;
        case 32:
            boxMap = [[0, 0], [1, 0], [1, 1], [1, 2]];
            break;
        case 33:
            boxMap = [[0, 0], [0, 1], [1, 0], [2, 0]];
            break;
        case 4:        //L型
            boxMap = [[0, 0], [0, 1], [0, 2], [1, 0]];
            break;
        case 41:
            boxMap = [[0, 0], [0, 1], [1, 1], [2, 1]];
            break;
        case 42:
            boxMap = [[1, 0], [1, 1], [1, 2], [0, 2]];
            break;
        case 43:
            boxMap = [[0, 0], [1, 0], [2, 0], [2, 1]];
            break;
        case 5:        //Z型
            boxMap = [[0, 0], [0, 1], [1, 1], [1, 2]];
            break;
        case 51:
            boxMap = [[0, 1], [1, 1], [1, 0], [2, 0]];
            break;
        case 6:        //反Z型
            boxMap = [[1, 0], [0, 1], [1, 1], [0, 2]];
            break;
        case 61:
            boxMap = [[0, 0], [1, 0], [1, 1], [2, 1]];
            break;
        case 7:        //T型
            boxMap = [[0, 1], [1, 0], [1, 1], [1, 2]];
            break;
        case 71:
            boxMap = [[0, 0], [1, 0], [1, 1], [2, 0]];
            break;
        case 72:
            boxMap = [[0, 0], [0, 1], [0, 2], [1, 1]];
            break;
        case 73:
            boxMap = [[1, 0], [0, 1], [1, 1], [2, 1]];
            break;
    }
}

//在表格上设置方块
function setBoxByGrid() {
    console.log(x + boxMap[0][0],y + boxMap[0][1]);
    gridMap[x + boxMap[0][0]][y + boxMap[0][1]] = 1;
    gridMap[x + boxMap[1][0]][y + boxMap[1][1]] = 1;
    gridMap[x + boxMap[2][0]][y + boxMap[2][1]] = 1;
    gridMap[x + boxMap[3][0]][y + boxMap[3][1]] = 1;
}

//清除方块
function clearBox() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (gridMap[i][j] != 2)
                gridMap[i][j] = 0;
        }
    }
}

//清除表格
function clearGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            gridMap[i][j] = 0;
        }
    }
}

//检查方块是否在允许的运动范围之内
function checkBox(a, b) {
    //下落到底部的验证
    if(a+boxMap[0][0]>=rows||a+boxMap[1][0]>=rows||a+boxMap[2][0]>=rows||a+boxMap[3][0]>=rows){
        return false;
    }
    //两边框不能超出验证
    if(b+boxMap[0][1]<=-1||b+boxMap[0][1]>=cols){
        return false;
    }else if(b+boxMap[1][1]<=-1||b+boxMap[1][1]>=cols){
        return false;
    }else if(b+boxMap[2][1]<=-1||b+boxMap[2][1]>=cols){
        return false;
    }else if(b+boxMap[3][1]<=-1||b+boxMap[3][1]>=cols){
        return false;
    }
    //是否下落到方块堆的验证
    if (gridMap[a + boxMap[0][0]][b + boxMap[0][1]] != 0) {
        return false;
    }
    else if (gridMap[a + boxMap[1][0]][b + boxMap[1][1]] != 0) {
        return false;
    }
    else if (gridMap[a + boxMap[2][0]][b + boxMap[2][1]] != 0) {
        return false;
    }
    else if (gridMap[a + boxMap[3][0]][b + boxMap[3][1]] != 0) {
        return false;
    }
    return true;
}

//产生新方块
function newBox() {
    //将落到地部的方块设置成方块堆
    gridMap[x + boxMap[0][0]][y + boxMap[0][1]] = 2;
    gridMap[x + boxMap[1][0]][y + boxMap[1][1]] = 2;
    gridMap[x + boxMap[2][0]][y + boxMap[2][1]] = 2;
    gridMap[x + boxMap[3][0]][y + boxMap[3][1]] = 2;
    //清除满格
    clearFull();
    x = 0;
    y = 3;
    boxType = Math.floor(Math.random() * 7) + 1;
}

//清除满格
function clearFull() {
    //保存清除的行数
    var k = 0;
    for (var i = rows-1; i >= 0; i--) {
        while (checkFull(i)) {
            k = k + 1;
            for (var row = i; row > 0; row--) {
                for (var cl = 0; cl < cols; cl++) {
                    gridMap[row][cl] = gridMap[row - 1][cl];
                }
            }
        }
    }

    //设置玩家分数
    if (k == 1)
        num = num + 10;
    else if (k == 2)
        num = num + 30;
    else if (k == 3)
        num = num + 50;
    else if (k == 4)
        num = num + 80;

    //设置时间频率	 
    if (num >= 100 && num < 200)
        time = 800;
    else if (num >= 200 && num < 300)
        time = 600;
    else if (num >= 300 && num < 400)
        time = 400;
    else if (num >= 400 && num < 500)
        time = 200;
    else if (num >= 500 && num < 600)
        time = 100;

    //更新分数	 
    score.innerHTML = '分数：'+num;
}

//检查是否满格
function checkFull(row) {
    for (var i = 0; i < cols; i++) {
        if (gridMap[row][i] != 2)
            return false;
    }
    return true;
}

//检查是否结束
function checkStop() {
    for (var i = 0; i < cols; i++) {
        if (gridMap[0][i] == 2)
            return true;
    }
    return false;
}

//旋转
function xuanzhuan() {
    switch(boxType){
        case 1:
            boxType = 11;
            break;
        case 11:
            boxType = 1;
            break;    
        case 2:
            boxType = 2;
            break;
        case 3:
            boxType = 31;
            break;
        case 31:
            boxType = 32;
            break;
        case 32:
            boxType = 33;
            break;
        case 33:
            boxType = 3;
            break;
        case 4:
            boxType = 41;
            break;
        case 41:
            boxType = 42;
            break;
        case 42:
            boxType = 43;
            break;
        case 43:
            boxType = 4;
            break;
        case 5:
            boxType = 51;
            break;
        case 51:
            boxType = 5;
            break;
        case 6:
            boxType = 61;
            break;
        case 61:
            boxType = 6;
            break;
        case 7:
            boxType = 71;
            break;
        case 71:
            boxType = 72;
            break;
        case 72:
            boxType = 73;
            break;
        case 73:
            boxType = 7;
            break;  
    }    
}

//设置表格并画表格
function setGrid() {
    setBox();
    setBoxByGrid();
    drawGrid();
    clearBox();
}

//向下
function boxDown() {
    if (checkBox(x + 1, y)) {
        x = x + 1;
    }
    else {
        if (checkStop()) {
            isOver = 0;
            clearTimeout(saveTime);
        }
        else {
            newBox();
        }
    }
    setGrid();
    saveTime = setTimeout("boxDown()", time);
}

//开始
document.getElementById('play').onclick = function() {
    if (isOver == 0) {
        isOver == 1;
    }
    clearGrid();
    num = 0;
    time = 1000;
    score.innerHTML = '分数：'+num;
    boxDown();
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:                   //向左
            if (checkBox(x, y - 1))
                y = y - 1;
            setGrid();
            break;
        case 39:                   //向右
            if (checkBox(x, y + 1))
                y = y + 1;
            setGrid();
            break;
        case 38:                   //旋转
            temp = 0;
            temp = boxType;
            xuanzhuan();
            setBox();
            if (!checkBox(x, y))
                boxType = temp;
            setGrid();
            break;
        case 40:
            if (checkBox(x + 1, y)) {
                x = x + 1;
            }
            else {
                if (checkStop()) {
                    isOver = 0;
                    clearTimeout(saveTime);
                }
                else {
                    newBox();
                }
            }
            setGrid();
            break;
    }
}