window.onload = function () {
    let startX = 0;          //手指接触屏幕时的X坐标
    let endX = 0;            //手指在屏幕上滑动时的X坐标
    let scrollBarLeft = 0;   //滚动条left值
    
    let scrollBox = document.getElementById('scrollBox');   //滚动条容器对象
    let scrollBar = document.getElementById('scrollBar');   //滚动条对象

    //滚动条向左滚动时的极限位置（滚动条容器宽度-滚动条长度）
    let stop = scrollBox.offsetWidth - scrollBar.offsetWidth;
    
    //touchStart事件
    scrollBox.addEventListener('touchstart', function (event) {
        let touch = event.targetTouches[0];
        startX = touch.pageX;
        scrollBarLeft = scrollBar.offsetLeft;
    }, false);
    //touchmove事件
    scrollBox.addEventListener('touchmove', function (event) {
        let touch = event.targetTouches[0];
        endX = touch.pageX;
        let len = (endX - startX) + scrollBarLeft;
        if(len>=0){
            len = 0;
        }
        if(len<=stop){
            len = stop;
        }
        scrollBar.style.left = len + 'px';
    }, false);
    
    //touchend事件
    //scrollBox.addEventListener('touchend', function (event) {}, false);
}