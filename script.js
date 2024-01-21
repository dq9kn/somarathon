function getTime(dtbool) {
    var datetime = new Date();
    var h = datetime.getHours();
    var m = datetime.getMinutes();
    var s = datetime.getSeconds();

    if (dtbool) return [datetime, h, m, s];
    return [h, m, s];
}


function timeSet() {
    let dt, h, m, s;
    [dt, h, m, s] = getTime(true);
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};
    var text = dt.toLocaleDateString("ja-JP", options).replaceAll('/', '-') + " " + h.toString().padStart( 2, '0') + ":" + m.toString().padStart( 2, '0') + ":" + s.toString().padStart( 2, '0');
    document.getElementById("datetime").innerHTML = text;
}


function sr(time) {
    return Math.floor(time / 60).toString().padStart( 2, '0') + ":" + (time % 60).toString().padStart( 2, '0')
}


function srp(timelist) {
    var ret = "";
    timelist.forEach(function(elem, index) {
         ret += sr(elem) + "    "
         if (index != 0 && (index+1) % 6 == 0) {
            ret += "<br>";
         }
    });
    return ret;
}


function start() {
    if (running) return null;
    startTime = new Date();
    running = true;
    setTimer = setInterval(TimerProgress, 100);
}


function stop() {
    clearInterval(setTimer);
    stock += endTime.getTime() - startTime.getTime();
    running = false;
}


function reset() {
    if (startTime == null) return null;
    clearInterval(setTimer);
    startTime = null;
    stock = 0;
    running = false;
    nows = 0;
    timer.innerHTML = "00:00:00";
}


function TimerProgress() {
    endTime = new Date();
    diff = endTime.getTime() - startTime.getTime() + stock;
    m = Math.floor(diff / 60000);
    s = Math.floor((diff-m*60000) / 1000);
    n = Math.round((diff-m*60000-s*1000) / 10);
    console.log(diff, n);
    nows = m*60 + s;
    timer.innerHTML = m.toString().padStart( 2, '0') + ":" + s.toString().padStart( 2, '0') + ":" + n.toString().padStart( 2, '0');

    if (!(boxtime[nowBoxindex].length == nexttimeindex)) {
        if (boxtime[nowBoxindex][nexttimeindex] < nows) {
            nexttimeindex += 1;
        }
        if (boxtime[nowBoxindex].length == nexttimeindex) {
            document.getElementById("nowboxtime").innerHTML = "-";
        } else {
            document.getElementById("nowboxtime").innerHTML = sr(boxtime[nowBoxindex][nexttimeindex]);
        }
    }
}


function reftime() {
    nexttimeindex = 0;
    boxtime[nowBoxindex].forEach(function(elem, index) {
        if (elem < nows) {
            nexttimeindex = index + 1;
        }
    });
    if (boxtime[nowBoxindex].length == nexttimeindex) {
        document.getElementById("nowboxtime").innerHTML = "-";
    } else {
        document.getElementById("nowboxtime").innerHTML = sr(boxtime[nowBoxindex][nexttimeindex]);
    }
    
    document.getElementById("nowbox").innerHTML = boxlist[nowBoxindex];

    document.getElementById("nowboxtimelist").innerHTML = srp(boxtime[nowBoxindex]);
}


function box_next() {
    if (nowBoxindex == 7) return null;
    nowBoxindex += 1;
    reftime();
}


function box_prev() {
    if (nowBoxindex == 0) return null;
    nowBoxindex -= 1;
    reftime();
}


function box_reset() {
    nowBoxindex = 0;
    reftime();
    document.getElementById("nowboxtime").innerHTML = "00:00";
}


var startTime = null;
var endTime = null;
var timer = null;
var setTimer = null;

var stock = 0;
var running = false;

var nowBoxindex = 0;
var boxlist = [
    "Next>><br><center><font color=black>4　F <font color='#0E11DD'>降</font> 階段 <font color='#58F510'>左</font> <font color='#B700FA'>げんま</font></font></center>",
    "Next>><br><center><font color=black>5　F <font color='#FF0000'>昇</font> 階段 <font color='#58F510'>左</font> <font color='#B700FA'>げんま</font></font></center>",
    "Next>><br><center><font color=black>6　F <font color='#0E11DD'>降</font> 階段 <font color='#2E931F'>右</font> <font color='#B700FA'>げんま</font></font></center>",
    "Next>><br><center><font color=black>7　F <font color='#FF7A1F'>　 中央</font> <font color='#AA00AA'>上</font> <font color='#B700FA'>げんま</font></font></center>",
    "Next>><br><center><font color=black>9　F <font color='#0E11DD'>降</font> 階段 <font color='#FF00FF'>下</font> <font color='#FFFF00'>ソーマ</font></font></center>",
    "Next>><br><center><font color=black>10 F <font color='#FF0000'>昇</font> 階段 <font color='#2E931F'>右</font> <font color='#FFFF00'>ソーマ</font></font></center>",
    "Next>><br><center><font color=black>13 F <font color='#0E11DD'>降</font> 階段 <font color='#AA00AA'>上</font> <font color='#FFFF00'>ソーマ</font></font></center>",
    "Next>><br><center><font color=black>14 F <font color='#FF0000'>昇</font> 階段 <font color='#58F510'>左</font> <font color='#FFFF00'>ソーマ</font></font></center>"
];
var boxtime = [
    [0],
    [37, 43, 72, 78, 109, 115],
    [71, 77, 108, 114, 145, 149, 180, 186, 212, 221],
    [107, 113, 144, 148, 179, 185, 212, 220, 226, 251, 257],
    [133, 139, 170, 176, 207, 211, 242, 248, 279, 283, 314, 320],
    [161, 163, 184, 188, 209, 213, 234, 236, 257, 261, 282, 284, 334, 355, 357, 380, 382, 403, 407],
    [238, 244, 275, 279, 310, 316, 347, 351, 382, 419, 423, 454, 460, 491, 495],
    [309, 315, 346, 350, 381, 387, 418, 422, 459, 490, 494, 525, 531, 562, 566, 597, 603, 634, 638, 669, 675, 706, 710]
];
var nows = 0;
var nexttimeindex = 0;


window.onload = function(){
    timer = document.getElementById("timer");
    document.getElementById("timer_reset").addEventListener('click', reset);
    document.getElementById("timer_start").addEventListener('click', start);
    document.getElementById("timer_stop").addEventListener('click', stop);
    reset();
    document.getElementById("box_prev").addEventListener('click', box_prev);
    document.getElementById("box_next").addEventListener('click', box_next);
    document.getElementById("box_reset").addEventListener('click', box_reset);
    setInterval(timeSet, 1000);
}


