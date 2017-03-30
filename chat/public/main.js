var socket = io.connect();

var usernameHolder = document.querySelector(".usernameHolder");
var usernameForm = document.querySelector(".usernameForm");
var usernameText = document.querySelector(".usernameText");
var usernameSubmitted = false;

usernameForm.onsubmit = (e) => {
    e.preventDefault();
    socket.emit("usernameInput", { username: usernameText.value });
    usernameSubmitted = true;
    chatHolder.hidden = false;
    usernameHolder.hidden = true;
    chatText.focus();
}

var chatHolder = document.querySelector(".chatHolder");
var chat = document.querySelector(".chat");
var chatForm = document.querySelector(".chatForm");
var chatText = document.querySelector(".chatText");

chatForm.onsubmit = (e) => {
    e.preventDefault();
    if(chatText.value.length > 0) {
        socket.emit("chatInput", { text: chatText.value });
        chatForm.reset();
    }
}

socket.on("updateChat", (data) => {
    if(usernameSubmitted) {
        if(data.disconnect) {
            chat.innerHTML += `<p>${data.username} disconnected</p>`;
        } else if(data.connect) {
            chat.innerHTML += `<p>${data.username} connected</p>`;
        } else {
            chat.innerHTML += `<p>${data.username}:  ${data.text}</p>`;
        }

    }
});
