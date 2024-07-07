import { io } from "socket.io-client";
const socket=io('https://livequiz-wsbackend.onrender.com')
export {socket}