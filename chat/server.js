var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

http.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.use(express.static("public"));

var sockets = [];
io.on("connection", (socket) => {
    console.log("Socket connected");
    sockets.push(socket);

    socket.on("disconnect", () => {
        if(socket.username) {
            console.log(`${socket.username} disconnected`);
            io.sockets.emit("updateChat", { disconnect: true, username: socket.username });
        } else {
            console.log("Socket disconnected");
        }
        sockets.splice(sockets.indexOf(socket), 1);
    });

    socket.on("usernameInput", (data) => {
        socket.username = data.username;
        io.sockets.emit("updateChat", { connect: true, username: socket.username });
    });

    socket.on("chatInput", (data) => {
        if(socket.username) {
            io.sockets.emit("updateChat", { text: data.text, username: socket.username });
        }
    });
});
