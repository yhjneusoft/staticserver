window.onload = function () {
    //有关歌曲信息的两个对象
    let logoImg = document.getElementById('logoImg');        //歌曲对应的图片标签
    let musicNameP = document.getElementById('musicNameP');  //显示歌曲名称标签

    //有关歌曲列表的两个对象
    let musicShowBtn = document.getElementById('musicShowBtn');      //歌曲列表是否显示按钮
    let musicListBox = document.getElementById('musicListBox');      //歌曲列表块

    //控制部分的五个对象
    let showSpeed = document.getElementById('showSpeed');    //播放速度显示标签
    let playBtn = document.getElementById('playBtn');        //播放按钮
    let backBtn = document.getElementById('backBtn');        //播放速度减小按钮
    let forwardBtn = document.getElementById('forwardBtn');  //播放速度增大按钮
    let loopBtn = document.getElementById('loopBtn');        //是否循环播放按钮

    let lyricBox = document.getElementById('lyricBox');              //滚动歌词块

    //进度条部分的五个对象
    let beginTimeText = document.getElementById('beginTimeText');    //歌曲开始播放时间标签
    let endTimeText = document.getElementById('endTimeText');        //歌曲开始播放时间标签
    let progressBox = document.getElementById('progressBox');        //进度条容器
    let bar = document.getElementById('bar');                        //进度条
    let barHeader = document.getElementById('barHeader');            //进度条头部

    let loading = document.getElementById('loading');            //歌曲加载时显示的图标

    //当前歌曲的索引
    let index = 0;
    //当前歌词列表中的每一句歌词的索引
    let indexLi = 0;
    //歌曲播放速度（最小0.2；最大3.0）
    let speed = 1.0;
    //循环模式的索引
    let loopType = 0;   //0:不循环; 1:单曲循环; 2:列表循环; 
    
    //创建audio对象，并放入网页中
    let audio = document.createElement('audio');
    document.body.appendChild(audio);

    //初始化
    init();
    function init() {
        //audio播放歌曲初始化
        audio.src = './music/' + musicArr[index].url;
        //加载歌曲
        audio.load();

        //给歌曲列表添加所有歌曲名称
        let musicListStr = '';
        for (let i = 0; i < musicArr.length; i++) {
            musicListStr += '<li>' + musicArr[i].name + '</li>'
        }
        musicListBox.getElementsByTagName('ul')[0].innerHTML = musicListStr;

        //设置歌曲播放速度（playbackRate必须要在audio加载后设置才有效）
        audio.playbackRate = speed;
        showSpeed.innerHTML = '1.0x';
    }

    /******************************* audio对象事件 *******************************/
    /**
     * audio对象事件一共设置了四个：
     * 1、onloadstart：音频文件开始加载事件
     * 2、onloadedmetadata：音频文件加载完毕事件
     * 3、ontimeupdate：音频文件播放中一直触发事件（0.25秒触发一次）
     * 4、onended：音频文件播放完毕事件
     * 
     * onloadstart与onloadedmetadata是一对的，只要设置了audio.src并调用load()，
     * 就会触发这两个事件（初始化时、歌曲切换时... ...）。
     */

    //音频文件开始加载事件
    audio.onloadstart = function() {
        loading.style.display = 'block';   //显示正在加载图标
    }
    //可以播放，歌曲全部加载完毕事件
    audio.onloadedmetadata = function() {
        //歌曲名称初始化
        musicNameP.innerHTML = musicArr[index].name;
        //歌曲对应图片初始化
        logoImg.src = './img/' + musicArr[index].img;
        //设置歌曲播放速度
        audio.playbackRate = speed;
        
        //滚动歌词初始化
        let str = '<li>' + musicArr[index].name + '</li>' +
            '<li>作词：' + musicArr[index].lyric + '</li>' +
            '<li>作曲：' + musicArr[index].song + '</li>' +
            '<li>演唱：' + musicArr[index].sing + '</li>';
        for (let i = 0; i < musicArr[index].lyricArr.length; i++) {
            str += '<li>' + musicArr[index].lyricArr[i].lyric + '</li>';
        }
        str += '<li></li><li></li><li></li>';
        lyricBox.getElementsByTagName('ul')[0].innerHTML = str;

        //列表循环播放时的处理
        if(loopType==2){
            audio.play();//切换新歌曲后主动播放，并且playBtn按钮就要为'暂停'样式
            playBtn.getElementsByTagName('i')[0].className = 'fa fa-pause';
        }

        //重置进度条（歌曲播放时间和样式的初始化）
        resetBar();

        //隐藏正在加载图标
        loading.style.display = 'none';
    }

    //歌曲播放过程中一直触发的事件（0.25秒触发一次）
    audio.ontimeupdate = function() {
        //当前播放时长
        let currentTime = audio.currentTime;
        //歌曲总时长
        let totalTime = audio.duration;
        //单曲循环时，不会触发onended事件，所以要自己判断本轮循环是否播放完毕
        if (audio.loop) {
            //循环播放时，每次结束时间并不能精确等于总时长，所以要留出0.33秒。
            if (currentTime >= totalTime - 0.33) {
                //重置歌词
                resetLyric();
                //重置进度条
                resetBar();
            }
        }
        //处理进度条（进度条要向前走，播放时间要向前走）
        let progressValue = currentTime/totalTime*progressBox.offsetWidth;
        bar.style.width = progressValue + 'px';
        barHeader.style.left = progressValue - 7 + 'px';
        beginTimeText.innerHTML = timeConvert(currentTime);

        //歌词与播放的联动处理（当前歌词中的li的索引不能超过当前歌词中的li的最大索引）
        if (indexLi < musicArr[index].lyricArr.length) {
            //currentTime是当前播放时长，让它与每个歌词的时间做对比（精确到秒）
            if (timeConvert(currentTime) == musicArr[index].lyricArr[indexLi].time) {
                //做歌词向上滚动动画
                let scroll = lyricBox.getElementsByTagName('ul')[0];  //歌词ul对象
                //歌词ul中的每一个li的高度
                let liHeight = scroll.getElementsByTagName('li')[0].offsetHeight;
                //开始做动画（count控制当前是动画的第几帧，动画一个4帧）
                let count = 0;    //动画一共4帧
                let interval = setInterval(() => {
                    scroll.style.top = scroll.offsetTop - liHeight / 4 + 'px';
                    count++;
                    if (count >= 4) {
                        clearInterval(interval);
                        //歌词要向上走一位，所以要重新设置新的7个歌词的颜色
                        setLyricLiColor(indexLi);
                    }
                }, 100);
                //每次滚动一个li的高度，结束之后，当前li索引要加1
                indexLi++;
            }
        }
    }

    //歌曲播放完毕,或切换歌曲时，触发的事件
    audio.onended = function() {
        //歌曲播放完毕后，播放按钮设置成play图标
        playBtn.getElementsByTagName('i')[0].className = 'fa fa-play';
        //列表循环播放时的处理
        if(loopType==2){
            index++;
            if(index>=musicArr.length){
                index=0;
            }
            //给audio对象设置当前歌曲并加载
            audio.src = './music/' + musicArr[index].url;
            audio.load();
        }
        //重置歌词
        resetLyric();
        //重置进度条
        resetBar();
    }
    /******************************* audio对象事件 *******************************/

    //重置歌词
    function resetLyric() {
        //歌词块回到初始状态
        let scroll = lyricBox.getElementsByTagName('ul')[0];
        scroll.style.top = '0';
        //重新设置显示的7个歌词的颜色
        setLyricLiColor(0);
        //当前歌词列表中的每一句歌词的索引，要重新为0
        indexLi = 0;
    }

    //重置进度条及播放时间
    function resetBar() {
        //给进度条做歌曲播放时间的初始化
        beginTimeText.innerHTML = '00:00';
        endTimeText.innerHTML = timeConvert(audio.duration);
        //进度条样式初始化
        bar.style.width = '0px';
        barHeader.style.left = '-7px';
    }

    //歌词要向上走一位，所以要重新设置新的7个歌词的颜色
    function setLyricLiColor(num) {
        let scroll = lyricBox.getElementsByTagName('ul')[0];
        let liArr = scroll.getElementsByTagName('li');
        liArr[num].style.color = '#fff';
        liArr[num].style.opacity = 0.3;
        liArr[num + 1].style.color = '#fff';
        liArr[num + 1].style.opacity = 0.5;
        liArr[num + 2].style.color = '#fff';
        liArr[num + 2].style.opacity = 0.7;
        liArr[num + 3].style.color = '#2FC27D';
        liArr[num + 3].style.opacity = 1;
        liArr[num + 4].style.color = '#fff';
        liArr[num + 4].style.opacity = 0.7;
        liArr[num + 5].style.color = '#fff';
        liArr[num + 5].style.opacity = 0.5;
        liArr[num + 6].style.color = '#fff';
        liArr[num + 6].style.opacity = 0.3;
    }

    /******************************* 用户触发事件 *******************************/

    //开始播放按钮：chrome等高版本浏览器禁止页面加载时播放，所以必须要在事件中播放
    playBtn.onclick = function (event) {
        let icon = this.getElementsByTagName('i')[0];
        if (icon.className == 'fa fa-play') {
            audio.play();
            icon.className = 'fa fa-pause';
        } else {
            audio.pause();
            icon.className = 'fa fa-play';
        }
        event.stopPropagation();
    }

    //是否循环播放按钮
    loopBtn.onclick = function (event) {
        if (loopType == 0) {
            //单曲循环设置       
            loopType = 1;
            audio.loop = true;
            loopBtn.style.color = '#fff';
            loopBtn.style.border = 'none';
            loopBtn.style.backgroundColor = '#2FC27D';
            loopBtn.innerHTML = '单曲循环';
        } else if (loopType == 1) {
            //列表循环设置 
            loopType = 2;
            audio.loop = false;
            loopBtn.style.color = '#fff';
            loopBtn.style.border = 'none';
            loopBtn.style.backgroundColor = '#2FC27D';
            loopBtn.innerHTML = '列表循环';
        } else if (loopType == 2) {
            //不循环设置 
            loopType = 0;
            audio.loop = false;
            loopBtn.style.color = '#888';
            loopBtn.style.border = 'solid 1px #888';
            loopBtn.style.backgroundColor = '';
            loopBtn.innerHTML = '不循环';
        }
        event.stopPropagation();
    };

    //是否显示歌曲播放列表按钮
    musicShowBtn.onclick = function (event) {
        if (musicListBox.style.display == 'block') {
            musicListBox.style.display = 'none';
        } else {
            musicListBox.style.display = 'block';
        }
        event.stopPropagation();
    }

    //点击歌曲播放列表中的li事件
    let liArr = musicListBox.getElementsByTagName('li');
    for (let i = 0; i < liArr.length; i++) {
        //（切换歌曲按钮事件）播放列表中的每一个选项按钮事件
        liArr[i].onclick = function (event) {
            index = i;
            //给audio对象设置当前歌曲并加载
            audio.src = './music/' + musicArr[index].url;
            audio.load();
            //歌曲列表块隐藏
            musicListBox.style.display = 'none';
            //切换歌曲后，播放按钮要设置成play图标（可播放状态）
            playBtn.getElementsByTagName('i')[0].className = 'fa fa-play';
            //重置歌词
            resetLyric();
            //重置进度条
            resetBar();
            event.stopPropagation();
        }
    }

    //播放速度减小按钮
    backBtn.onclick = function(){
        setSpeed(-0.1);
        event.stopPropagation();
    }
    //播放速度增大按钮
    forwardBtn.onclick = function(){
        setSpeed(0.1);
        event.stopPropagation();
    }
    function setSpeed(change){
        //浮点运算时容易出现 1.1000000000001的情况，所以截取小数点一位（toFixed是四舍五入）
        speed = (audio.playbackRate+change).toFixed(1);
        if(speed>=3){
            speed = 3.0;
        }else if(speed<=0.2){
            speed = 0.2;
        }
        audio.playbackRate = speed;
        showSpeed.innerHTML = speed+'x';
    }

    //进度条点击事件（用户在哪里点击，就表示用户希望歌曲在哪里播放）
    progressBox.onclick = function(event){
        //设置进度条位置（也就是用户点击进度条的位置）
        let w = event.clientX - this.offsetLeft;
        bar.style.width = w+'px';
        barHeader.style.left = w-7+'px';
        //设置当前音乐播放位置（当前音乐播放时间=(进度条长度/进度条总长度*音乐总时长)）
        audio.currentTime = (w/progressBox.offsetWidth)*audio.duration;
        //设置歌词位置
        backOrforwardresetLyric();
        event.stopPropagation();
    }

    //用户手指在进度条上滑动事件，为ontouchmove（手指滑动）与ontouchend（手指抬起）的组合
    barHeader.ontouchmove = function(event){
        //用户手指在进度条上滑动的位置
        let w = event.touches[0].pageX-progressBox.offsetLeft;
        bar.style.width = w+'px';
        barHeader.style.left = w-7+'px';   
    }
    barHeader.ontouchend = function(event){
        //用户手指在进度条上抬起的位置
        let w = event.touches[0].pageX-progressBox.offsetLeft;
        bar.style.width = w+'px';
        barHeader.style.left = w-7+'px';
        //设置当前音乐播放位置（当前音乐播放时间=(进度条长度/进度条总长度*音乐总时长)）
        audio.currentTime = (w/progressBox.offsetWidth)*audio.duration;
        //设置歌词位置
        backOrforwardresetLyric();
    }

    /******************************* 用户触发事件 *******************************/

    function backOrforwardresetLyric(){
        let arr = musicArr[index].lyricArr;
        let curTime = timeConvert(audio.currentTime);
        for (let i = 0; i < arr.length; i++) {
            if (i == 0 && curTime < arr[0].time) {
                indexLi = 0;
            } else if (i == arr.length - 1 && curTime > arr[arr.length - 1].time) {
                indexLi = arr.length;
            } else if (curTime > arr[i].time && curTime <= arr[i + 1].time) {
                indexLi = i + 1;
            }
        }

        let scroll = lyricBox.getElementsByTagName('ul')[0];
        let liHeight = scroll.getElementsByTagName('li')[0].offsetHeight;
        scroll.style.top = -liHeight*indexLi + 'px';
        setLyricLiColor(indexLi);
    }

    //点击页面上任何位置时，歌曲列表块都隐藏
    document.onclick = function () {
        musicListBox.style.display = 'none';
    }

    //时间转换（xx.xxxxx秒 => 00:00）
    function timeConvert(time) {
        //分
        let minutes = parseInt(time / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        //秒
        let seconds = Math.round(time % 60);  //返回最接近的整数
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }
}
