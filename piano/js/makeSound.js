let ctx;
//let sounds = [130, 147, 165, 175, 196, 220, 246, 262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047];
let sounds = [587, 659, 698, 784, 880, 988, 1047];

function setContent() {
    if (!ctx) {
        ctx = new AudioContext()
    }
}
function makeSound(index) {             // 钢琴传入是钢琴的第几个按键
    setContent();                       // 获得音频上下文
    var osc = ctx.createOscillator();   //获得音频振荡器
    var g = ctx.createGain();           //得到音量控制对象
    osc.connect(g);                     // 连接振荡器和音量控制对象
    osc.type = 'sine';                  //设置波形
    osc.frequency.value = sounds[index];//对应钢琴不同键的不同频率
    var duration = 1;                   //控制时间
    g.connect(ctx.destination);         //连接扬声器
    g.gain.value = 0;                   //初始音高为0
    osc.start();                        //从当前开始发生
    //从当前时间到0.01s后，音高从0~0.6
    g.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.01);
    //当前时间duration后停止
    osc.stop(ctx.currentTime + duration);
    //从0.6~0.01
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
}