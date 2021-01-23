window.onload = function(){
    let playBtn = document.getElementById('playBtn');        //播放按钮
    let backBtn = document.getElementById('backBtn');        //后退按钮
    let forwardBtn = document.getElementById('forwardBtn');  //前进按钮
    let loopBtn = document.getElementById('loopBtn');        //是否循环播放按钮
    let logoImg = document.getElementById('logoImg');        //歌曲对应的图片标签
    let musicNameP = document.getElementById('musicNameP');  //显示歌曲名称标签

    let musicShowBtn = document.getElementById('musicShowBtn');      //播放列表是否显示按钮
    let musicListBox = document.getElementById('musicListBox');      //播放列表块

    let lyricBox = document.getElementById('lyricBox');              //滚动歌词块

    let beginTimeText = document.getElementById('beginTimeText');    //歌曲开始播放时间标签
    let endTimeText = document.getElementById('endTimeText');        //歌曲开始播放时间标签

    let progressBox = document.getElementById('progressBox');    //进度条容器
    let bar = document.getElementById('bar');                    //进度条

    let loading = document.getElementById('loading');            //加载图标

    
    //当前歌曲的索引
    let index = 0;
    //当前歌词列表中的每一句歌词的索引
    let indexLi = 0;
    //进度条容器宽度
    let progressBoxWidth = progressBox.offsetWidth;

    //创建audio对象
    let audio = document.createElement('audio');
    document.body.appendChild(audio);

    //给歌曲列表添加数据
    let musicListStr = '';
    for(let i=0;i<musicArr.length;i++){
        musicListStr += '<li>'+musicArr[i].name+'</li>'
    }
    musicListBox.getElementsByTagName('ul')[0].innerHTML = musicListStr;

    //初始化
    init();

    function init(){
        /*
        //歌曲名称初始化
        musicNameP.innerHTML = musicArr[index].name;
        //歌曲对应图片初始化
        logoImg.src = './img/'+musicArr[index].img;
        //audio播放歌曲初始化
        audio.src = './music/'+musicArr[index].url;
        //显示正在加载图标
        loading.style.display = 'block';
        //加载歌曲
        audio.load();
        //重置是否循环播放按钮，并调用setloopBtnStyle()方法给按钮设置样式
        audio.loop = false;
        setloopBtnStyle();
        //滚动歌词初始化
        lyricBoxInit(index);
        */

        //audio播放歌曲初始化
        audio.src = './music/'+musicArr[index].url;
        //加载歌曲
        audio.load();
        //显示正在加载图标
        loading.style.display = 'block';
        //音频文件加载完毕事件
        audio.onloadedmetadata = complete;
    }

    //音频文件加载完毕事件
    function complete(){
        //歌曲名称初始化
        musicNameP.innerHTML = musicArr[index].name;
        //歌曲对应图片初始化
        logoImg.src = './img/'+musicArr[index].img;
        //重置是否循环播放按钮，并调用setloopBtnStyle()方法给按钮设置样式
        audio.loop = false;
        setloopBtnStyle();
        //滚动歌词初始化
        lyricBoxInit(index);

        //歌曲播放时间初始化
        beginTimeText.innerHTML = '00:00';
        endTimeText.innerHTML = timeConvert(audio.duration);
        //进度条初始化
        bar.style.width = '0px';
        loading.style.display = 'none';
    }

    //时间转换（xx.xxxxx秒 => 00:00）
    function timeConvert(time){
        //分
        let minutes = parseInt(time/60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        //秒
        let seconds = Math.round(time%60);  //返回最接近的整数
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes+':'+seconds;
    }

    //给歌词列表添加数据
    function lyricBoxInit(){
        let str = '<li>'+musicArr[index].name+'</li>'+
                  '<li>作词：'+musicArr[index].lyric+'</li>'+
                  '<li>作曲：'+musicArr[index].song+'</li>'+
                  '<li>演唱：'+musicArr[index].sing+'</li>';
        for(let i=0;i<musicArr[index].lyricArr.length;i++){
            str += '<li>'+musicArr[index].lyricArr[i].lyric+'</li>';
        }
        str += '<li></li><li></li><li></li>';
        lyricBox.getElementsByTagName('ul')[0].innerHTML = str;
    }
    
    //开始播放按钮：chrome等高版本浏览器禁止页面加载时播放，所以必须要在事件中播放
    playBtn.onclick = function(event){
        let icon = this.getElementsByTagName('i')[0];
        if(icon.className=='fa fa-play'){
            audio.play();
            icon.className='fa fa-pause';
        }else{
            audio.pause();
            icon.className='fa fa-play';
        }
        event.stopPropagation();
    }

    //歌曲播放过程中一直触发的事件（0.25秒触发一次）
    audio.ontimeupdate = process;
    function process(){
        //当前播放时长
        let currentTime = audio.currentTime;
        //歌曲总时长
        let sumTime = audio.duration;
        //如果是循环播放，那么每次播放完毕后，歌词也要重置
        if(audio.loop){
            //循环播放时，每次结束时间并不能精确等于总时长，所以要留出0.33秒。
            if(currentTime>=sumTime-0.33){
                //重置歌词
                resetLyric();
                //重置进度条
                resetBar();
            }
        }
        //处理进度条
        bar.style.width = currentTime/sumTime*progressBoxWidth + 'px';
        beginTimeText.innerHTML = timeConvert(currentTime);

        //处理歌词块：当前歌词中的li的索引不能超过当前歌词中的li的最大索引。
        if(indexLi<musicArr[index].lyricArr.length){
            //audio.currentTime是当前播放时长，让它与每个歌词的时间做对比
            if(timeConvert(currentTime)==musicArr[index].lyricArr[indexLi].time){
                animation();
                indexLi++;
            }
        }    
    }

    //歌词向上滚动动画
    function animation(){
        let scroll = lyricBox.getElementsByTagName('ul')[0];
        let liHeight = scroll.getElementsByTagName('li')[0].offsetHeight;
        //初始化
        let count = 0;    //动画一共4帧
        let interval = setInterval(()=>{
            scroll.style.top = scroll.offsetTop - liHeight/4 + 'px';
            count++;
            if(count>=4){
                clearInterval(interval);
                //歌词要向上走一位，所以要重新设置新的7个歌词的颜色
                setLyricLiColor(indexLi);
            }
        }, 100);
    }

    //歌词要向上走一位，所以要重新设置新的7个歌词的颜色
    function setLyricLiColor(num){
        let scroll = lyricBox.getElementsByTagName('ul')[0];
        let liArr = scroll.getElementsByTagName('li');
        liArr[num].style.color = '#fff';
        liArr[num].style.opacity = 0.3;
        liArr[num+1].style.color = '#fff';
        liArr[num+1].style.opacity = 0.5;
        liArr[num+2].style.color = '#fff';
        liArr[num+2].style.opacity = 0.7;
        liArr[num+3].style.color = '#2FC27D';
        liArr[num+3].style.opacity = 1;
        liArr[num+4].style.color = '#fff';
        liArr[num+4].style.opacity = 0.7;
        liArr[num+5].style.color = '#fff';
        liArr[num+5].style.opacity = 0.5;
        liArr[num+6].style.color = '#fff';
        liArr[num+6].style.opacity = 0.3;
    }

    //歌曲播放完毕,或切换歌曲时，触发的事件
    audio.onended = end;
    function end(){
        //歌曲播放完毕后，播放按钮设置成play图标
        playBtn.getElementsByTagName('i')[0].className='fa fa-play';
        //重置歌词
        resetLyric();
        //重置进度条
        resetBar();
    }

    //重置歌词
    function resetLyric(){
        //歌词块回到初始状态
        let scroll = lyricBox.getElementsByTagName('ul')[0];
        scroll.style.top = '0';
        //重新设置显示的7个歌词的颜色
        setLyricLiColor(0);
        //当前歌词列表中的每一句歌词的索引，要重新为0
        indexLi = 0;
    }

    //重置进度条及播放时间
    function resetBar(){
        beginTimeText.innerHTML = '00:00';
        bar.style.width = '0px';
    }

    //是否循环播放按钮
    loopBtn.onclick = function(event){
        audio.loop = !audio.loop;
        setloopBtnStyle();
        event.stopPropagation();
    };
    //给循环播放按钮设置样式
    function setloopBtnStyle(event){
        if(audio.loop){
            loopBtn.style.color = '#fff';
            loopBtn.style.border = 'none';
            loopBtn.style.backgroundColor = '#2FC27D';
        }else{
            loopBtn.style.color = '#888';
            loopBtn.style.border = 'solid 1px #888';
            loopBtn.style.backgroundColor = '';
        }
    }

    //是否显示播放列表按钮
    musicShowBtn.onclick = function(event){
        if(musicListBox.style.display=='block'){
            musicListBox.style.display = 'none';
        }else{
            musicListBox.style.display = 'block';
        }
        event.stopPropagation();
    }

    //获取播放列表中的所有li
    let liArr = musicListBox.getElementsByTagName('li');
    for(let i=0;i<liArr.length;i++){
        //（切换歌曲按钮事件）播放列表中的每一个选项按钮事件
        liArr[i].onclick = function(event){
            index = i;
            init();
            //歌曲列表块隐藏
            musicListBox.style.display = 'none';
            //歌曲播放完毕后，播放按钮设置成play图标
            playBtn.getElementsByTagName('i')[0].className='fa fa-play';
            //重置歌词
            resetLyric();
            //重置进度条
            resetBar();
        }
    }

    //后退按钮
    backBtn.onclick = function(){
        if(audio.currentTime-5>=0){
            audio.currentTime -= 5;
        }
    }
    //前进按钮
    forwardBtn.onclick = function(){
        if(audio.currentTime+5<audio.duration){
            audio.currentTime += 5;
        }
    }

    document.onclick = function(){
        musicListBox.style.display = 'none';
    }
}
