import { io } from "socket.io-client";

const socket = io('http://localhost:4000'); // Replace with your Socket.IO server URL
// const socket = io("http://50.17.174.239/"); // Replace with your Socket.IO server URL

export default socket;