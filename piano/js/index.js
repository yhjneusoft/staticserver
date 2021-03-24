let liArr = document.getElementsByTagName('ul')[0].getElementsByTagName('li');

for (let i = 0; i < liArr.length; i++) {
    liArr[i].ontouchstart = function () {
        this.style.boxShadow = 'none';
        makeSound(6-i);    //低音在前
    }
    liArr[i].ontouchend = function () {
        this.style.boxShadow = '#666 0px 0px 10px';
    }
}


