let url = new URL(window.location.href)
url.port = ''
const domain = url.toString().replace('http://', '').replace('https://', '').split(/[/?#]/)[0]
const ws = new WebSocket(`ws://${domain}:8082`)
const buttons = document.querySelectorAll('button')

var timer
function click(e) {
    if (e.target.tagName.toLowerCase() === 'button') {
        ws.send(e.target.value)
    }
}

function touchstart(e) {
    e.preventDefault();
    if (!timer) {
        timer = setInterval(() => {
            ws.send(e.target.value)
        }, 100);
    }
}

function touchend() {
    //stops short touches from firing the event
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}


window.onload = function () {
    document.addEventListener("click", click, false);
    document.addEventListener("touchstart", touchstart);
    document.addEventListener("touchend", touchend, false);

}

ws.addEventListener('message', e => {
    console.log(e)
})