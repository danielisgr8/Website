var socket = io.connect();

[...document.querySelectorAll("pre")].forEach((el) => {
    el.contentEditable = true;
    el.spellcheck = false;
});

socket.on("createP", (data) => {
    var p = document.createElement("pre");
    p.contentEditable = true;
    p.spellcheck = false;
    p.style.position = "absolute";
    p.style.left = data.x + "px";
    p.style.top = data.y + "px";
    p.id = "p" + data.id;
    document.body.appendChild(p);
});

socket.on("createPSender", (data) => {
    var p = document.createElement("pre");
    p.contentEditable = true;
    p.spellcheck = false;
    p.style.position = "absolute";
    p.style.left = data.x + "px";
    p.style.top = data.y + "px";
    p.id = "p" + data.id;
    document.body.appendChild(p);
    p.focus();
    insideP = true;
});

socket.on("updateP", (data) => {
    var p = document.querySelector("#" + data.id);
    console.log(p.textContent);
    p.textContent = data.text;
});

var insideP = false;
document.body.onclick = (e) => {
    if(e.target.tagName == "PRE") {
  	    insideP = true;
    } else if(insideP) {
        insideP = false;
    } else {
        socket.emit("pCreated", { x: e.pageX, y: e.pageY });
    }
}

document.body.onkeydown = (e) => {
    if(e.target.tagName == "PRE" && e.key == "Enter" && !e.shiftKey) {
      	e.preventDefault();
      	e.target.blur();
        insideP = false;
    }
}

document.body.onkeyup = (e) => {
    if(e.target.tagName == "PRE") {
        socket.emit("pChanged", { id: e.target.id, text: e.target.textContent });
    }
}
