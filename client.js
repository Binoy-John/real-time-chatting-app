const socket = io('http://localhost:8000');
const form = document.getElementById("send_container");
const messageInp = document.getElementById("message_input");
const messageContainer = document.querySelector(".container");

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`,"right");
    socket.emit('send', message);
    messageInp.value = '';
})

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
});

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
});