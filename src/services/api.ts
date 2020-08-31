/* eslint-disable import/prefer-default-export */

import Game from "../interfaces/Game";
import ioClient from "./ioClient";

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
