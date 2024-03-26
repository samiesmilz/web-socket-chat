## GroupChat Application

### Overview

The GroupChat application is an Express-based app that utilizes websockets to create a live, multi-room chat system. This README provides an overview of the application structure, functionality, and additional features that can be implemented.

### Installation

To set up the GroupChat application, follow these steps:

1. Download Code
2. Extract the downloaded ZIP file.
3. Open a terminal or command prompt window.
4. Navigate to the extracted directory.
5. Install dependencies by running `npm install`.

### Trying Out The App

After installation, you can run the GroupChat application by executing the following command in the terminal or command prompt:

```bash
$ node server.js
```

Once the server is running, open a web browser and go to http://localhost:3000/room-name, replacing "room-name" with any desired room name (e.g., "/random", "/humor", "/library"). You can open multiple tabs in the same browser or different browsers to simulate multiple users chatting in the same room.

### Client-Side Code

The client-side code consists of HTML and JavaScript files responsible for rendering the chat interface, handling user interactions, and establishing websocket connections.

#### HTML (chat.html)

The HTML file provides the structure for displaying chat messages and input form for sending new messages.

#### JavaScript (static/js/chat.js)

The JavaScript file establishes a websocket connection to the server, handles websocket events such as message reception and connection status, and facilitates user interactions like sending messages and displaying them in the chat interface.

### Server-Side Code

The server-side code is implemented using Node.js and Express framework. It handles websocket connections, manages chat rooms, and facilitates communication between clients.

#### Express App (app.js)

The Express app serves static files, defines routes for websocket connections, and manages websocket events such as message reception and connection closure. It also serves the main HTML page for the chat interface.

#### Chat User and Chat Room Classes

The ChatUser and Room classes encapsulate functionality related to individual chat users and chat rooms, respectively. ChatUser instances represent connections from clients to the server, while Room instances manage collections of users within specific chat rooms.

### Additional Features

The GroupChat application provides opportunities to extend its functionality by implementing the following features:

#### Get a Joke

Users can request a joke from the server by typing "/joke" into the message field. The server responds with a joke directed only to the requesting user.

#### Listing Members

Users can request a list of all members currently present in the room by typing "/members" into the message field. The server responds with a list of usernames of users in the current room.

#### Send Private Message

Users can send private messages to specific users by typing "/priv username message" into the message field. Only the intended recipient sees the private message.

#### Change Your Username

Users can change their username by typing "/name newUsername" into the message field. The server updates the user's username and announces the change to the room.

### Conclusion

The GroupChat application provides a foundation for building a real-time, multi-room chat system using websockets and Express.
