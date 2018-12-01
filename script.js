let bxs = document.querySelectorAll('.bx')
let index = 0;
let moveInterval;
function setHeight(){
    document.querySelectorAll('.bx').forEach(v => {
        v.style.height = window.innerHeight + 'px';
    });
}
function move(direction){
    if(moveInterval){
        return;
    }
    if(0 === index && direction < 0 || index >= bxs.length-1 && direction > 0){
        return;
    }
    index += direction;
    moveInterval = setInterval(() => {
        document.documentElement.scrollTop += direction * window.innerHeight / 50;
        if(direction > 0 && document.documentElement.scrollTop >= bxs[index].offsetTop || direction < 0 && document.documentElement.scrollTop <= bxs[index].offsetTop){
            document.documentElement.scrollTop = bxs[index].offsetTop;
            clearInterval(moveInterval);
            moveInterval = undefined;
        }
    }, 1);
}
document.addEventListener('keydown', e => {
    if(13 === e.keyCode){
        move(1);
    }else if(8 === e.keyCode){
        move(-1);
    }
});
if(!navigator.userAgent.match(/Mac OS X/i)){
    window.addEventListener('wheel', e => {
        e.preventDefault();
        move(e.deltaY/Math.abs(e.deltaY));
    });
}
window.addEventListener('resize', setHeight);
setHeight();
let bxids = document.querySelectorAll('.bx[id]');
if(bxids){
    let bxp = document.createElement('div');
    bxp.setAttribute('class', 'bxp');
    let ul = '<ul>';
    bxids.forEach(v => {
        let bxt = v.querySelector('.bxt');
        ul += '<li><a href="#' + v.id + '">' + bxt.innerHTML.replace(/<([^>]*)>.*?<\/\1>/img, '') + '</a></li>'
    });
    ul += '<li><a href="#">Top</a></li>';
    ul += '</ul>'
    bxp.innerHTML = ul;
    document.body.appendChild(bxp);
}
let dls = document.querySelectorAll('.fold');
if(dls){
    dls.forEach(v => {
        v.addEventListener('click', e => {
            if(!v.className){
                v.className = 'fold';
            }else{
                v.className = '';
            }
        });
    });
}