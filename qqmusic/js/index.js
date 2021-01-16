window.onload = function(){
    let playBtn = document.getElementById('playBtn');        //播放按钮
    let backBtn = document.getElementById('backBtn');        //后退按钮
    let forwardBtn = document.getElementById('forwardBtn');  //前进按钮
    let loopBtn = document.getElementById('loopBtn');        //是否循环播放按钮
    let logo = document.getElementById('logo');              //歌曲对应的图片
    let musicName = document.getElementById('musicName');    //歌曲名称

    let musicShowBtn = document.getElementById('musicShowBtn');      //播放列表是否显示按钮
    let musicListBox = document.getElementById('musicListBox');      //播放列表块

    let lyricBox = document.getElementById('lyricBox');       //滚动歌词块

    //音乐播放列表
    let musicArr = [
        {
            id:1,
            name:'送你一朵小红花',
            lyric:'赵英俊',
            song:'赵英俊',
            url:'snydxhh.mp3',
            img:'snydxhh.png',
            lyricArr:[
                {time:'00:01:12',lyric:'送你一朵小红花'},
                {time:'00:10:47',lyric:'送你一朵小红花'},
                {time:'00:13:72',lyric:'开在你昨天新长的枝桠'},
                {time:'00:19:47',lyric:'奖励你有勇气 主动来和我说话'},
                {time:'00:28:97',lyric:'不共戴天的冰水啊'},
                {time:'00:33:81',lyric:'义无反顾的烈酒啊'},
                {time:'00:37:98',lyric:'多么苦难的日子里'},
                {time:'00:42:34',lyric:'你都已战胜了它'},
                {time:'00:49:72',lyric:'送你一朵小红花'},
                {time:'00:52:94',lyric:'遮住你今天新添的伤疤'},
                {time:'00:58:46',lyric:'奖励你在下雨天 还愿意送我回家'},
                {time:'01:08:11',lyric:'科罗拉多的风雪啊'},
                {time:'01:13:11',lyric:'喜马拉雅的骤雨啊'},
                {time:'01:17:58',lyric:'只要你相信我 闭上眼就能到达'},
                {time:'01:49:75',lyric:'送你一朵小红花'},
                {time:'01:53:17',lyric:'开在那牛羊遍野的天涯'},
                {time:'01:59:09',lyric:'奖励你走到哪儿 都不会忘记我呀'},
                {time:'02:08:30',lyric:'洁白如雪的沙滩啊'},
                {time:'02:12:65',lyric:'风平浪静的湖水啊'},
                {time:'02:17:61',lyric:'那些真实的幻影啊'},
                {time:'02:21:37',lyric:'是我给你的牵挂'},
                {time:'02:26:70',lyric:'送你一朵小红花'},
                {time:'02:29:87',lyric:'开在你心底最深的泥沙'},
                {time:'02:35:90',lyric:'奖励你能感受 每个命运的挣扎'},
                {time:'02:44:84',lyric:'是谁挥霍的时光啊'},
                {time:'02:49:72',lyric:'是谁苦苦的奢望啊'},
                {time:'02:54:35',lyric:'这不是一个问题'},
                {time:'02:58:44',lyric:'也不需要你的回答'},
                {time:'03:03:65',lyric:'送你一朵小红花'},
                {time:'03:12:23',lyric:'送你一朵小红花'},
                {time:'03:22:14',lyric:'送你一朵小红花'},
                {time:'03:31:65',lyric:'送你一朵小红花'},
                {time:'03:40:72',lyric:'送你一朵小红花'}
            ]
        },{
            id:2,
            name:'一起走过的日子',
            lyric:'梁小美',
            song:'胡伟立',
            url:'yqzgdrz.mp3',
            img:'yqzgdrz.png',
            lyricArr:[
                {time:'00:14.28',lyric:'如何面对 曾一起走过的日子'},
                {time:'00:21.21',lyric:'现在剩下我独行 如何用心声一一讲你知'},
                {time:'00:28.37',lyric:'从来没人明白我 唯一你给我好日子'}
            ]
        }
    ];

    //初始化
    musicName.innerHTML = musicArr[0].name;
    logo.src = './img/'+musicArr[0].img;
    //给歌曲列表添加数据
    let musicListStr = '';
    for(let i=0;i<musicArr.length;i++){
        musicListStr += '<li>'+musicArr[i].name+'</li>'
    }
    musicListBox.getElementsByTagName('ul')[0].innerHTML = musicListStr;

    //创建audio对象
    let audio = document.createElement('audio');
    audio.src = './music/'+musicArr[0].url;
    audio.loop = false;
    document.body.appendChild(audio);

    //滚动歌词初始化
    lyricBoxInit(0);

    function lyricBoxInit(index){
        let str = '<li>'+musicArr[index].name+'</li>'+
                  '<li>词：'+musicArr[index].lyric+'</li>'+
                  '<li>曲：'+musicArr[index].song+'</li>';
        for(let i=0;i<musicArr[index].lyricArr.length;i++){
            str += '<li>'+musicArr[index].lyricArr[i].lyric+'</li>';
        }          
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

    //是否循环播放按钮
    loopBtn.onclick = function(event){
        if(audio.loop){
            audio.loop = false;
            this.style.color = '#888';
            this.style.border = 'solid 1px #888';
            this.style.backgroundColor = '';
        }else{
            audio.loop = true;
            this.style.color = '#fff';
            this.style.border = 'none';
            this.style.backgroundColor = '#2FC27D';
        }
        event.stopPropagation();
    }

    //播放列表是否显示按钮
    musicShowBtn.onclick = function(event){
        if(musicListBox.style.display=='block'){
            musicListBox.style.display = 'none';
        }else{
            musicListBox.style.display = 'block';
        }
        event.stopPropagation();
    }

    //播放列表中的每一个选项按钮事件
    let liArr = musicListBox.getElementsByTagName('li');
    for(let i=0;i<liArr.length;i++){
        liArr[i].onclick = function(event){
            audio.src = './music/'+musicArr[i].url;
            musicName.innerHTML = musicArr[i].name;
            logo.src = './img/'+musicArr[i].img;
            //只要切换了歌曲，就停止播放，播放按钮设置成play图标
            playBtn.getElementsByTagName('i')[0].className='fa fa-play';
            //歌曲列表块隐藏
            musicListBox.style.display = 'none';
            //设置滚动歌词
            lyricBoxInit(i);
            event.stopPropagation();
        }
    }

    document.onclick = function(){
        musicListBox.style.display = 'none';
    }
}
