import { JWR } from "sails.io.js";
import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { ChallengeAiData } from "../interfaces/ChallengeAiData";

export const challengeAi = (data: ChallengeAiData): Promise<Game> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/challenge/ai`,
      data,
      (body: Game, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve(body);
        } else {
          reject(jwr);
        }
      }
    );
  });
};
