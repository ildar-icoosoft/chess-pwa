import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: any, JWR: any) => {
      // body === JWR.body
      // console.log("Sails responded with: ", body);
      // console.log("with headers: ", JWR.headers);
      // console.log("and with status code: ", JWR.statusCode);

      resolve(body);
    });
  });
};

export const watchGames = (cb: (data: SubscriptionData) => void) => {
  ioClient.socket.on("game", (msg: SubscriptionData) => {
    cb(msg);
  });
};
