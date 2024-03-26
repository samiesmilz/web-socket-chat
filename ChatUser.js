/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require("./Room");

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** make chat: store connection-device, rooom */

  constructor(send, roomName) {
    this._send = send; // "send" function for this user
    this.room = Room.get(roomName); // room user will be in
    this.name = null; // becomes the username of the visitor

    console.log(`created chat in ${this.room.name}`);
  }

  /** send msgs to this client using underlying connection-send-function */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** handle joining: add to room members, announce join */

  handleJoin(name) {
    this.name = name;
    this.room.join(this);
    this.room.broadcast({
      type: "note",
      text: `${this.name} joined "${this.room.name}".`,
    });
  }

  /** handle a chat: broadcast to room. */

  handleChat(text) {
    this.room.broadcast({
      name: this.name,
      type: "chat",
      text: text,
    });
  }

  /** Handle messages from client:
   *
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    if (msg.type === "join") this.handleJoin(msg.name);
    else if (msg.type === "chat") this.handleChat(msg.text);
    else if (msg.type === "get-joke") this.handleJoke();
    else throw new Error(`bad message: ${msg.type}`);
  }

  handleJoke() {
    const jokes = [
      "Dad, I'm hungry. Hello, Hungry. I'm Dad.",
      '"I\'m sorry." "Hi sorry, I\'m dad"',
      '"Dad, I\'m cold." "Go stand in the corner, I hear it\'s 90 degrees."',
      "When does a joke become a dad joke? When it becomes apparent.",
      "What do you call a dad that has fallen through the ice? A Popsicle.",
      '"Hey, dad, did you get a haircut?" "No, I got them all cut."',
      "Dad, can you put my shoes on? I don't think they'll fit me.",
      "Child: Dad, make me a sandwich. Dad: Poof! You're a sandwich.",
      '"Dad, do you think it\'s going to snow this winter?" "I dont know, its all up in the air"',
    ];
    const randomIndex = Math.floor(Math.random() * jokes.length);
    let joke = jokes[randomIndex];

    this.room.broadcast({
      type: "get-joke",
      text: joke,
      name: "Server",
    });
  }

  /** Connection was closed: leave room, announce exit to others */

  handleClose() {
    this.room.leave(this);
    this.room.broadcast({
      type: "note",
      text: `${this.name} left ${this.room.name}.`,
    });
  }
}

module.exports = ChatUser;
