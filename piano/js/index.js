
let liArr = document.getElementsByTagName('ul')[0].getElementsByTagName('li');

let audioArr = [];

for (let i = 0; i < liArr.length; i++) {
    audioArr[i] = document.createElement('audio');
    document.body.appendChild(audioArr[i]);
    audioArr[i].src = './music/' + (i + 1) + '.MP3';
}

liArr[0].ontouchstart = function () {
    this.style.boxShadow = 'none';
    new Worker('./ww1.js');
    //setTimeout(function(){
    //    audioArr[0].play();
    //},0);
}
liArr[0].ontouchend = function () {
    this.style.boxShadow = '#666 0px 0px 10px';
}

/*
for (let i = 0; i < liArr.length; i++) {
    liArr[i].ontouchstart = function () {
        this.style.boxShadow = 'none';
        //audio.src = './music/' + (i + 1) + '.MP3';
        //audio.play();
        //audio1.play();
        audioArr[i].play();
    }
    liArr[i].ontouchend = function () {
        this.style.boxShadow = '#666 0px 0px 10px';
    }
}*/



