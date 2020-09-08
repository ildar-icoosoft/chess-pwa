import { JWR } from "sails.io.js";
import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { SubscriptionData } from "../interfaces/SubscriptionData";

export const login = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        rememberMe: true,
        emailAddress: "ildar@ildar.com",
        password: "123123123",
      },
      (body: Game[], jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve(body);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const getRandomQuote = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/random-quote", (body: Game[], jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else {
        reject(jwr);
      }
    });
  });
};

export const getProtectedRandomQuote = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get(
      "/api/protected/random-quote",
      (body: Game[], jwr: JWR) => {
        if (jwr.statusCode === 200) {
          resolve(body);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/game/playing", (body: Game[], jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else {
        reject(jwr);
      }
    });
  });
};

export const watchGames = (cb: (data: SubscriptionData) => void): void => {
  ioClient.socket.on("game", (msg: SubscriptionData) => {
    cb(msg);
  });
};

export const getGame = (id: number): Promise<Game> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.get(`/game/${id}`, (body: Game, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        resolve(body);
      } else {
        reject(jwr);
      }
    });
  });
};

export const makeMove = (gameId: number, move: string): Promise<Game> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${gameId}/move/${move}`,
      {},
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
