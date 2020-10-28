import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

const ioClient = sailsIOClient(socketIOClient);

ioClient.sails.url = process.env.REACT_APP_BACKEND_HOST;

console.log("url", ioClient.sails.url);

export default ioClient;
