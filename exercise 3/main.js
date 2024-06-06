const input = document.querySelector(".form__input");
const btnSend = document.getElementById("form__btn_send");
const btnGeolocation = document.getElementById("form__btn_geolocation");
const chatMessage = document.querySelector(".message");
const errorMessage = document.querySelector(".error");

const webSocket = new WebSocket("wss://ws.ifelse.io/");

webSocket.onopen = function() {
    console.log("Соединение установлено");
}
webSocket.onmessage = function(event) {
    writeOfChat(`Сервер: ${event.data}`, "flex-start");
}
webSocket.onerror = function(event) {
    writeOfChat(`Ошибка: ${event.data}`);
}
function writeOfChat(message, position) {
    let chatP = `<p class = "chat__text" style = "align-self: ${position}">${message}</p>`;
    chatMessage.innerHTML += chatP;
}

function btnSendClik() {
    chatMessage.style.display= "flex";
    let message = input.value;
    if(message === "") {
        errorMessage.innerHTML = "Не удается отправить сообщение";
    }
    else{
        webSocket.send(message);
        writeOfChat( `Пользователь: ${message}`, "flex-end");
        input.value = "";
        errorMessage.innerHTML = "";
    }
}

const error = () =>{
    errorMessage.innerHTML = "Не удается определить гео-локацию";
}

const success = (position) =>{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    chatMessage.style.display= "flex";
    writeOfChat(`<a class="geolocstion-link" href = "${link}" target = "_blanc">Гео-локация</a>`, "flex-end");
}

function btnGeolocationClik() {
    if(!navigator.geolocation){
        errorMessage.innerHTML = "Невозможно определить гео-локацию";
    }
    else{
        navigator.geolocation.getCurrentPosition(success,error);
    }
}

