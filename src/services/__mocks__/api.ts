/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-ignore
import { SubscriptionData } from "../../interfaces/SubscriptionData";

const ioClient = jest.genMockFromModule<any>("../api");

ioClient.getOngoingGames.mockImplementation(() => new Promise(() => {}));
ioClient.getGame.mockImplementation(() => new Promise(() => {}));
ioClient.makeMove.mockImplementation(() => new Promise(() => {}));

module.exports = ioClient;

/*

import Game from "../../interfaces/Game";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

let ongoingGamesDelay = 0;
export const setGetOngoingGamesDelay = (value: number): void => {
  ongoingGamesDelay = value;
};
let watchDelay = 0;
export const setWatchDelay = (value: number): void => {
  watchDelay = value;
};

let ongoingGames: Game[] = [];
export const setMockOngoingGames = (games: Game[]): void => {
  ongoingGames = games;
};

let getGameDelay = 0;
export const setGetGameDelay = (value: number): void => {
  getGameDelay = value;
};

let statusCode = 200;
let mockGameResponse: any;
export const setMockGame = (data: any, _statusCode: number = 200): void => {
  mockGameResponse = data;
  statusCode = _statusCode;
};

export const getOngoingGames = (): Promise<Game[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ongoingGames);
    }, ongoingGamesDelay);
  });
};

export const getGame = (): Promise<Game> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statusCode === 200) {
        resolve(mockGameResponse);
      } else {
        reject({
          body: mockGameResponse,
          statusCode,
        });
      }
    }, getGameDelay);
  });
};

let subscriptionData: SubscriptionData;
export const setMockSubscriptionData = (data: SubscriptionData): void => {
  subscriptionData = data;
};

export const watchGames = (cb: (data: SubscriptionData) => void): void => {
  if (subscriptionData === undefined) {
    return;
  }

  setTimeout(() => {
    cb(subscriptionData);
  }, watchDelay);
};

export const makeMove = jest.fn();
*/
