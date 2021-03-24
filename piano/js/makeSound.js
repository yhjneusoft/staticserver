function makeSound(index) {
    let sounds = [130, 147, 165, 175, 196, 220, 246, 262, 294, 330, 349, 392, 440, 494,
        523, 587, 659, 698, 784, 880, 988, 1047];
    // 获得音频上下文
    let ctx = new AudioContext();

    //得到音频振荡器
    let osc = ctx.createOscillator();
    //得到音量控制对象
    let g = ctx.createGain();

    // 连接振荡器和音量控制对象
    osc.connect(g);
    osc.type = 'sine';
    osc.frequency.value = sounds[index];

    let duration = 1;

    g.connect(ctx.destination);
    g.gain.value = 0;
    osc.start();
    g.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.01)

    osc.stop(ctx.currentTime + duration);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
}
