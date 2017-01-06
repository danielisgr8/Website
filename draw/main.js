window.mobileCheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// 0 = draw, 1 = move drawing
var mode = 0;

var canvasPre = document.querySelector("#preview");
var ctxPre = canvasPre.getContext("2d");
ctxPre.lineJoin = "round";
ctxPre.lineCap = "round";
ctxPre.lineWidth = 3;

function handleStart(e) {
    if(window.mobileCheck()) {
        e.preventDefault(); // disables accidentally scrolling while trying to draw
        var clientX = e.touches[0].clientX;
        var clientY = e.touches[0].clientY;
    } else {
        var clientX = e.clientX;
        var clientY = e.clientY;
    }
    if(mode == 0) {
        line = [];
        ctxPre.beginPath();
        ctxPre.moveTo(clientX - border, clientY - border);
        line.push([clientX - border, clientY - border]);
    } else if(mode == 1) {
        pastX = clientX - border;
        pastY = clientY - border;
    }
}

function handleMove(e) {
    if(window.mobileCheck()) {
        e.preventDefault(); // disables accidentally scrolling while trying to draw
        var clientX = e.touches[0].clientX;
        var clientY = e.touches[0].clientY;
    } else {
        var clientX = e.clientX;
        var clientY = e.clientY;
    }
    currentX = clientX - border;
    currentY = clientY - border;
    if(mode == 0) {
        // handles if player went outside the canvas. essentially stops drawing completely
        if(currentX < 0 || currentX > 500 || currentY < 0 || currentY > 500) {
            if(line.length > 0) {
                ctxPre.closePath();
                lines.push(line);
                line = [];
                outside = true;
            }
        } else {
            // maybe start new line in ctxPre or do something where it doesn't redraw every single point (resource intensive)
            if(outside) { // was outside the canvas
                ctxPre.beginPath();
                ctxPre.moveTo(clientX - border, clientY - border);
                line.push([clientX - border, clientY - border]);
                outside = false;
            } else {
                ctxPre.lineTo(currentX, currentY);
                line.push([currentX, currentY]);
                ctxPre.stroke();
            }
        }
    } else if(mode == 1) {
        var difX = currentX - pastX;
        var difY = currentY - pastY;
        ctxPre.clearRect(0, 0, canvasRes.width, canvasRes.height);
        for(var i = 0; i < lines.length; i++) {
            var thisLine = lines[i];
            ctxPre.beginPath();
            thisLine[0][0] += difX;
            thisLine[0][1] += difY;
            ctxPre.moveTo(thisLine[0][0], thisLine[0][1]);
            for(var j = 1; j < thisLine.length; j++) {
                thisLine[j][0] += difX;
                thisLine[j][1] += difY;
                ctxPre.lineTo(thisLine[j][0], thisLine[j][1]);
            }
            ctxPre.stroke();
            ctxPre.closePath();
        }
        pastX = currentX;
        pastY = currentY;
    }
}

function handleEnd(e) {
    if(mode == 0) {
        ctxPre.closePath();
        lines.push(line);
    } else if(mode == 1) {
        ctxPre.clearRect(0, 0, canvasRes.width, canvasRes.height);
        for(var i = 0; i < lines.length; i++) {
            var thisLine = lines[i];
            ctxPre.beginPath();
            ctxPre.moveTo(thisLine[0][0], thisLine[0][1]);
            for(var j = 1; j < thisLine.length; j++) {
                ctxPre.lineTo(thisLine[j][0], thisLine[j][1]);
            }
            for(var j = 0; j < 10; j++) {
                ctxPre.stroke();
            }
            ctxPre.closePath();
        }
    }
}

var mouseDown = false, outside = false;
var border = parseInt(window.getComputedStyle(canvasPre).borderRightWidth, 10);
var lines = [], line = [];

var pastX, currentX, pastY, currentY;

canvasPre.onmousedown = function(e) {
    mouseDown = true;
    handleStart(e);
}

canvasPre.onmousemove = function(e) {
    if(mouseDown) {
        handleMove(e);
    }
}

canvasPre.onmouseup = function(e) {

    handleEnd(e);
    mouseDown = false;
}

canvasPre.addEventListener("touchstart", handleStart, false);

canvasPre.addEventListener("touchmove", handleMove, false);

canvasPre.addEventListener("touchend", handleEnd, false);

var canvasRes = document.querySelector("#result");
ctxRes = canvasRes.getContext("2d");
ctxRes.lineJoin = "round";
ctxRes.lineCap = "round";
ctxRes.lineWidth = 3;

document.querySelector("#transfer").onclick = function(e) {
    ctxRes.clearRect(0, 0, canvasRes.width, canvasRes.height);
    for(var i = 0; i < lines.length; i++) {
        var thisLine = lines[i];
        ctxRes.beginPath();
        ctxRes.moveTo(thisLine[0][0], thisLine[0][1]);
        for(var j = 1; j < thisLine.length; j++) {
            ctxRes.lineTo(thisLine[j][0], thisLine[j][1]);
        }
        for(var j = 0; j < 10; j++) {
            ctxRes.stroke();
        }
        ctxRes.closePath();
    }
}

document.querySelector("#clear").onclick = function(e) {
    ctxPre.clearRect(0, 0, canvasRes.width, canvasRes.height);
    ctxPre.closePath();
    ctxRes.clearRect(0, 0, canvasRes.width, canvasRes.height);
    lines = [];
}

document.querySelector("#move").onclick = function(e) {
    mode = 1;
}

document.querySelector("#draw").onclick = function(e) {
    mode = 0;
}
