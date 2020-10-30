import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

const ioClient = sailsIOClient(socketIOClient);

ioClient.sails.url = process.env.REACT_APP_BACKEND_HOST;

ioClient.sails.reconnection = true;

ioClient.socket.on("connect_timeout", () => {
  alert("connect_timeout");
});

ioClient.socket.on("reconnect", () => {
  alert("reconnect");
});

ioClient.socket.on("disconnect", () => {
  alert("disconnect");
});

export default ioClient;
