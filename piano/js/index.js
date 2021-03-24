let liArr = document.getElementsByTagName('ul')[0].getElementsByTagName('li');

let audio = document.createElement('audio');
document.body.appendChild(audio);

for(let i=0;i<liArr.length;i++){
    liArr[i].ontouchstart = function(){
        this.style.boxShadow = 'none';
        audio.src = './music/'+(i+1)+'.MP3';
        audio.play();
    }
    liArr[i].ontouchend = function(){
        this.style.boxShadow = '#666 0px 0px 10px';
    }
}