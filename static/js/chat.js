/** Client-side of groupchat. */

const urlParts = document.URL.split("/");
const roomName = urlParts[urlParts.length - 1];
const ws = new WebSocket(`ws://localhost:3000/chat/${roomName}`);

const name = prompt("Username?");

/** called when connection opens, sends join info to server. */

ws.onopen = function (evt) {
  console.log("open", evt);

  let data = { type: "join", name: name };
  ws.send(JSON.stringify(data));
};

/** called when msg received from server; displays it. */

ws.onmessage = function (evt) {
  console.log("message", evt);

  let msg = JSON.parse(evt.data);
  let item;

  if (msg.type === "note") {
    item = $(`<li><i>${msg.text}</i></li>`);
  } else if (msg.type === "chat") {
    item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);
  } else if (msg.type === "get-joke") {
    item = $(`<li><b>Server: </b>${msg.text}</li>`);
  } else {
    // Otherwise, display regular chat messages from users else {
    return console.error(`bad message: ${msg}`);
  }

  $("#messages").append(item);
};

/** called on error; logs it. */

ws.onerror = function (evt) {
  console.error(`err ${evt}`);
};

/** called on connection-closed; logs it. */

ws.onclose = function (evt) {
  console.log("close", evt);
};

/** send message when button pushed. */

$("form").submit(function (evt) {
  evt.preventDefault();

  let message = $("#m").val();
  let data;

  if (message.startsWith("/joke")) {
    data = { type: "get-joke" };
  } else {
    data = { type: "chat", text: message };
  }
  ws.send(JSON.stringify(data));

  $("#m").val("");
});
