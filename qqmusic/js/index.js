window.onload = function(){
    let playBtn = document.getElementById('playBtn');        //播放按钮
    let backBtn = document.getElementById('backBtn');        //后退按钮
    let forwardBtn = document.getElementById('forwardBtn');  //前进按钮
    let loopBtn = document.getElementById('loopBtn');        //是否循环播放按钮

    //音乐播放列表
    let musicArr = [
        {
            id:1,
            name:'送你一朵小红花',
            url:'snydxhh.mp3',
            img:'snydxhh.png',
            lyric:[

            ]
        },{
            id:2,
            name:'一起走过的日子',
            url:'yqzgdrz.mp3',
            img:'yqzgdrz.png',
            lyric:[
                
            ]
        }
    ];

    //创建audio对象
    let audio = document.createElement('audio');
    //给audio对象添加资源列表
    for(let i=0;i<musicArr.length;i++){
        let source = document.createElement('source');
        source.setAttribute('src', './music/'+musicArr[i].url);
        audio.appendChild(source);
    }
    document.body.appendChild(audio);
    
    //chrome等高版本浏览器禁止页面加载时播放，所以必须要在事件中播放
    playBtn.onclick = function(){
        let icon = this.getElementsByTagName('i')[0];
        if(icon.className=='fa fa-play'){
            audio.play();
            icon.className='fa fa-pause';
        }else{
            audio.pause();
            icon.className='fa fa-play';
        }
        
    }

    
}
