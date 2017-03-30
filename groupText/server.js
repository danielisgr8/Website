var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var jsdom = require("jsdom");
var fs = require("fs");

var emptyHtml = fs.readFileSync("./public/indexEmpty.html", "utf-8");
fs.writeFileSync("./public/index.html", emptyHtml, "utf-8");

http.listen(3000, () => {
    console.log("Server started on port 3000");
});
app.use(express.static("public"));

var idCount = 0;
io.on("connection", (socket) => {
    socket.on("pCreated", (data) => {
        socket.emit("createPSender", { id: idCount, x: data.x, y: data.y });
        socket.broadcast.emit("createP", { id: idCount, x: data.x, y: data.y });
        var html = fs.readFileSync("./public/index.html", "utf-8");
        jsdom.env(html, (err, window) => {
            var p = window.document.createElement("pre");
            // jsdom doesn't allow setting contentEditable or spellcheck, so they're
            // set client-side (./public/main.js line 3)
            p.style.position = "absolute";
            p.style.left = data.x + "px";
            p.style.top = data.y + "px";
            p.id = "p" + idCount;
            window.document.body.appendChild(p);
            fs.writeFileSync("./public/index.html", "<!DOCTYPE html>\n" + window.document.documentElement.outerHTML, "utf-8");
            idCount++;
        });
    });

    socket.on("pChanged", (data) => {
        socket.broadcast.emit("updateP", { id: data.id, text: data.text });
        var html = fs.readFileSync("./public/index.html", "utf-8");
        jsdom.env(html, (err, window) => {
            var p = window.document.querySelector("#" + data.id);
            p.textContent = data.text;
            fs.writeFileSync("./public/index.html", "<!DOCTYPE html>\n" + window.document.documentElement.outerHTML, "utf-8");
        });
    });
});
