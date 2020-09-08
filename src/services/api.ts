import { JWR } from "sails.io.js";
import Game from "../interfaces/Game";
import ioClient from "./ioClient";
import { SubscriptionData } from "../interfaces/SubscriptionData";
import LoginData from "../interfaces/LoginData";
import SignUpData from "../interfaces/SignUpData";

export const login = (data: LoginData): Promise<any> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        rememberMe: true,
        emailAddress: data.email,
        password: data.password,
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

export const register = (data: SignUpData): Promise<any> => {
  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        fullName: data.fullName,
        emailAddress: data.email,
        password: data.password,
        confirmPassword: data.password,
        agreed: true,
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
