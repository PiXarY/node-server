document.body.style.visibility = "hidden";
const username = window.prompt("username: ");
if(username === null){
    document.location.reload();
}
document.body.style.visibility = "visible";


const socket = new WebSocket('ws://localhost:8000');

socket.addEventListener('open', function (event) {
  console.log('Connected to websocket server');
});

socket.addEventListener('message', function (event) {
      
    const message = JSON.parse(event.data);
    const dataArray = message.data;
    const buffer = new Uint8Array(dataArray);
    const decodedMessage = new TextDecoder().decode(buffer);
      
    const li = document.createElement("li");
    li.innerText = decodedMessage;
    document.getElementById("chat").appendChild(li);
  });

const sendMessageBtn = document.getElementById('sendMsg');
const messageInput = document.getElementById('msgInput');

function checkMsg(){
    var Tvalue = messageInput.value;
    if(Tvalue === ""){
        return;
    }
    else{
        sendMessage(Tvalue);
    }
}

function sendMessage(M) {
    socket.send(username + ": " + M);
    messageInput.value = '';
}