import { io } from "socket.io-client";

const socket = io('http://localhost:4000'); // Replace with your Socket.IO server URL

export default socket;